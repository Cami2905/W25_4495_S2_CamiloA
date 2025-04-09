const mongoose = require("mongoose");

const HeroRankingStatsSchema = new mongoose.Schema({
  hero_id: {
    type: String,
    required: true,
    unique: true,
  },
  hero_name: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  matches: {
    type: Number,
    required: true,
  },
  wins: {
    type: Number,
    required: true,
  },
  k: {
    type: Number,
    required: true,
  },
  d: {
    type: Number,
    required: true,
  },
  a: {
    type: Number,
    required: true,
  },
  total_hero_damage: {
    type: Number,
    required: true,
  },
  total_hero_heal: {
    type: Number,
    required: true,
  },
  total_damage_taken: {
    type: Number,
    required: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("HeroRankingStats", HeroRankingStatsSchema);
