const axios = require("axios");
const rateLimit = require("axios-rate-limit");
require("dotenv").config(); // Load environment variables

const MRAPI_BASE_URL = "https://mrapi.org";
const API_KEY = process.env.MRAPI_KEY; // Store API key securely

class MRAPIClient {
  constructor(baseURL = MRAPI_BASE_URL) {
    this.http = rateLimit(
      axios.create({
        baseURL,
        headers: { "X-API-Key": API_KEY }, // Attach API key to requests
      }),
      { maxRequests: 2, perMilliseconds: 1000 } // Rate limiting
    );
  }

  async fetchData(endpoint, params = {}) {
    try {
      const response = await this.http.get(endpoint, { params });
      return response.data;
    } catch (error) {
      console.error("API Request Error:", error.response ? error.response.status : error.message);
      throw new Error("Failed to fetch data from MRAPI.");
    }
  }

  async getHeroStats() {
    return this.fetchData("/api/heroes-stats/pc"); // Fetch win rates for all heroes
  }
}

module.exports = new MRAPIClient();
