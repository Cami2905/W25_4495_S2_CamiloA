import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/NavBar.js";

const Home = () => <h2>Home Page</h2>;
const Heroes = () => <h2>Heroes Page</h2>;
const TierList = () => <h2>Tier List Page</h2>;
const Community = () => <h2>Community Page</h2>;
const Streams = () => <h2>Streams Page</h2>;
const Guides = () => <h2>Guides Page</h2>;

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/heroes" element={<Heroes />} />
          <Route path="/tier-list" element={<TierList />} />
          <Route path="/community" element={<Community />} />
          <Route path="/streams" element={<Streams />} />
          <Route path="/guides" element={<Guides />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


