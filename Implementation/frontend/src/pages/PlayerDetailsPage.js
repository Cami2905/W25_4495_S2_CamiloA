import React, { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./PlayerDetailsPage.css";

const mapNames = {
  1032: "Yggdrasill Path",
  1034: "Shin-Shibuya",
  1101: "Hall of Djalia",
  1118: "Sanctum Sanctorum",
  1148: "Spider-Islands",
  1155: "Bifrost Garden",
  1156: "Throne Room",
  1161: "Stellar Spaceport",
  1162: "Imperial Institute of Science",
  1169: "Warrior Falls",
  1170: "Royal Palace",
  1201: "Midtown",
  1230: "Shin-Shibuya",
  1231: "Yggdrasill Path",
  1235: "Birnin T'Challa",
  1236: "Royal Palace",
  1240: "Symbiotic Surface",
  1243: "Super-Soldier Factory",
  1244: "Frozen Airfield",
  1245: "Spider-Islands",
  1246: "Ninomaru",
  1254: "Royal Palace",
  1267: "Hall of Djalia",
  1272: "Birnin T'Challa",
  1287: "Hell's Heaven",
  1288: "Hell's Heaven",
  1289: "Dancing Heaven",
  1290: "Symbiotic Surface",
  1291: "Midtown",
  1292: "Central Park",
};

const capitalizeWords = (str) => {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
};

const safeDivide = (value, divisor) => {
  return divisor > 0 ? (value / divisor).toFixed(1) : "0.0";
};

const PlayerDetailsPage = () => {
  const { playerId } = useParams();
  const [playerData, setPlayerData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [topHeroMode, setTopHeroMode] = useState("ranked");
  const [activeTab, setActiveTab] = useState("overview");
  const [heroTabMode, setHeroTabMode] = useState("ranked");

  const [sortColumn, setSortColumn] = useState("matches");
  const [sortDirection, setSortDirection] = useState("desc");

  useEffect(() => {
    const fetchPlayerData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/player-profile/${playerId}`);
        console.log("🧩 Player Data:", response.data);
        setPlayerData(response.data);
      } catch (err) {
        console.error("❌ Error fetching player data:", err);
        setError("Player not found.");
      }
      setLoading(false);
    };

    fetchPlayerData();
  }, [playerId]);

  const handleSort = (column) => {
    setSortDirection(sortColumn === column && sortDirection === "desc" ? "asc" : "desc");
    setSortColumn(column);
  };

  const getIcon = (column) => sortColumn === column ? (sortDirection === "asc" ? "⬆️" : "⬇️") : "↕️";

  const sortedHeroes = useMemo(() => {
    if (!playerData) return [];
    const heroes = heroTabMode === "ranked" ? playerData.heroes_ranked : playerData.heroes_unranked;
    return [...heroes].sort((a, b) => {
      const val = (hero, col) => ({
        matches: hero.matches,
        winrate: hero.matches ? hero.wins / hero.matches : 0,
        kda: (hero.kills + hero.assists) / (hero.deaths || 1),
        damage: hero.damage / (hero.play_time / 60 || 1),
        heal: hero.healing / (hero.play_time / 60 || 1),
        mvps: hero.mvps,
        svps: hero.svps,
        time: hero.play_time,
      }[col]);

      return sortDirection === "asc" ? val(a, sortColumn) - val(b, sortColumn) : val(b, sortColumn) - val(a, sortColumn);
    });
  }, [playerData, heroTabMode, sortColumn, sortDirection]);

  const sortedMaps = useMemo(() => {
    if (!playerData?.maps) return [];
    return [...playerData.maps].sort((a, b) => {
      const val = (map, col) => ({
        matches: map.matches,
        winrate: map.matches ? map.wins / map.matches : 0,
        kda: (map.kills + map.assists) / (map.deaths || 1),
        time: map.play_time,
      }[col]);

      return sortDirection === "asc" ? val(a, sortColumn) - val(b, sortColumn) : val(b, sortColumn) - val(a, sortColumn);
    });
  }, [playerData, sortColumn, sortDirection]);

  const sortedMatchups = useMemo(() => {
    if (!playerData?.hero_matchups) return [];
    return [...playerData.hero_matchups].sort((a, b) => {
      const val = (matchup, col) => ({
        matches: matchup.matches,
        winrate: matchup.matches ? matchup.wins / matchup.matches : 0,
      }[col]);

      return sortDirection === "asc"
        ? val(a, sortColumn) - val(b, sortColumn)
        : val(b, sortColumn) - val(a, sortColumn);
    });
  }, [playerData, sortColumn, sortDirection]);

  const formatTime = (seconds) => {
    if (!seconds || seconds < 60) return `${Math.round(seconds)}s`;
    const minutes = Math.floor(seconds / 60);
    return minutes >= 60 ? `${(minutes / 60).toFixed(1)} hrs` : `${minutes} mins`;
  };

  if (loading) return <div className="loading">Loading player data...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!playerData) return null;

  const { player, match_history } = playerData;

  const topHeroes =
    topHeroMode === "ranked"
      ? playerData.heroes_ranked
      : playerData.heroes_unranked;

  const top5Heroes = [...topHeroes]
    .sort((a, b) => b.matches - a.matches)
    .slice(0, 5);

  const heroStatsData = sortedHeroes;

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
      <button className={activeTab === "overview" ? "active" : ""} onClick={() => setActiveTab("overview")}>Overview</button>
      <button className={activeTab === "heroes" ? "active" : ""} onClick={() => setActiveTab("heroes")}>Heroes</button>
      <button className={activeTab === "maps" ? "active" : ""} onClick={() => setActiveTab("maps")}>Maps</button>
      <button className={activeTab === "matchups" ? "active" : ""} onClick={() => setActiveTab("matchups")}>Matchups</button>
    </div>
  
      {activeTab === "overview" && (
        <div className="rank-match-container">
          {/* Rank Card */}
          <div className="rank-card">
            <h3 className="rank-title">Rank</h3>
  
            <div className="rank-header">
              <img
                className="rank-icon"
                src={`https://marvelrivalsapi.com/rivals${player.rank.image}`}
                alt="Rank Icon"
              />
              <p className="rank-name">{player.rank.rank}</p>
            </div>
  
            {/* Stats */}
            {playerData.overall_stats?.ranked && (() => {
              const ranked = playerData.overall_stats.ranked;
              const wins = ranked.total_wins || 0;
              const matches = ranked.total_matches || 1;
              const losses = matches - wins;
              const winRate = ((wins / matches) * 100).toFixed(2);
              const kda = ((ranked.total_kills + ranked.total_assists) / (ranked.total_deaths || 1)).toFixed(2);
  
              return (
                <div className="rank-stats">
                  <p>Win Rate: {winRate}% ({wins}W {losses}L)</p>
                  <p>KDA: {kda}</p>
                  <p>MVPs: {ranked.total_mvp}</p>
                  <p>SVPs: {ranked.total_svp}</p>
                </div>
              );
            })()}
  
            {/* Top Heroes Card */}
            <div className="top-heroes-card">
              <div className="top-heroes-header">
                <h3>Top Heroes</h3>
                <div className="hero-tabs">
                  <button
                    className={topHeroMode === "ranked" ? "active" : ""}
                    onClick={() => setTopHeroMode("ranked")}
                  >
                    Competitive
                  </button>
                  <button
                    className={topHeroMode === "unranked" ? "active" : ""}
                    onClick={() => setTopHeroMode("unranked")}
                  >
                    Quick Play
                  </button>
                </div>
              </div>
  
              {top5Heroes.map((hero, index) => {
                const heroName = capitalizeWords(hero.hero_name);
                const kda = ((hero.kills + hero.assists) / (hero.deaths || 1)).toFixed(2);
                const winRate = ((hero.wins / hero.matches) * 100).toFixed(0);
  
                return (
                  <div key={index} className="hero-row">
                    <div className="hero-info">
                      <img
                        src={`https://marvelrivalsapi.com/rivals${hero.hero_thumbnail}`}
                        alt={heroName}
                      />
                      <div className="hero-name">{heroName}</div>
                    </div>
                    <div className="hero-kda">
                      <div className="hero-kda-value">{kda} KDA</div>
                      <div>
                        {(hero.kills / hero.matches).toFixed(1)}/
                        {(hero.deaths / hero.matches).toFixed(1)}/
                        {(hero.assists / hero.matches).toFixed(1)}
                      </div>
                    </div>
                    <div className="hero-winrate">
                      <div>{winRate}%</div>
                      <div>{hero.matches} games</div>
                    </div>
                  </div>
                );
              })}
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
                      <div className={`match-result-time ${is_win.is_win ? "win" : "loss"}`}>
                        {is_win.is_win ? "WIN" : "LOSS"} {formattedDuration}
                      </div>
                    </div>
                  </div>
  
                  <div className="match-stats">
                    <div>
                      <span className="kills">{kills}</span> / {" "}
                      <span className="deaths">{deaths}</span> / {" "}
                      <span className="assists">{assists}</span>
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
      )}
  
      {activeTab === "heroes" && (
        <div className="heroes-tab">
          <div className="heroes-tab-toggle">
            <button
              className={heroTabMode === "ranked" ? "active" : ""}
              onClick={() => setHeroTabMode("ranked")}
            >
              Competitive
            </button>
            <button
              className={heroTabMode === "unranked" ? "active" : ""}
              onClick={() => setHeroTabMode("unranked")}
            >
              Quick Play
            </button>
          </div>
  
          <table className="hero-stats-table">
            <thead>
              <tr>
                {[["Hero", "hero_name"], ["Matches", "matches"], ["Win Rate", "winrate"], ["KDA", "kda"], ["Damage", "damage"], ["Heal", "heal"], ["MVPs", "mvps"], ["SVPs", "svps"], ["Time", "time"]].map(([label, key]) => (
                  <th key={key} onClick={() => handleSort(key)} className={sortColumn === key ? "sorted-column" : ""}>
                    {label} {getIcon(key)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {heroStatsData.map((hero, index) => {
                const heroName = capitalizeWords(hero.hero_name);
                const avgKills = safeDivide(hero.kills, hero.matches);
                const avgDeaths = safeDivide(hero.deaths, hero.matches);
                const avgAssists = safeDivide(hero.assists, hero.matches);
                const kda = ((Number(avgKills) + Number(avgAssists)) / (Number(avgDeaths) || 1)).toFixed(2);
                const winRate = hero.matches > 0 ? ((hero.wins / hero.matches) * 100).toFixed(2) : "0.00";
                const damagePerMin = safeDivide(hero.damage, hero.play_time / 60);
                const healingPerMin = safeDivide(hero.heal, hero.play_time / 60);
                const timePlayed = formatTime(hero.play_time);
                return (
                  <tr key={index}>
                    <td className="hero-cell">
                      <img src={`https://marvelrivalsapi.com/rivals${hero.hero_thumbnail}`} alt={heroName} />
                      {heroName}
                    </td>
                    <td>{hero.matches}</td>
                    <td>{winRate}%</td>
                    <td>{kda} <div className="sub-kda">{avgKills} / {avgDeaths} / {avgAssists}</div></td>
                    <td>{damagePerMin}/min</td>
                    <td>{healingPerMin}/min</td>
                    <td>{hero.mvp}</td>
                    <td>{hero.svp}</td>
                    <td>{timePlayed}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      {activeTab === "maps" && (
      <div className="maps-tab">
        <table className="hero-stats-table">
          <thead>
            <tr>
              {["Map", "Matches", "Win Rate", "KDA", "Time"].map((label, i) => {
                const key = label.toLowerCase().replace(" ", "");
                return (
                  <th key={key} onClick={() => handleSort(key)} className={sortColumn === key ? "sorted-column" : ""}>
                    {label} {getIcon(key)}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {sortedMaps.map((map, index) => {
              const mapName = capitalizeWords(mapNames[map.map_id] || "Unknown Map");
              const winRate = map.matches ? ((map.wins / map.matches) * 100).toFixed(2) : "0.00";
              const avgKills = safeDivide(map.kills, map.matches);
              const avgDeaths = safeDivide(map.deaths, map.matches);
              const avgAssists = safeDivide(map.assists, map.matches);
              const kda = ((Number(avgKills) + Number(avgAssists)) / (Number(avgDeaths) || 1)).toFixed(2);
              const timePlayed = formatTime(map.play_time);

              return (
                <tr key={index}>
                  <td className="map-cell">
                   <img
                      className="maps-tab-thumbnail"
                      src={`https://marvelrivalsapi.com/${map.map_thumbnail}`}
                      alt={mapName}
                    />
                    <span className="map-name">{mapName}</span>
                  </td>
                  <td>{map.matches}</td>
                  <td>{winRate}%</td>
                  <td>
                    {kda} KDA
                    <div className="sub-kda">{avgKills} / {avgDeaths} / {avgAssists}</div>
                  </td>
                  <td>{timePlayed}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    )}

{activeTab === "matchups" && (
      <div className="matchups-tab">
        <table className="hero-stats-table">
          <thead>
            <tr>
              {["Hero", "Matches", "Win Rate"].map((label) => {
                const key = label.toLowerCase().replace(" ", "");
                return (
                  <th
                    key={key}
                    onClick={() => handleSort(key)}
                    className={sortColumn === key ? "sorted-column" : ""}
                  >
                    {label} {getIcon(key)}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {sortedMatchups.map((matchup, index) => {
              const heroName = capitalizeWords(matchup.hero_name);
              const winRate = matchup.matches > 0 ? ((matchup.wins / matchup.matches) * 100).toFixed(2) : "0.00";
              return (
                <tr key={index}>
                  <td className="hero-cell">
                    <img src={`https://marvelrivalsapi.com/rivals${matchup.hero_thumbnail}`} alt={heroName} />
                    {heroName}
                  </td>
                  <td>{matchup.matches}</td>
                  <td>{winRate}%</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    )}
    </div>
  );
}
  export default PlayerDetailsPage;  