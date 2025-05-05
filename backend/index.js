const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const express = require('express');
const cron = require('node-cron');
const cors = require('cors'); // Importing CORS

const app = express();
const PORT = process.env.PORT || 5000;
const DATA_PATH = path.join(__dirname, 'data', 'startups.json');

// Enable CORS for all routes (you can adjust this for more specific handling)
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

    await page.waitForSelector('main div.h-full');

    const startups = await page.$$eval('main div.h-full', (cards) => {
      return cards.map((card) => {
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

    // Save scraped data to startups.json
    fs.writeFileSync(DATA_PATH, JSON.stringify(startups, null, 2), 'utf-8');
    console.log('✅ Scraped and saved startups.json');

    await browser.close();
  } catch (error) {
    console.error('❌ Scraping failed:', error);
  }
}

// API endpoint to fetch startups data
app.get('/api/startups', (req, res) => {
  try {
    const data = fs.readFileSync(DATA_PATH, 'utf-8');
    const startups = JSON.parse(data);
    res.json({ success: true, data: startups });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: 'Data not available',
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
