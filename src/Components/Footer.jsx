import React from "react";
import "./Footer.css";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Footer Links */}
        <div className="footer-links">
          <div className="footer-column">
            <h4>About</h4>
            <ul>
              <li>About Us</li>
              <li>Careers</li>
              <li>Press</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Help</h4>
            <ul>
              <li>FAQs</li>
              <li>Contact Support</li>
              <li>Terms of Use</li>
              <li>Cookie Preferences</li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Discover</h4>
            <ul>
              <li>Disney+ Originals</li>
              <li>Gift Cards</li>
              <li>Partnerships</li>
              <li>Community</li>
            </ul>
          </div>
        </div>

        {/* Social Media */}
        <div className="footer-social">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <FaFacebookF />
            <FaTwitter />
            <FaInstagram />
            <FaYoutube />
            <FaLinkedinIn />
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Disney Clone. All rights reserved.</p>
        <p>Powered by Rial and love for Disney.</p>
      </div>
    </footer>
  );
};

export default Footer;