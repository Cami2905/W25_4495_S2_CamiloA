const express = require("express");
const router = express.Router();
const { getAllHeroStats } = require("../services/marvelRivalsService");

router.get("/tier-list", async (req, res) => {
  try {
    const heroStats = await getAllHeroStats();
    res.json(heroStats);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tier list data", error: error.message });
  }
});

module.exports = router;

