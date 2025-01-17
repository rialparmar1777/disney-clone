import React, { useState } from 'react';
import './Navbar.css';
import logo from '../assets/Images/logo.png';
import { FaHome, FaSearch, FaPlus, FaFilm, FaTv, FaStar, FaUser, FaBars } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="Disney Logo" className="logo" />
        <div className={`navbar-items ${isOpen ? 'open' : ''}`}>
          <div className="navbar-item"><FaHome /> Home</div>
          <div className="navbar-item"><FaSearch /> Search</div>
          <div className="navbar-item"><FaPlus /> Watchlist</div>
          <div className="navbar-item"><FaFilm /> Movies</div>
          <div className="navbar-item"><FaTv /> Series</div>
          <div className="navbar-item"><FaStar /> Originals</div>
        </div>
      </div>
      <div className="navbar-right">
        <FaUser /> Profile
      </div>
      <div className="navbar-toggle" onClick={toggleMenu}>
        <FaBars />
      </div>
    </nav>
  );
};

export default Navbar;