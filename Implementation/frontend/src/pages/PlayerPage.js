import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import navigation hook
import "./PlayerPage.css";

const mockPlayers = [
  {
    uid: "12345",
    name: "IronLegend",
    rank: "Diamond",
    winRate: "58.3%",
    matchesPlayed: 120,
    favoriteHero: "Iron Man",
    avatar: "/images/player_avatar1.png",
  },
  {
    uid: "67890",
    name: "StormMaster",
    rank: "Platinum",
    winRate: "52.7%",
    matchesPlayed: 200,
    favoriteHero: "Storm",
    avatar: "/images/player_avatar2.png",
  },
];

const PlayerPage = () => {
  const [searchUID, setSearchUID] = useState("");
  const [player, setPlayer] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Hook for navigation

  const handleSearch = () => {
    const foundPlayer = mockPlayers.find((p) => p.uid === searchUID);
    if (foundPlayer) {
      setPlayer(foundPlayer);
      setError("");
    } else {
      setPlayer(null);
      setError("Player not found. Please check the UID.");
    }
  };

  const handlePlayerClick = (uid) => {
    navigate(`/player/${uid}`); // Navigate to Player Details Page
  };

  return (
    <div className="player-page-container">
      <h1 className="player-title">Search Player by UID</h1>

      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Enter Player UID..."
          value={searchUID}
          onChange={(e) => setSearchUID(e.target.value)}
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">
          Search
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}

      {player && (
        <div className="player-profile" onClick={() => handlePlayerClick(player.uid)}>
          <img src={player.avatar} alt={player.name} className="player-avatar" />
          <h2 className="player-name">{player.name}</h2>
          <p><strong>Rank:</strong> {player.rank}</p>
          <p><strong>Win Rate:</strong> {player.winRate}</p>
          <p><strong>Matches Played:</strong> {player.matchesPlayed}</p>
          <p><strong>Favorite Hero:</strong> {player.favoriteHero}</p>
        </div>
      )}
    </div>
  );
};

export default PlayerPage;
