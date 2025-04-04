import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./PlayerDetailsPage.css";

const mapNames = {
  1032: "Yggdrasill Path",
  1034: "Shin-Shibuya",
  1101: "Hall of Djalia",
  1118: "Sanctum Sanctorum",
  1156: "Throne Room",
  1244: "Frozen Airfield",
  1230: "Shin-Shibuya",
  1245: "Spider-Islands",
  1267: "Hall of Djalia",
  1161: "Stellar Spaceport",
};

const capitalizeWords = (str) => {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
};

const PlayerDetailsPage = () => {
  const { playerId } = useParams();
  const [playerData, setPlayerData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlayerData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/player-profile/${playerId}`);
        setPlayerData(response.data);
      } catch (err) {
        console.error("❌ Error fetching player data:", err);
        setError("Player not found.");
      }
      setLoading(false);
    };

    fetchPlayerData();
  }, [playerId]);

  if (loading) return <div className="loading">Loading player data...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!playerData) return null;

  const { player, match_history } = playerData;

  return (
    <div className="player-details-container">
      {/* Player Overview Section */}
      <div className="player-overview">
        <img
          className="player-icon"
          src={`https://marvelrivalsapi.com/rivals${player.icon.player_icon}`}
          alt="Player Icon"
        />
        <div className="player-info">
          <h1>{playerData.name}</h1>
          <p>Level: {player.level}</p>
          <p>Last Match: 1 week ago</p>
        </div>
        <button className="update-button">Update</button>
      </div>

      {/* Tabs Navigation */}
      <div className="tabs-container">
        <button className="active">Overview</button>
        <button>Heroes</button>
        <button>Maps</button>
        <button>Matchups</button>
      </div>

      {/* Rank & Match History Section */}
      <div className="rank-match-container">
        {/* Rank Card */}
        <div className="rank-card">
          <h3>Rank</h3>
          <div className="rank-info">
            <img
              className="rank-icon"
              src={`https://marvelrivalsapi.com/rivals${player.rank.image}`}
              alt="Rank Icon"
            />
            <div>
              <p className="rank-name">{player.rank.rank}</p>
              <p className="rank-score">
                {player.info.rank_game_season["1001003"].rank_score.toFixed(0)} score
              </p>
            </div>
            <p className="rank-winrate">Win Rate: 56.45%</p>
          </div>
        </div>

        {/* Match History */}
        <div className="match-history">
          <h3>Match History</h3>
          {match_history.map((match, index) => {
            const { kills, deaths, assists, is_win, hero_name, hero_type } = match.player_performance;

            const heroDisplayName = capitalizeWords(hero_name);
            const matchType = match.game_mode_id === 1 ? "Competitive" : "Quick Play";
            const mapDisplayName = mapNames[match.map_id] || "Unknown Map";
            const duration = Math.round(match.duration);
            const minutes = Math.floor(duration / 60);
            const seconds = duration % 60;
            const formattedDuration = `${minutes}m ${seconds}s`;
            const kda = ((kills + assists) / (deaths || 1)).toFixed(2);

            return (
              <div key={index} className={`match-card ${is_win.is_win ? "win" : "loss"}`}>
                <div className="match-info">
                  <div className="match-hero">
                    <img
                      className="hero-icon"
                      src={`https://marvelrivalsapi.com/rivals${hero_type}`}
                      alt={heroDisplayName}
                    />
                  </div>

                  <div className="hero-details">
                    <div className="hero-name">{heroDisplayName}</div>
                    <div className={`match-result-time ${is_win.is_win ? "win" : "loss"}`}>{is_win.is_win ? "WIN" : "LOSS"} {formattedDuration}</div>
                  </div>
                </div>

                <div className="match-stats">
                  <div>
                    <span className="kills">{kills}</span> / <span className="deaths">{deaths}</span> / <span className="assists">{assists}</span>
                  </div>
                  <div className="kda">{kda} KDA</div>
                </div>

                <div className="match-type">{matchType}</div>

                <div className="map-info">
                  <div className="map-name">{mapDisplayName}</div>
                  <img
                    className="map-thumbnail"
                    src={`https://marvelrivalsapi.com/${match.map_thumbnail}`}
                    alt={mapDisplayName}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PlayerDetailsPage;









