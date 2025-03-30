const express = require("express");
const axios = require("axios");
require("dotenv").config();

const router = express.Router();
const MARVEL_RIVALS_API_KEY = process.env.MARVEL_RIVALS_API_KEY;

// ✅ Player search route
router.get("/player-search/:username", async (req, res) => {
  const { username } = req.params;

  try {
    console.log(`🔍 Searching for player: ${username}`); // Debugging log

    const response = await axios.get(
      `https://marvelrivalsapi.com/api/v1/find-player/${username}`,
      {
        headers: {
          "x-api-key": MARVEL_RIVALS_API_KEY,
        },
      }
    );

    console.log("✅ API Response:", response.data); // Debugging log
    res.json(response.data);
  } catch (error) {
    console.error("❌ Error fetching player data:", error.response?.data || error.message);
    res.status(500).json({
      message: "Error fetching player data",
      error: error.response?.data || error.message,
    });
  }
});

// ✅ NEW: Player profile route
router.get("/player-profile/:playerId", async (req, res) => {
  const { playerId } = req.params;

  try {
    console.log(`🔍 Fetching player profile for ID: ${playerId}`); // Debugging log

    const response = await axios.get(
      `https://marvelrivalsapi.com/api/v1/player/${playerId}`,
      {
        headers: {
          "x-api-key": MARVEL_RIVALS_API_KEY,
        },
      }
    );

    console.log("✅ Player Profile Data:", response.data); // Debugging log
    res.json(response.data);
  } catch (error) {
    console.error("❌ Error fetching player profile:", error.response?.data || error.message);
    res.status(500).json({
      message: "Error fetching player profile",
      error: error.response?.data || error.message,
    });
  }
});

module.exports = router;


