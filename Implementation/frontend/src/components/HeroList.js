import React, { useState, useEffect } from 'react';
import { fetchHeroes } from '../services/heroService';
import styles from './HeroList.module.css';

const HeroList = () => {
  const [heroes, setHeroes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadHeroes = async () => {
      try {
        const data = await fetchHeroes();
        setHeroes(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadHeroes();
  }, []);

  if (loading) return <p>Loading heroes...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container">
      <h2 className="text-center mb-4">Heroes</h2>
      <div className="row">
        {heroes.map(hero => (
          <div key={hero._id} className="col-md-4">
            <div className={`card text-dark ${styles.heroCard}`}>
              <div className="card-body">
                <h5 className="card-title">{hero.name}</h5>
                <p className="card-text">Role: {hero.role}</p>
                <p className="card-text">Win Rate: {hero.winRate}%</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroList;

