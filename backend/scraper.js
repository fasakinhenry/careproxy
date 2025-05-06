const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const SCRAPE_URL = process.env.SCRAPE_URL;
const DATA_PATH = path.join(__dirname, 'data', 'startups.json');

function removeDuplicates(array, key) {
  return [...new Map(array.map((item) => [item[key], item])).values()];
}

async function scrapeAndSave() {
  try {
    console.log(`[${new Date().toISOString()}] 🕷️ Starting scrape...`);
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

module.exports = scrapeAndSave;
