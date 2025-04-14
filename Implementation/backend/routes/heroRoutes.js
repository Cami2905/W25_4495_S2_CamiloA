const express = require('express');
const router = express.Router();
const heroController = require('../controllers/heroController');
const Hero = require('../models/Hero');


router.get('/hero/:query', heroController.getHeroFromAPI);

// GET all heroes
router.get('/', async (req, res) => {
    try {
        const heroes = await Hero.find();
        res.status(200).json(heroes);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching heroes', error });
    }
});


router.get('/:id', async (req, res) => {
    try {
        const hero = await Hero.findById(req.params.id);
        if (!hero) return res.status(404).json({ message: 'Hero not found' });
        res.status(200).json(hero);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching hero', error });
    }
});

// Role filter (safe to keep here)
router.get('/role/:role', async (req, res) => {
    try {
        const role = req.params.role;
        const heroes = await Hero.find({ role });
        res.status(200).json(heroes);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching heroes by role', error });
    }
});

router.post('/', heroController.createHero);
router.put('/:id', heroController.updateHero);
router.delete('/:id', heroController.deleteHero);

module.exports = router;

