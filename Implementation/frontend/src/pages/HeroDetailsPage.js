import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./HeroDetailsPage.css";

const HeroDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hero, setHero] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const cleanDescription = (text) => {
    if (!text) return "No description available.";
    return text
      .replace(/<[^>]+>/g, "")         
      .replace(/\{[^}]+\}/g, "")        
      .trim();
  };
  
  const renderDifficultyStars = (difficulty) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={`star ${i <= difficulty ? "filled" : ""}`}>★</span>
      );
    }
    return stars;
  };
  
  

  useEffect(() => {
    const fetchHeroDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/heroes/hero/${id}`);
        setHero(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load hero details.");
      } finally {
        setLoading(false);
      }
    };

    fetchHeroDetails();
  }, [id]);

  if (loading) return <p>Loading hero details...</p>;
  if (error) return <p>{error}</p>;
  if (!hero) return <p>Hero not found.</p>;

  return (
    <div className="hero-details-container">
      <button onClick={() => navigate("/heroes")} className="back-button">
        ← Back to Heroes
      </button>

      <div className="hero-details-content">
        <div className="hero-image-container">
          <img
            src={`/images/${hero.name.toLowerCase().replace(/\s+/g, "_")}_detail.png`}
            alt={hero.name}
            className="hero-detail-image"
          />
          <p className="hero-description">{hero.bio}</p>
        </div>

        <div className="hero-info">
          <h1 className="hero-name-details">{hero.name}</h1>
          <p className="real-name"><strong>Real Name:</strong> {hero.real_name}</p>
          <div className="hero-meta-section">
            <div className="hero-role-box">{hero.role.toUpperCase()}</div>
            <div className="hero-health-section">
              <h3>Health</h3>
              <div className="health-bar-container">
                <div
                  className="health-bar-fill"
                  style={{
                    width: `${Math.min(parseInt(hero.transformations?.[0]?.health || 0), 700) / 7}%`
                  }}
                ></div>
              </div>
              <div className="health-value">{hero.transformations?.[0]?.health} HP</div>
            </div>
            <div className="hero-difficulty-section">
              <h3>Difficulty</h3>
              <div className="stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`star ${star <= parseInt(hero.difficulty || 0) ? "filled" : ""}`}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="hero-biography">
            <h2>Lore</h2>
            <p>{hero.lore}</p>
          </div>
        </div>
      </div>

      <div className="hero-abilities-section">
        <h2>ABILITIES</h2>
        <div className="abilities-grid">
        {hero.abilities?.filter(ability => ability.name).map((ability, index) => (
          <div key={index} className="ability-card">
            <div className="ability-left">
              <img
                src={`https://marvelrivalsapi.com/rivals${ability.icon}`}
                alt={ability.name}
                className="ability-icon"
              />
              <div className={`ability-type ${ability.type.toLowerCase()}`}>
                {ability.type.toUpperCase()}
              </div>
            </div>
            <div className="ability-info">
              <h3>{ability.name.toUpperCase()}</h3>
              <p>{cleanDescription(ability.description)}</p>
            </div>
          </div>
        ))}
        </div>
      </div>
    </div>
  );
};

export default HeroDetailsPage;





