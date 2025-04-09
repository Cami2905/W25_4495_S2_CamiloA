const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config(); // ✅ Load environment variables from .env

// Import routes
const tierListRoutes = require("./routes/tierListRoutes");
const heroRoutes = require("./routes/heroRoutes");
const playerRoutes = require("./routes/playerRoutes"); // ✅ Import new player routes
const rankingsRoutes = require("./routes/rankingsRoutes");


const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json()); // ✅ Parse JSON request bodies

// ✅ MongoDB Connection
const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
  console.error("❌ MONGO_URI is missing. Check your .env file.");
  process.exit(1); // Stop server if no URI is provided
}

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ API Routes
app.use("/api", tierListRoutes);
app.use("/api/heroes", heroRoutes);
app.use("/api", playerRoutes);
app.use("/api/rankings", rankingsRoutes);


// ✅ Default Route
app.get("/", (req, res) => {
  res.send("Rivalytics API is running...");
});

// ✅ Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));





