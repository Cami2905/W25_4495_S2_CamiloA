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

        // Categorize heroes into tiers based on win rates
        const tiers = { S: [], A: [], B: [], C: [], D: [] };

        response.data.forEach((hero) => {
          if (hero.winRate >= 55) tiers.S.push(hero);
          else if (hero.winRate >= 52) tiers.A.push(hero);
          else if (hero.winRate >= 49) tiers.B.push(hero);
          else if (hero.winRate >= 46) tiers.C.push(hero);
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
                <img src={`/images/${hero.image}`} alt={hero.name} className="hero-tier-image" />
                <p className="hero-tier-name">{hero.name}</p>
                <p className="hero-winrate">Win Rate: {hero.winRate}%</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TierListPage;
