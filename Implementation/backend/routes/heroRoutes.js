const express = require('express');
const router = express.Router();
const heroController = require('../controllers/heroController');

// GET all heroes
router.get('/', heroController.getAllHeroes);

// GET a single hero by ID
router.get('/:id', heroController.getHeroById);

// POST (Create) a new hero
router.post('/', heroController.createHero);

// PUT (Update) an existing hero
router.put('/:id', heroController.updateHero);

// DELETE a hero
router.delete('/:id', heroController.deleteHero);

module.exports = router;
