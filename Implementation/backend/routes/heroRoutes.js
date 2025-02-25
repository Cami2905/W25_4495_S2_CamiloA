const express = require('express');
const router = express.Router();
const heroController = require('../controllers/heroController');
const Hero = require('../models/Hero');

// GET all heroes
router.get('/', async (req, res) => {
    try {
        const heroes = await Hero.find();
        res.status(200).json(heroes);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching heroes', error });
    }
});

// GET a hero by ID
router.get('/:id', async (req, res) => {
    try {
        const hero = await Hero.findById(req.params.id);
        if (!hero) return res.status(404).json({ message: 'Hero not found' });
        res.status(200).json(hero);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching hero', error });
    }
});

// GET heroes by role (Tank, Duelist, Support)
router.get('/role/:role', async (req, res) => {
    try {
        const role = req.params.role;
        const heroes = await Hero.find({ role });
        res.status(200).json(heroes);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching heroes by role', error });
    }
});

// POST (Create) a new hero
router.post('/', heroController.createHero);

// PUT (Update) an existing hero
router.put('/:id', heroController.updateHero);

// DELETE a hero
router.delete('/:id', heroController.deleteHero);

module.exports = router;
