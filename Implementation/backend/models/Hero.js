const mongoose = require('mongoose');

const HeroSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    role: { type: String, required: true }, 
    winRate: { type: Number, default: 0 },
    pickRate: { type: Number, default: 0 },
    banRate: { type: Number, default: 0 },
    counters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Hero' }],  
    synergies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Hero' }],
}, { timestamps: true });

module.exports = mongoose.model('Hero', HeroSchema);
