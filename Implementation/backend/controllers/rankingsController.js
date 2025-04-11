require("dotenv").config();
const axios = require("axios");
const HeroRankingStats = require("../models/HeroRankingStats");

const heroIds = [
  1022, 1018, 1027, 1011, 1037, 1042, 1051, 1039, 1035,
  1026, 1033, 1021, 1024, 1017, 1052, 1034, 1029, 1040, 1030,
  1045, 1048, 1038, 1036, 1032, 1043, 1015, 1014, 1041, 1049,
  1046, 1025, 1050, 1047, 1016, 1031, 1020, 1023
];

let currentIndex = 0;

exports.updateNextHeroRanking = async (req, res) => {
  try {
    if (currentIndex >= heroIds.length) {
      return res.status(200).json({ message: "All heroes updated." });
    }

    const heroId = heroIds[currentIndex];

    const response = await axios.get(
      `https://marvelrivalsapi.com/api/v1/heroes/hero/${heroId}/stats`,
      {
        headers: {
          "x-api-key": process.env.MARVEL_RIVALS_API_KEY
        }
      }
    );

    const data = response.data;

    const heroData = {
      hero_id: heroId,
      hero_name: data.hero_name || heroId.toString(),
      hero_thumbnail: data.hero_thumbnail,
      matches: data.matches,
      wins: data.wins,
      k: data.k,
      d: data.d,
      a: data.a,
      total_hero_damage: data.total_hero_damage,
      total_hero_heal: data.total_hero_heal,
      total_damage_taken: data.total_damage_taken,
      updatedAt: new Date()
    };

    await HeroRankingStats.findOneAndUpdate(
      { hero_id: heroId },
      heroData,
      { upsert: true, new: true }
    );

    console.log(`✅ Updated hero: ${heroId}`);
    currentIndex++;

    res.status(200).json({ message: `Updated stats for hero ID ${heroId}`, currentIndex });
  } catch (error) {
    console.error("❌ Error updating hero ranking:", error.message);
    res.status(500).json({ error: "Failed to update hero stats" });
  }
};

exports.getAllHeroRankings = async (req, res) => {
  try {
    const heroes = await HeroRankingStats.find().sort({ hero_name: 1 });
    res.status(200).json(heroes);
  } catch (error) {
    console.error("❌ Error fetching hero rankings:", error);
    res.status(500).json({ error: "Failed to fetch hero rankings" });
  }
};

