const express = require("express");
const router = express.Router();
const {
  updateNextHeroRanking,
  getAllHeroRankings
} = require("../controllers/rankingsController");

// Update one hero's ranking data
router.get("/update-next", updateNextHeroRanking);

// Get all cached hero rankings
router.get("/", getAllHeroRankings);

module.exports = router;
