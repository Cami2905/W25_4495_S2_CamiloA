const mongoose = require('mongoose');

const heroSchema = new mongoose.Schema({
    name: { type: String, required: true },
    role: { type: String, required: true },
    winRate: { type: Number, required: true },
    pickRate: { type: Number, required: true },
    banRate: { type: Number, required: true },
    counters: { type: [String], default: [] },
    synergies: { type: [String], default: [] }
});

module.exports = mongoose.model('Hero', heroSchema);

