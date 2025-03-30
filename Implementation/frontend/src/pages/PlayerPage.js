import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // ✅ Import navigate
import "./PlayerPage.css";

const PlayerPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [playerData, setPlayerData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [forceRender, setForceRender] = useState(0); // ✅ Force UI update
  const navigate = useNavigate(); // ✅ Define navigate function

  const handleSearch = async () => {
    setError(null);
    setPlayerData(null); // ✅ Reset previous search results

    if (!searchTerm.trim()) {
      setError("Please enter a player name.");
      return;
    }

    setLoading(true); // ✅ Show loading state

    try {
      console.log(`🔎 Searching for player: ${searchTerm}`);

      const response = await axios.get(
        `http://localhost:5000/api/player-search/${searchTerm}`
      );

      // ✅ Debugging logs
      console.log("✅ API Raw Response:", response);
      console.log("✅ API Response Data:", response.data);

      // ✅ Ensure response contains expected player data
      if (response.data && typeof response.data === "object" && response.data.name && response.data.uid) {
        console.log("✅ Extracted Player Name:", response.data.name);
        console.log("✅ Extracted Player UID:", response.data.uid);

        // ✅ Update playerData state
        setPlayerData({
          name: response.data.name,
          uid: response.data.uid
        });

        // ✅ Force UI update
        setForceRender(prev => prev + 1);

        console.log("✅ Player Data Set:", { name: response.data.name, uid: response.data.uid });
      } else {
        console.warn("⚠️ No valid player data found.");
        setError("No player found.");
      }
    } catch (err) {
      console.error("❌ Error fetching player data:", err);
      setError("No player found.");
    }

    setLoading(false);
  };

  return (
    <div className="player-search-container" key={forceRender}>
      <h1 className="player-search-title">Find a Player</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter player username..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch} disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {/* ✅ Show error message only when no player is found */}
      {!playerData && error && <p className="error-message">{error}</p>}

      {/* ✅ Display the player card when data is found */}
      {playerData && (
        <div className="player-card" onClick={() => navigate(`/player/${playerData.uid}`)}>
          <h3>{playerData.name}</h3>
          <p>UID: {playerData.uid}</p>
          <button className="view-profile-button">View Profile</button>
        </div>
      )}
    </div>
  );
};

export default PlayerPage;









