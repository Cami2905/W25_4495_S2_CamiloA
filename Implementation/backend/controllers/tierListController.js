const axios = require("axios");
const HeroStats = require("../models/HeroStats"); // Our MongoDB model
require("dotenv").config();

const API_BASE_URL = "https://marvelrivalsapi.com/api/v1/heroes/hero/";
const API_KEY = process.env.MARVEL_RIVALS_API_KEY;

// ✅ Hardcoded hero IDs for updating one at a time
const heroIds = [
  1022, 1018, 1027, 1011, 1037, 1042, 1051, 1039, 1035, 
  1026, 1033, 1021, 1024, 1017, 1052, 1034, 1029, 1040, 1030, 
  1045, 1048, 1038, 1036, 1032, 1043, 1015, 1014, 1041, 1049, 
  1046, 1025, 1050, 1047, 1016, 1031, 1020, 1023
];

// ✅ Keeps track of which hero is being updated next
let currentHeroIndex = 0;

// 🛠 Function to update **one hero's stats at a time**
async function updateHeroStats() {
  const heroId = heroIds[currentHeroIndex];

  try {
    console.log(`Fetching stats for Hero ID ${heroId}...`);
    const response = await axios.get(`${API_BASE_URL}${heroId}/stats`, {
      headers: { "x-api-key": API_KEY },
    });

    const heroStats = response.data;
    
    // Save/update hero stats in MongoDB
    await HeroStats.findOneAndUpdate(
      { hero_id: heroId },
      { ...heroStats, updatedAt: Date.now() },
      { upsert: true, new: true }
    );

    console.log(`Updated stats for Hero ID ${heroId}`);

    // Move to the next hero (loop back to 0 when at the end)
    currentHeroIndex = (currentHeroIndex + 1) % heroIds.length;

    return heroStats;
  } catch (error) {
    console.error(`Error fetching stats for Hero ID ${heroId}:`, error.message);
    return null;
  }
}

// 🛠 Function to get the tier list (reads from MongoDB)
async function getTierList() {
  const heroStatsArray = await HeroStats.find({});

  return heroStatsArray.map(hero => ({
    hero_name: hero.hero_name,
    hero_icon: `/images/${hero.hero_name.toLowerCase().replace(/\s/g, "_")}_icon.png`, 
    win_rate: parseFloat(((hero.wins / hero.matches) * 100).toFixed(2)), 
    pick_rate: parseFloat(((hero.matches / 400284) * 100).toFixed(2)), 
    matches: hero.matches,
    wins: hero.wins,
    kda: `${hero.k.toFixed(1)}/${hero.d.toFixed(1)}/${hero.a.toFixed(1)}`
  }));
}


module.exports = { updateHeroStats, getTierList };
