// Navbar.js

import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation
import './Navbar.css'; // Import the CSS file

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <h1 className="navbar__title">Process Scheduler</h1>
        <ul className="navbar__list">
          <li className="navbar__item">
            <Link to="/fcfs" className="navbar__link">FCFS</Link>
          </li>
          <li className="navbar__item">
            <Link to="/sjf" className="navbar__link">SJF</Link>
          </li>
          <li className="navbar__item">
            <Link to="/priority" className="navbar__link">Priority</Link>
          </li>
          <li className="navbar__item">
            <Link to="/round_robin" className="navbar__link">Round Robin</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
