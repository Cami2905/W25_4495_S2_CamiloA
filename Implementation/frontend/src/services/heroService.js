import axios from 'axios';

const API_URL = 'http://localhost:5000/api/heroes';

export const fetchHeroes = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching heroes:', error);
    throw error;
  }
};

export const createHero = async (heroData) => {
  try {
    const response = await axios.post(API_URL, heroData);
    return response.data;
  } catch (error) {
    console.error('Error creating hero:', error);
    throw error;
  }
};

