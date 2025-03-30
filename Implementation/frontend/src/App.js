import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import HeroesPage from "./pages/HeroesPage";
import HeroDetailsPage from "./pages/HeroDetailsPage";
import TierListPage from "./pages/TierListPage";
import PlayerPage from "./pages/PlayerPage";
import PlayerDetailsPage from "./pages/PlayerDetailsPage"; 


const Streams = () => <h2>Streams Page</h2>;
const Guides = () => <h2>Guides Page</h2>;

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/heroes" element={<HeroesPage />} />
          <Route path="/heroes/:id" element={<HeroDetailsPage />} />
          <Route path="/tier-list" element={<TierListPage />} />
          <Route path="/player" element={<PlayerPage />} />
          <Route path="/player/:playerId" element={<PlayerDetailsPage />} />
          <Route path="/streams" element={<Streams />} />
          <Route path="/guides" element={<Guides />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


