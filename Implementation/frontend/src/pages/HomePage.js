import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="home-container">
      <div className="background-overlay" />

      <div className="home-content">
        <img src="/images/rivalslogo.png" alt="RIVALYTICS Logo" className="home-logo" />
        <h1 className="home-title">Welcome to RIVALYTICS</h1>
      </div>

      <div className="quick-links">
        <Link to="/rankings" className="quick-link-card">
          <h2>🏆 Rankings</h2>
          <p>See who’s on top this week</p>
        </Link>
        <Link to="/tier-list" className="quick-link-card">
          <h2>📊 Tier List</h2>
          <p>Explore the current meta</p>
        </Link>
        <Link to="/heroes" className="quick-link-card">
          <h2>🦸 Heroes</h2>
          <p>Compare stats and roles</p>
        </Link>
        <Link to="/player" className="quick-link-card">
          <h2>🔍 Find Player</h2>
          <p>Check your friends or rivals</p>
        </Link>
      </div>

      {/* New "What is RIVALYTICS" Section */}
      <div className="what-is-rivalytics">
        <h2>What is RIVALYTICS?</h2>
        <div className="feature-description">
          <h3>🏆 Rankings</h3>
          <p>Track and sort heroes by performance metrics like win rate, KDA, and more.</p>
        </div>
        <div className="feature-description">
          <h3>📊 Tier List</h3>
          <p>Discover the top-performing heroes based on up-to-date stats.</p>
        </div>
        <div className="feature-description">
          <h3>🦸 Heroes</h3>
          <p>Analyze hero stats including average KDA, healing, and more across ranked and unranked play.</p>
        </div>
        <div className="feature-description">
          <h3>🔍 Find Player</h3>
          <p>Search for players by UID and view detailed performance data, match history, and top heroes.</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;



