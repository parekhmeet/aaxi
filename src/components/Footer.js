import React, { useState } from "react";
import "./Footer.css";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [submitMessage, setSubmitMessage] = useState("");

  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    
    if (!value || validateEmail(value)) {
      setEmailError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!email) {
      setEmailError("Email is required");
      return;
    }
    
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }
    
    setEmailError("");
    setSubmitMessage("Thank you for subscribing!");
    setEmail("");
  };

  return (
    <footer className="footer-container">
      <div className="footer-top">
        <div className="footer-col">
          <h2 className="footer-title">AAXI</h2>
          <p className="footer-description">
          High-quality precision metal fabrication services for all your industrial needs
          </p>
        </div>

        <div className="footer-col">
          <h3 className="footer-subtitle">Navigation</h3>
          <ul className="footer-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About Us</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h3 className="footer-subtitle">Services</h3>
          <ul className="footer-links">
            <li><a href="#Metal Fabrication">Metal Fabrication</a></li>
            <li><a href="#Cutting">Precision Cutting</a></li>
            <li><a href="#Machining">CNC Machining</a></li>
            <li><a href="#Custommetal">Custom Metal Design</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h3 className="footer-subtitle">Stay Connected</h3>
          <p className="footer-description">
            Stay connected and receive our latest tips and updates.
          </p>
          <form className="footer-form" onSubmit={handleSubmit}>
            <div className="footer-input-container">
              <input
                type="email"
                className={`footer-input ${emailError ? "footer-input-error" : ""}`}
                placeholder="Enter your email"
                value={email}
                onChange={handleEmailChange}
                required
              />
              {emailError && <span className="footer-error-message">{emailError}</span>}
            </div>
            <button type="submit" className="footer-button">
              Sign Up
            </button>
            {submitMessage && <span className="footer-success-message">{submitMessage}</span>}
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        <p>Copyright © 2025. <span>AAXI</span>. All Rights Reserved.</p>
        <ul className="footer-bottom-links">
          <li><a href="#privacy">Privacy</a></li>
          <li><a href="#terms">Terms of Use</a></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
