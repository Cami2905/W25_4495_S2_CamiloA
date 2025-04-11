import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import "./RankingsPage.css";

const TOTAL_MATCHES = 651899;

const capitalizeWords = (str) =>
  str.replace(/\b\w/g, (char) => char.toUpperCase());

const RankingsPage = () => {
  const [heroesData, setHeroesData] = useState([]);
  const [sortColumn, setSortColumn] = useState("winrate");
  const [sortDirection, setSortDirection] = useState("desc");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRankings = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/rankings");
        setHeroesData(res.data);
      } catch (error) {
        console.error("Error fetching rankings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRankings();
  }, []);

  const handleSort = (column) => {
    setSortDirection((prev) =>
      column === sortColumn ? (prev === "asc" ? "desc" : "asc") : "desc"
    );
    setSortColumn(column);
  };

  const getIcon = (column) =>
    sortColumn === column ? (sortDirection === "asc" ? "⬆️" : "⬇️") : "↕️";

  const sortedData = useMemo(() => {
    return [...heroesData].sort((a, b) => {
      const getValue = (hero, key) => {
        switch (key) {
          case "winrate":
            return hero.matches ? hero.wins / hero.matches : 0;
          case "pickrate":
            return hero.matches / TOTAL_MATCHES;
          case "kda":
            return (hero.k + hero.a) / (hero.d || 1);
          case "damage":
            return hero.total_hero_damage / (hero.matches || 1);
          case "healing":
            return hero.total_hero_heal / (hero.matches || 1);
          case "takendamage":
            return hero.total_damage_taken / (hero.matches || 1);
          default:
            return 0;
        }
      };

      const aVal = getValue(a, sortColumn);
      const bVal = getValue(b, sortColumn);

      return sortDirection === "asc" ? aVal - bVal : bVal - aVal;
    });
  }, [heroesData, sortColumn, sortDirection]);

  if (loading) return <div className="loading">Loading hero stats...</div>;

  return (
    <div className="rankings-page">
      <h1>Hero Rankings</h1>
      <table className="hero-stats-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Hero</th>
            <th
              onClick={() => handleSort("winrate")}
              className={sortColumn === "winrate" ? "sorted-column" : ""}
            >
              Win Rate {getIcon("winrate")}
            </th>
            <th
              onClick={() => handleSort("pickrate")}
              className={sortColumn === "pickrate" ? "sorted-column" : ""}
            >
              Pick Rate {getIcon("pickrate")}
            </th>
            <th
              onClick={() => handleSort("kda")}
              className={sortColumn === "kda" ? "sorted-column" : ""}
            >
              KDA {getIcon("kda")}
            </th>
            <th
              onClick={() => handleSort("damage")}
              className={sortColumn === "damage" ? "sorted-column" : ""}
            >
              Avg Damage {getIcon("damage")}
            </th>
            <th
              onClick={() => handleSort("healing")}
              className={sortColumn === "healing" ? "sorted-column" : ""}
            >
              Avg Healing {getIcon("healing")}
            </th>
            <th
              onClick={() => handleSort("takendamage")}
              className={sortColumn === "takendamage" ? "sorted-column" : ""}
            >
              Avg Damage Taken {getIcon("takendamage")}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((hero, index) => {
            const winRate = hero.wins / hero.matches * 100;
            const pickRate = ((hero.matches / TOTAL_MATCHES) * 100).toFixed(2);
            const kdaValue = ((hero.k + hero.a) / (hero.d || 1)).toFixed(2);
            const avgDmg = Math.round(hero.total_hero_damage / (hero.matches || 1)).toLocaleString();
            const avgHeal = Math.round(hero.total_hero_heal / (hero.matches || 1)).toLocaleString();
            const avgTaken = Math.round(hero.total_damage_taken / (hero.matches || 1)).toLocaleString();
            const heroName = capitalizeWords(hero.hero_name.replace(/-/g, " "));
            const heroImageName = hero.hero_name.toLowerCase().replace(/ /g, "_");
            const heroIcon = `/images/${heroImageName}_icon.png`;

            return (
              <tr key={index}>
                <td>
                  <div className={`rank-badge rank-${index + 1 <= 3 ? index + 1 : ""}`}>
                    {index + 1}
                  </div>
                </td>
                <td className="hero-cell">
                  <img src={heroIcon} alt={heroName} />
                  {heroName}
                </td>
                <td>{parseFloat(winRate).toFixed(2)}%</td>
                <td>{pickRate}%</td>
                <td>
                  {kdaValue} KDA
                  <div className="sub-kda">
                    {hero.k.toFixed(1)} / {hero.d.toFixed(1)} / {hero.a.toFixed(1)}
                  </div>
                </td>
                <td>{avgDmg}</td>
                <td>{avgHeal}</td>
                <td>{avgTaken}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default RankingsPage;



