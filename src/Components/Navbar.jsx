import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./Auth/AuthContext"; // Import useAuth
import "./Navbar.css";
import logo from "../assets/Images/logo.png";
import {
  FaHome,
  FaSearch,
  FaPlus,
  FaStar,
  FaUser,
  FaBars,
  FaCog,
  FaSignOutAlt,
  FaTv,
  FaPlayCircle,
} from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth(); // Access user and logout from AuthContext

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleProfile = () => setProfileOpen(!profileOpen);

  const handleAccount = () => {
    setProfileOpen(false); // Close dropdown
    navigate("/account");
  };

  const handleSettings = () => {
    setProfileOpen(false);
    navigate("/settings");
  };

  const handleLogout = () => {
    logout(); // Clear user authentication state
    setProfileOpen(false); // Close dropdown
    alert("You have been logged out.");
    navigate("/"); // Redirect to Home
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
        <div className="navbar-item">
          <Link to="/originals">
            <FaStar /> Originals
          </Link>
        </div>
        <div className="navbar-item">
          <Link to="/movies">
            <FaPlayCircle /> Movies
          </Link>
        </div>
        <div className="navbar-item">
          <Link to="/series">
            <FaTv /> Series
          </Link>
        </div>
      </div>
      <div className="navbar-right">
        {user ? ( // Display profile if user is logged in
          <div className="profile" onClick={toggleProfile}>
            <FaUser className="profile-icon" />
            <div className={`profile-dropdown ${profileOpen ? "open" : ""}`}>
              <div className="profile-item" onClick={handleAccount}>
                <FaUser /> My Account
              </div>
              <div className="profile-item" onClick={handleSettings}>
                <FaCog /> Settings
              </div>
              <div className="profile-item" onClick={handleLogout}>
                <FaSignOutAlt /> Log Out
              </div>
            </div>
          </div>
        ) : ( // Display login button if no user
          <button className="login-btn" onClick={() => navigate("/login")}>
            Log In
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
