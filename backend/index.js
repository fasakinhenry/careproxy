require('dotenv').config(); // Load env vars first

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const express = require('express');
const cron = require('node-cron');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;
const SCRAPE_URL = process.env.SCRAPE_URL;
const DATA_PATH = path.join(__dirname, 'data', 'startups.json');

// Enable CORS
app.use(cors());

// Ensure /data directory exists
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

    await page.goto(SCRAPE_URL, { waitUntil: 'networkidle0' });

    await page.waitForSelector('main div.grid div.h-full');

    const startups = await page.$$eval('main div.grid > div', (cards) => {
      const startupCards = cards.filter(
        (card) =>
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

    const uniqueStartups = removeDuplicates(startups, 'name');

    fs.writeFileSync(
      DATA_PATH,
      JSON.stringify(uniqueStartups, null, 2),
      'utf-8'
    );
    console.log(
      `✅ Scraped and saved ${uniqueStartups.length} unique startups to startups.json`
    );

    await browser.close();
  } catch (error) {
    console.error('❌ Scraping failed:', error);
  }
}

// Remove duplicates by key
function removeDuplicates(array, key) {
  return [...new Map(array.map((item) => [item[key], item])).values()];
}

// Endpoints
app.get('/api/startups', (req, res) => {
  try {
    const data = fs.readFileSync(DATA_PATH, 'utf-8');
    res.json({ success: true, data: JSON.parse(data) });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Data not available',
      error: error.message,
    });
  }
});

app.get('/api/categories', (req, res) => {
  try {
    const data = fs.readFileSync(DATA_PATH, 'utf-8');
    const startups = JSON.parse(data);
    const categories = ['all', ...new Set(startups.map((s) => s.category))];
    res.json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching categories',
      error: error.message,
    });
  }
});

// Server start
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);

  scrapeAndSave();

  cron.schedule('*/30 * * * *', () => {
    console.log('⏳ Scheduled scraping...');
    scrapeAndSave();
  });
});
