const Hero = require('../models/Hero');

// Get all heroes
const getAllHeroes = async (req, res) => {
    try {
        const heroes = await Hero.find();
        res.status(200).json(heroes);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching heroes', error });
    }
};

// Get a single hero by ID
const getHeroById = async (req, res) => {
    try {
        const hero = await Hero.findById(req.params.id);
        if (!hero) return res.status(404).json({ message: 'Hero not found' });
        res.status(200).json(hero);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching hero', error });
    }
};

// Create a new hero
const createHero = async (req, res) => {
    try {
        const { name, role, winRate, pickRate, banRate, counters, synergies } = req.body;
        const newHero = new Hero({ name, role, winRate, pickRate, banRate, counters, synergies });
        await newHero.save();
        res.status(201).json(newHero);
    } catch (error) {
        res.status(400).json({ message: 'Error creating hero', error });
    }
};

// Update a hero
const updateHero = async (req, res) => {
    try {
        const updatedHero = await Hero.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedHero) return res.status(404).json({ message: 'Hero not found' });
        res.status(200).json(updatedHero);
    } catch (error) {
        res.status(400).json({ message: 'Error updating hero', error });
    }
};

// Delete a hero
const deleteHero = async (req, res) => {
    try {
        const deletedHero = await Hero.findByIdAndDelete(req.params.id);
        if (!deletedHero) return res.status(404).json({ message: 'Hero not found' });
        res.status(200).json({ message: 'Hero deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting hero', error });
    }
};

module.exports = {
    getAllHeroes,
    getHeroById,
    createHero,
    updateHero,
    deleteHero
};
