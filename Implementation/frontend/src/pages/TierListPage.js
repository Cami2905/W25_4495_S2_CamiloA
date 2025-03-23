import React, { useEffect, useState } from "react";
import axios from "axios";
import "./TierListPage.css";

const TierListPage = () => {
  const [tierList, setTierList] = useState({
    S: [],
    A: [],
    B: [],
    C: [],
    D: []
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTierList = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/tier-list");
  
        // Log the response data for debugging
        console.log("API Response:", response.data);
  
        // Categorize heroes into tiers based on win rates
        const tiers = { S: [], A: [], B: [], C: [], D: [] };
  
        response.data.forEach((hero) => {
          const winRate = parseFloat(hero.win_rate); // Ensure it's a number
          console.log(`Hero: ${hero.hero_name}, Win Rate: ${winRate}, Type: ${typeof winRate}`);
  
          if (winRate >= 53.0) tiers.S.push(hero);
          else if (winRate >= 51.0) tiers.A.push(hero);
          else if (winRate >= 49.0) tiers.B.push(hero);
          else if (winRate >= 46.0) tiers.C.push(hero);
          else tiers.D.push(hero);
        });
  
        setTierList(tiers);
      } catch (err) {
        setError("Failed to load tier list.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchTierList();
  }, []);
  
  
  if (loading) return <p>Loading tier list...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="tier-list-container">
      <h1 className="tier-list-title">Hero Tier List</h1>

      {Object.entries(tierList).map(([tier, heroes]) => (
        <div key={tier} className={`tier-section tier-${tier}`}>
          <h2 className="tier-title">{tier}-Tier</h2>
          <div className="tier-heroes">
            {heroes.map((hero) => (
              <div key={hero.name} className="tier-hero">
                <img src={hero.hero_icon} alt={hero.hero_name} onError={(e) => e.target.src = "/images/default_icon.png"}/>
                <p className="hero-tier-name">{hero.name}</p>
                <p className="hero-tier-name">{hero.hero_name}</p>
                <p className="hero-winrate">{hero.win_rate ? `${hero.win_rate}%` : "N/A"}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TierListPage;
