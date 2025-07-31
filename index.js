const express = require("express");
const fs = require("fs");
const app = express();
const port = process.env.PORT || 10000;

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

const MEMORY_FILE = "lucy_memory.json";

app.post("/save", (req, res) => {
  const data = req.body;
  fs.writeFile(MEMORY_FILE, JSON.stringify(data, null, 2), (err) => {
    if (err) return res.status(500).send("Failed to save memory.");
    res.send("Memory saved.");
  });
});

app.get("/load", (req, res) => {
  if (!fs.existsSync(MEMORY_FILE)) return res.status(404).send("No memory found.");
  const memoryData = fs.readFileSync(MEMORY_FILE);
  res.setHeader("Content-Type", "application/json");
  res.send(memoryData);
});

app.listen(port, () => {
  console.log(`Lucy Memory Proxy running on port ${port}`);
});
