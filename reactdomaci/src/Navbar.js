 
import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="/path-to-logo.png" alt="Wolt" className="logo" />
        <span className="location">
          <i className="location-icon">📍</i> Beograd
        </span>
      </div>
      <div className="navbar-links">
        <a href="#">Otkrivanje</a>
        <a href="#">Restorani</a>
        <a href="#">Radnje</a>
      </div>
      <div className="navbar-actions">
        <input type="text" placeholder="Traži na Woltu..." className="search-input" />
        <a href="#" className="navbar-link">Prijava</a>
        <a href="#" className="navbar-register">Registracija</a>
      </div>
    </nav>
  );
};

export default Navbar;
