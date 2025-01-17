import React from 'react';
import './Navbar.css';
import logo from '../assets/Images/logo.png';
import { FaHome, FaSearch, FaPlus, FaFilm, FaTv, FaStar, FaUser } from 'react-icons/fa';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="Disney Logo" className="logo" />
        <div className="navbar-item"><FaHome /> Home</div>
        <div className="navbar-item"><FaSearch /> Search</div>
        <div className="navbar-item"><FaPlus /> Watchlist</div>
        <div className="navbar-item"><FaFilm /> Movies</div>
        <div className="navbar-item"><FaTv /> Series</div>
        <div className="navbar-item"><FaStar /> Originals</div>
      </div>
      <div className="navbar-right">
        <FaUser /> Profile
      </div>
    </nav>
  );
};

export default Navbar;