require('dotenv').config();
const fs = require('fs');
const path = require('path');
const express = require('express');
const cors = require('cors');
const scrapeAndSave = require('./scraper');

const app = express();
const PORT = process.env.PORT || 5000;
const DATA_PATH = path.join(__dirname, 'data', 'startups.json');

// Enable CORS
app.use(cors());

// Ensure /data directory exists
if (!fs.existsSync(path.join(__dirname, 'data'))) {
  fs.mkdirSync(path.join(__dirname, 'data'));
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

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// Scrape trigger endpoint
app.get('/api/scrape', async (req, res) => {
  await scrapeAndSave();
  res.json({ success: true, message: 'Scraping completed' });
});

// Server start
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
