const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const memoryFilePath = path.join(__dirname, 'lucy-memory.json');

// READ memory
app.get('/memory', (req, res) => {
  fs.readFile(memoryFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading memory.');
    }
    res.json(JSON.parse(data || '{}'));
  });
});

// WRITE memory
app.post('/memory', (req, res) => {
  fs.writeFile(memoryFilePath, JSON.stringify(req.body, null, 2), err => {
    if (err) {
      return res.status(500).send('Error writing memory.');
    }
    res.send('Memory updated successfully.');
  });
});

// Home route (optional, for Render test)
app.get('/', (req, res) => {
  res.send('Lucy Memory Proxy is working ✅');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Lucy Memory Proxy running on http://localhost:${PORT}`);
});
