const express = require("express");
const router = express.Router();
const { updateHeroStats, getTierList } = require("../controllers/tierListController");

// ✅ Route to fetch stored Tier List data from MongoDB
router.get("/tier-list", async (req, res) => {
  try {
    const data = await getTierList();
    res.json(data);
  } catch (error) {
    console.error("Error fetching tier list:", error);
    res.status(500).json({ message: "Failed to fetch tier list" });
  }
});

// ✅ Route to update one hero at a time
router.get("/update-tier-list", async (req, res) => {
  try {
    const result = await updateHeroStats();
    res.json({ message: "Hero stats updated successfully", hero: result });
  } catch (error) {
    console.error("Error updating tier list:", error);
    res.status(500).json({ message: "Failed to update hero stats" });
  }
});

module.exports = router;


