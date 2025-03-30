import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./PlayerDetailsPage.css";

const PlayerDetailsPage = () => {
  const { playerId } = useParams();
  const [playerData, setPlayerData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlayerData = async () => {
      try {
        console.log(`📌 Fetching player profile: /api/player-profile/${playerId}`);
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

  const { name, player, overall_stats, match_history } = playerData;

  return (
    <div className="player-details-container">
  
  {/* Player Overview Section */}
  <div className="player-overview">
    <img className="player-icon" src={playerData.player.icon.player_icon} alt="Player Icon" />
    <div className="player-info">
      <h1>{playerData.name}</h1>
      <p>Level: {playerData.player.level}</p>
      <p>Last Match: 1 week ago</p> {/* Adjust this dynamically */}
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

  {/* **Main Section: Rank & Match History Side by Side** */}
  <div className="rank-match-container">
    
      {/* Rank Card */}
      <div className="rank-card">
        <h3>Rank</h3>
        <div className="rank-info">
          <img className="rank-icon" src={playerData.player.rank.image} alt="Rank Icon" />
          <div>
            <p className="rank-name">{playerData.player.rank.rank}</p>
            <p className="rank-score">{playerData.player.info.rank_game_season["1001003"].rank_score.toFixed(0)} score</p>
          </div>
          <p className="rank-winrate">Win Rate: 56.45%</p> {/* Dynamically adjust */}
        </div>
      </div>
    {/* Match History */}
    <div className="match-history">
      <h3>Match History</h3>
      {playerData.match_history.map((match, index) => (
        <div key={index} className={`match-card ${match.player_performance.is_win.is_win ? "win" : "loss"}`}>
          
          <div className="match-info">
            <div className="match-hero">
              <img src={`/heroes/transformations/${match.player_performance.hero_id}-headbig-0.webp`} alt="Hero" />
              <p>{/* Hero Name Here */}</p>
            </div>
            <div className="match-details">
              <p><span className="kills">{match.player_performance.kills}</span> / 
                 <span className="deaths">{match.player_performance.deaths}</span> / 
                 <span className="assists">{match.player_performance.assists}</span>
              </p>
              <p>{match.player_performance.is_win.is_win ? "WIN" : "LOSS"}</p>
              <p>{Math.round(match.duration)}s</p>
            </div>
          </div>

          <div className="map-info">
            <img src={match.map_thumbnail} alt="Map Thumbnail" />
            <p>{match.score_info ? `${match.score_info["0"]} : ${match.score_info["1"]}` : ""}</p>
          </div>

        </div>
      ))}
    </div>

  </div>
</div>

  );
};

export default PlayerDetailsPage;




