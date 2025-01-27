import React from "react";
import "./Settings.css";  // Add styles here
import { FaLock, FaUpload, FaTrashAlt } from "react-icons/fa"; // Import icons

const Settings = () => {
  return (
    <div className="settings-container">
      <h1>Settings</h1>
      <div className="settings-options">
        <div className="option">
          <h3>Change Password</h3>
          <button>
            <FaLock className="icon" /> Change Password
          </button>
        </div>
        <div className="option">
          <h3>Update Profile Picture</h3>
          <button>
            <FaUpload className="icon" /> Upload New Picture
          </button>
        </div>
        <div className="option">
          <h3>Delete Account</h3>
          <button className="delete-btn">
            <FaTrashAlt className="icon" /> Delete My Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;