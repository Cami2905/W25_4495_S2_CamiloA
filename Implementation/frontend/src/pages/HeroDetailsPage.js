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

  useEffect(() => {
    const fetchHeroDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/heroes/${id}`);
        setHero(response.data);
      } catch (err) {
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
      <button onClick={() => navigate("/heroes")} className="back-button">← Back to Heroes</button>

      <div className="hero-details-content">
        {/* Left Side - Hero Image & Description */}
        <div className="hero-image-container">
          <img src={`/images/${hero.detailImage}`} alt={hero.name} className="hero-detail-image" />
          <p className="hero-description">{hero.description}</p>
        </div>

        {/* Right Side - Stats & Biography */}
        <div className="hero-info">
          <h1 className="hero-name">{hero.name}</h1>
          <div className="hero-role">{hero.role}</div>
          <div className="hero-stats">
            <p><strong>Win Rate:</strong> {hero.winRate}%</p>
            <p><strong>Pick Rate:</strong> {hero.pickRate}%</p>
            <p><strong>Ban Rate:</strong> {hero.banRate}%</p>
          </div>
          <div className="hero-biography">
            <h2>Biography</h2>
            <p>{hero.biography}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroDetailsPage;


