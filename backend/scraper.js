// scraper.js
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

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

    const filePath = path.join(__dirname, 'data', 'startups.json');
    fs.writeFileSync(filePath, JSON.stringify(startups, null, 2), 'utf-8');

    console.log('✅ Scraping complete. Data saved to startups.json');

    await browser.close();
  } catch (error) {
    console.error('❌ Scraping failed:', error);
  }
}

// Only export function — don't run immediately
module.exports = scrapeAndSave;
