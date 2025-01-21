import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link
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

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleProfile = () => {
    setProfileOpen(!profileOpen);
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
            {" "}
            {/* Add Link for Home */}
            <FaHome /> Home
          </Link>
        </div>
        <div className="navbar-item">
          <Link to="/search">
            {" "}
            {/* Add Link for Search */}
            <FaSearch /> Search
          </Link>
        </div>
        <div className="navbar-item">
          <Link to="/watchlist">
            {" "}
            {/* Add Link for Watch List */}
            <FaPlus /> Watch List
          </Link>
        </div>
        <div className="navbar-item">
          <Link to="/originals">
            {" "}
            {/* Add Link for Originals */}
            <FaStar /> Originals
          </Link>
        </div>
        <div className="navbar-item">
          <Link to="/movies">
            {" "}
            {/* Add Link for Movies */}
            <FaFilm /> Movies
          </Link>
        </div>
        <div className="navbar-item">
          <Link to="/series">
            {" "}
            {/* Add Link for Series */}
            <FaTv /> Series
          </Link>
        </div>
      </div>
      <div className="navbar-right">
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
