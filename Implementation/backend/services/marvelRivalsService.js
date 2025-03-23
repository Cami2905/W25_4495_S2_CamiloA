const axios = require("axios");
require("dotenv").config();

const API_BASE_URL = "https://marvelrivalsapi.com/api/v1/heroes/hero/";
const API_KEY = process.env.MARVEL_RIVALS_API_KEY;

const TOTAL_MATCHES = 400284;

// Hero IDs
const heroIds = [
  1022, 1018, 1027, 1011, 1037, 1042, 1051, 1039, 1035, 
  1026, 1033, 1021, 1024, 1017, 1052, 1034, 1029, 1040, 1030, 
  1045, 1048, 1038, 1036, 1032, 1043, 1015, 1014, 1041, 1049, 
  1046, 1025, 1050, 1047, 1016, 1031, 1020, 1023
];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function fetchHeroStats(heroId) {
  try {
    const response = await axios.get(`${API_BASE_URL}${heroId}/stats`, {
      headers: { "x-api-key": API_KEY }
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching stats for Hero ID ${heroId}:`, error.message);
    return null;
  }
}

async function getAllHeroStats() {
  const heroStatsArray = [];

  for (const heroId of heroIds) {
    console.log(`Fetching stats for Hero ID ${heroId}...`);
    const heroStats = await fetchHeroStats(heroId);
    if (heroStats) {
      heroStatsArray.push(heroStats);
    }


    await delay(1500);
  }

  const processedStats = heroStatsArray.map(hero => ({
    hero_name: hero.hero_name,
    win_rate: ((hero.wins / hero.matches) * 100).toFixed(2),
    pick_rate: ((hero.matches / TOTAL_MATCHES) * 100).toFixed(2), 
    matches: hero.matches,
    wins: hero.wins,
    kda: `${hero.k.toFixed(1)}/${hero.d.toFixed(1)}/${hero.a.toFixed(1)}`
  }));

  return processedStats;
}

module.exports = { getAllHeroStats };


