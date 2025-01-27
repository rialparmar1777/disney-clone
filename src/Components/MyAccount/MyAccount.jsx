import React from "react";
import "./MyAccount.css";  // Add styles here
import profilePic from "../../assets/Images/ProfilePic.jpg"; // Import the profile picture

const MyAccount = () => {
  return (
    <div className="account-container">
      <div className="account-info">
        <h1>My Account</h1>
        <div className="profile-info">
          <img src={profilePic} alt="Profile" className="profile-pic" />
          <div className="profile-details">
            <h2>John Doe</h2>
            <p>Email: john.doe@example.com</p>
            <p>Member Since: January 2021</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;