const axios = require("axios");
const rateLimit = require("axios-rate-limit");
require("dotenv").config();

const API_BASE_URL = "https://marvelrivalsapi.com/api/v1/heroes/hero/";
const API_KEY = process.env.MARVEL_RIVALS_API_KEY; // Store API key in .env

const heroesList = [
  "Storm", "Iron Man", "Spider-Man", "Hulk", "Thor",
  "Captain America", "Doctor Strange", "Magneto", "Venom", "Black Panther",
  "Black Widow", "Hawkeye", "Hela", "Human Torch", "Iron Fist", "Magik",
  "Mister Fantastic", "Moon Knight", "Namor", "Psylocke", "Scarlet Witch",
  "Squirrel Girl", "Star-Lord", "The Punisher", "Winter Soldier", "Wolverine",
  "Adam Warlock", "Cloak & Dagger", "Invisible Woman", "Jeff The Land Shark",
  "Loki", "Luna Snow", "Mantis", "Rocket Raccoon"
];

// Set up rate-limited axios instance (2 requests per second)
const http = rateLimit(
  axios.create({
    baseURL: API_BASE_URL,
    headers: { "x-api-key": API_KEY },
  }),
  { maxRequests: 2, perMilliseconds: 1000 }
);

async function fetchHeroStats(heroName) {
  try {
    const response = await http.get(`${heroName}/stats`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching stats for ${heroName}:`, error.message);
    return null;
  }
}

async function getAllHeroStats() {
  let totalMatches = 0;
  const heroStatsArray = [];

  for (const hero of heroesList) {
    const heroStats = await fetchHeroStats(hero);
    if (heroStats) {
      totalMatches += heroStats.matches; // Sum total matches
      heroStatsArray.push(heroStats);
    }
  }

  // Calculate pick rate for each hero
  const processedStats = heroStatsArray.map(hero => ({
    hero_name: hero.hero_name,
    win_rate: ((hero.wins / hero.matches) * 100).toFixed(2),
    pick_rate: ((hero.matches / totalMatches) * 100).toFixed(2),
    matches: hero.matches,
    wins: hero.wins,
    kda: `${hero.k.toFixed(1)}/${hero.d.toFixed(1)}/${hero.a.toFixed(1)}`
  }));

  return processedStats;
}

module.exports = { getAllHeroStats };
