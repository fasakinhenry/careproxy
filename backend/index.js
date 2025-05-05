const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const express = require('express');
const cron = require('node-cron');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;
const DATA_PATH = path.join(__dirname, 'data', 'startups.json');

// Enable CORS for all routes
app.use(cors());

// Create /data folder if it doesn't exist
if (!fs.existsSync(path.join(__dirname, 'data'))) {
  fs.mkdirSync(path.join(__dirname, 'data'));
}

// Scraping logic
async function scrapeAndSave() {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      timeout: 0,
    });
    
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(60000);
    page.setDefaultTimeout(60000);
    
    await page.goto('https://healthstartup.vercel.app/', {
      waitUntil: 'networkidle0',
    });
    
    // Use a more specific selector to target only the startup cards
    await page.waitForSelector('main div.grid div.h-full');
    
    const startups = await page.$$eval('main div.grid > div', (cards) => {
      // Filter out any non-startup card elements
      const startupCards = cards.filter(card => 
        card.querySelector('h3') && 
        card.querySelector('span') && 
        card.querySelector('p')
      );
      
      return startupCards.map((card) => {
        const category = card.querySelector('span')?.textContent.trim();
        const name = card.querySelector('h3')?.textContent.trim();
        const description = card.querySelector('p')?.textContent.trim();
        const founders = card
          .querySelector('svg.lucide-users ~ p')
          ?.textContent.trim();
        const links = card.querySelectorAll('a');
        
        const website = links[0]?.href || null;
        const linkedin = links[1]?.href || null;
        
        return { name, category, description, founders, website, linkedin };
      });
    });
    
    // Remove any duplicate entries based on name
    const uniqueStartups = removeDuplicates(startups, 'name');
    
    // Save scraped data to startups.json
    fs.writeFileSync(DATA_PATH, JSON.stringify(uniqueStartups, null, 2), 'utf-8');
    console.log(`✅ Scraped and saved ${uniqueStartups.length} unique startups to startups.json`);
    
    await browser.close();
  } catch (error) {
    console.error('❌ Scraping failed:', error);
  }
}

// Helper function to remove duplicates based on a key
function removeDuplicates(array, key) {
  return [...new Map(array.map(item => [item[key], item])).values()];
}

// API endpoint to fetch startups data
app.get('/api/startups', (req, res) => {
  try {
    const data = fs.readFileSync(DATA_PATH, 'utf-8');
    const startups = JSON.parse(data);
    res.json({ success: true, data: startups });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Data not available',
      error: error.message,
    });
  }
});

// API endpoint to fetch categories data
app.get('/api/categories', (req, res) => {
  try {
    const data = fs.readFileSync(DATA_PATH, 'utf-8');
    const startups = JSON.parse(data);
    
    // Extract categories from the startups data
    const categories = [
      'all', // Adding 'all' as a default category
      ...new Set(startups.map((startup) => startup.category)), // Get unique categories
    ];
    
    res.json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching categories',
      error: error.message,
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  
  // Run scrapeAndSave once when the server starts
  scrapeAndSave();
  
  // Schedule scraping every 30 minutes
  cron.schedule('*/30 * * * *', () => {
    console.log('⏳ Scheduled scraping...');
    scrapeAndSave();
  });
});
