const mongoose = require("mongoose");

const heroStatsSchema = new mongoose.Schema({
  hero_id: { type: Number, required: true, unique: true },
  hero_name: { type: String, required: true },
  matches: { type: Number, required: true },
  wins: { type: Number, required: true },
  k: { type: Number, required: true },
  d: { type: Number, required: true },
  a: { type: Number, required: true },
  updatedAt: { type: Date, default: Date.now } 
});

module.exports = mongoose.model("HeroStats", heroStatsSchema);

