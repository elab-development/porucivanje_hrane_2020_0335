import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem('auth_token');
  const user = JSON.parse(sessionStorage.getItem('user'));

  const handleLogout = async () => {
    try {
      await axios.post('http://127.0.0.1:8000/api/logout', {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Brisanje tokena i korisničkih podataka iz sessionStorage
      sessionStorage.removeItem('auth_token');
      sessionStorage.removeItem('user');
      // Preusmeravanje na početnu stranicu
      navigate('/');
    } catch (error) {
      console.error('Greška prilikom odjave:', error);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="/path-to-logo.png" alt="Wolt" className="logo" />
        <span className="location">
          <i className="location-icon">📍</i> Beograd
        </span>
      </div>
      <div className="navbar-links">
        {!token ? (
          // Rute za neulogovane korisnike
          <>
            <Link to="/">Početna</Link>
            <Link to="/auth">Prijava</Link>
            <Link to="/auth">Registracija</Link>
          </>
        ) : user.role === 'admin' ? (
          // Rute za admina
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/users">Korisnici</Link>
            <Link to="/products">Proizvodi</Link>
            <button onClick={handleLogout}>Odjava</button>
          </>
        ) : user.role === 'store' ? (
          // Rute za korisnika koji je store
          <>
            <Link to="/dashboard">Moja Prodavnica</Link>
            <Link to="/products">Proizvodi</Link>
            <Link to="/orders">Porudžbine</Link>
            <button onClick={handleLogout}>Odjava</button>
          </>
        ) : (
          // Rute za običnog ulogovanog korisnika
          <>
            <Link to="/">Početna</Link>
            <Link to="/products">Proizvodi</Link>
            <Link to="/orders">Moje Porudžbine</Link>
            <button onClick={handleLogout}>Odjava</button>
          </>
        )}
      </div>
      {token && (
        <div className="navbar-user">
          <span>Dobrodošli, {user.name}</span>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
