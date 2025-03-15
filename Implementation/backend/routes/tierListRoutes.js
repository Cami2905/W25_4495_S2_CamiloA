const express = require("express");
const router = express.Router();
const MRAPIClient = require("../services/mrapiService");

router.get("/tier-list", async (req, res) => {
  try {
    const heroStats = await MRAPIClient.getHeroStats();
    res.json(heroStats);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tier list data", error: error.message });
  }
});

module.exports = router;
