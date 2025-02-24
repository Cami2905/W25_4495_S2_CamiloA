import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">Marvel Rivals Analytics</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/heroes">Heroes</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/tier-list">Tier List</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/community">Community</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/streams">Streams</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/guides">Guides</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
