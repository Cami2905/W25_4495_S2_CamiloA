import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./PlayerDetailsPage.css";

const mockPlayerData = {
  "player_name": "IronLegend", 
  "player_uid": "12345", 
  "last_updated": 1742181470060,
  "player_icon_id": "1000",
  "is_profile_private": false,
  "region": "US",
  "stats": {
    "level": 30,
    "rank": {
      "level": 10,
      "rank": "Platinum 3",
      "score": 2500,
      "win_count": 20
    },
    "total_matches": 100,
    "total_wins": 60,
    "total_losses": 40,
    "total_playtime": {
      "hours": 21,
      "minutes": 6
    },
    "ranked": {
      "total_matches": 50,
      "total_wins": 30,
      "total_losses": 20,
      "total_kills": 200,
      "total_assists": 150,
      "total_deaths": 100,
      "kdr": "2.00"
    },
    "unranked": {
      "total_matches": 50,
      "total_wins": 30,
      "total_losses": 20,
      "total_kills": 250,
      "total_assists": 180,
      "total_deaths": 120,
      "kdr": "2.08"
    }
  }
};

const PlayerDetailsPage = () => {
  const { uid } = useParams();
  const navigate = useNavigate();
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    if (mockPlayerData.player_uid === uid) {
      setPlayer(mockPlayerData);
    }
  }, [uid]);

  if (!player) return <p>Player not found.</p>;

  return (
    <div className="player-details-container">
      <button className="back-button" onClick={() => navigate("/player")}>← Back to Search</button>

      <div className="player-info">
        <img 
          src={`/images/player_avatar_${player.player_icon_id}.png`} 
          alt={player.player_name} 
          className="player-avatar"
        />
        <h1 className="player-name">{player.player_name}</h1>
        <p className="player-region"><strong>Region:</strong> {player.region}</p>
        <p className="player-rank"><strong>Rank:</strong> {player.stats.rank.rank} ({player.stats.rank.score} points)</p>
        <p className="player-level"><strong>Level:</strong> {player.stats.level}</p>
      </div>

      <div className="player-stats-container">
        <div className="player-stats">
          <h2>Overall Stats</h2>
          <p><strong>Total Matches:</strong> {player.stats.total_matches}</p>
          <p><strong>Win Rate:</strong> {((player.stats.total_wins / player.stats.total_matches) * 100).toFixed(1)}%</p>
          <p><strong>Total Playtime:</strong> {player.stats.total_playtime.hours}h {player.stats.total_playtime.minutes}m</p>
        </div>

        <div className="player-stats-section">
          <h2>Ranked Stats</h2>
          <p><strong>Matches:</strong> {player.stats.ranked.total_matches}</p>
          <p><strong>Wins:</strong> {player.stats.ranked.total_wins}</p>
          <p><strong>K/D Ratio:</strong> {player.stats.ranked.kdr}</p>
          <p><strong>Kills:</strong> {player.stats.ranked.total_kills}</p>
          <p><strong>Assists:</strong> {player.stats.ranked.total_assists}</p>
        </div>

        <div className="player-stats-section">
          <h2>Unranked Stats</h2>
          <p><strong>Matches:</strong> {player.stats.unranked.total_matches}</p>
          <p><strong>Wins:</strong> {player.stats.unranked.total_wins}</p>
          <p><strong>K/D Ratio:</strong> {player.stats.unranked.kdr}</p>
          <p><strong>Kills:</strong> {player.stats.unranked.total_kills}</p>
          <p><strong>Assists:</strong> {player.stats.unranked.total_assists}</p>
        </div>
      </div>
    </div>
  );
};

export default PlayerDetailsPage;

