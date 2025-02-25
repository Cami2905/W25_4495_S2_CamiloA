const mongoose = require('mongoose');

const heroSchema = new mongoose.Schema({
    name: { type: String, required: true },
    role: { type: String, enum: ['Tank', 'Duelist', 'Support'], required: true },
    image: { type: String, required: true }, 
    detailImage: { type: String, required: true },
    winRate: { type: Number, required: true },
    pickRate: { type: Number, required: true },
    banRate: { type: Number, required: true },
    counters: { type: [String], default: [] },
    synergies: { type: [String], default: [] },
    description: { type: String, required: true }, 
    biography: { type: String, required: true } 
});

module.exports = mongoose.model('Hero', heroSchema);


