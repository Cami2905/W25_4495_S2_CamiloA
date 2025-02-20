require('dotenv').config();

const express = require('express');
const connectDB = require('./config/db');
const Hero = require('./models/Hero');

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.get('/test', async (req, res) => {
  try {
    const newHero = await Hero.create({
      name: "Iron Man",
      role: "Damage",
      winRate: 53.2,
      pickRate: 15.7,
      banRate: 8.4
    });
    res.json(newHero);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
