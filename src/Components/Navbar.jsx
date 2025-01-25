import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./Navbar.css";
import logo from "../assets/Images/logo.png";
import {
  FaHome,
  FaSearch,
  FaPlus,
  FaFilm,
  FaTv,
  FaStar,
  FaUser,
  FaBars,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const history = useHistory();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleProfile = () => {
    setProfileOpen(!profileOpen);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log(`Searching for: ${searchQuery}`); // Debugging log
      history.push(`/search?query=${searchQuery}`);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="Disney Logo" className="logo" />
      </div>
      <div className="navbar-toggle" onClick={toggleMenu}>
        <FaBars />
      </div>
      <div className={`navbar-items ${isOpen ? "open" : ""}`}>
        <div className="navbar-item">
          <Link to="/">
            <FaHome /> Home
          </Link>
        </div>
        <div className="navbar-item">
          <Link to="/search">
            <FaSearch /> Search
          </Link>
        </div>
        <div className="navbar-item">
          <Link to="/watchlist">
            <FaPlus /> Watch List
          </Link>
        </div>
        <div className="navbar-item dropdown">
          <Link to="/originals">
            <FaStar /> Originals
          </Link>
          <div className="dropdown-content">
            <Link to="/movies">Movies</Link>
            <Link to="/series">Series</Link>
          </div>
        </div>
      </div>
      <div className="navbar-right">
        <form className="search-bar" onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button type="submit" className="search-icon">
            <FaSearch />
          </button>
        </form>
        <div className="profile" onClick={toggleProfile}>
          <FaUser className="profile-icon" />
          <div className={`profile-dropdown ${profileOpen ? "open" : ""}`}>
            <div className="profile-item">
              <FaUser /> My Account
            </div>
            <div className="profile-item">
              <FaCog /> Settings
            </div>
            <div className="profile-item">
              <FaSignOutAlt /> Log Out
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;