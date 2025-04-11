import React, { useState, useEffect } from "react";
import axios from "axios";
import "./HeroesPage.css";
import { useNavigate } from "react-router-dom";

const HeroesPage = () => {
  const [heroes, setHeroes] = useState([]);
  const [filteredHeroes, setFilteredHeroes] = useState([]);
  const [selectedRole, setSelectedRole] = useState("All");

  useEffect(() => {
    const fetchHeroes = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/heroes");
        setHeroes(response.data);
        setFilteredHeroes(response.data);
      } catch (err) {
        console.error("Error fetching heroes:", err);
      }
    };

    fetchHeroes();
  }, []);

  const handleFilterChange = (role) => {
    setSelectedRole(role);
    if (role === "All") {
      setFilteredHeroes(heroes);
    } else {
      setFilteredHeroes(heroes.filter(hero => hero.role === role));
    }
  };

  const navigate = useNavigate();

  const handleHeroClick = (heroName) => {
    navigate(`/heroes/${encodeURIComponent(heroName)}`);
  };
   

  return (
    <div className="heroes-page-container">
      <div className="header-container">
        <h1 className="heroes-title">Heroes</h1>
        <select className="filter-dropdown" value={selectedRole} onChange={(e) => handleFilterChange(e.target.value)}>
          <option value="All">All Classes</option>
          <option value="Tank">Tanks</option>
          <option value="Duelist">Duelists</option>
          <option value="Support">Supports</option>
        </select>
      </div>

      <div className="heroes-grid">
        {filteredHeroes.map(hero => (
          <div key={hero._id} className="hero-card" onClick={() => handleHeroClick(hero.name)}>
            <img src={`/images/${hero.image}`} alt={hero.name} className="hero-image" />
            <p className="hero-name-grid">{hero.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroesPage;



