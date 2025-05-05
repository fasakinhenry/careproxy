// scheduler.js
const cron = require('node-cron');
const scrapeAndSave = require('./scraper');

// Run every 30 minutes (adjust as needed)
// Format: '* * * * *' → minute hour day month dayOfWeek
cron.schedule('*/30 * * * *', () => {
  console.log('🔄 Running scheduled scraping...');
  scrapeAndSave();
});

// Run once immediately when app starts
scrapeAndSave();
