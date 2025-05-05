// server.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 4000;

app.get('/api/startups', (req, res) => {
  const filePath = path.join(__dirname, 'data', 'startups.json');
  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    const startups = JSON.parse(data);
    res.json({ success: true, data: startups });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error reading file' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
