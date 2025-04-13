import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import './Contact.css';

function Contact() {
  const MAX_MESSAGE_LENGTH = 500; // Set maximum character limit for message
  
  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [result, setResult] = useState("");

  // Validation functions
  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };
  
  const validatePhone = (phone) => {
    // Allow empty phone (since it's optional) or validate format
    return !phone || /^[\d+\-() ]{10,15}$/.test(phone);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // For message field, enforce character limit
    if (name === "message" && value.length > MAX_MESSAGE_LENGTH) {
      return; // Don't update if exceeding limit
    }
    
    setFormState((prev) => ({ ...prev, [name]: value }));
    
    // Validate on change
    if (name === "email") {
      setErrors(prev => ({ 
        ...prev, 
        email: value && !validateEmail(value) ? "Please enter a valid email address" : "" 
      }));
    } else if (name === "phone") {
      setErrors(prev => ({ 
        ...prev, 
        phone: value && !validatePhone(value) ? "Please enter a valid phone number" : "" 
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all fields before submission
    const newErrors = {
      email: formState.email && !validateEmail(formState.email) ? "Please enter a valid email address" : "",
      phone: formState.phone && !validatePhone(formState.phone) ? "Please enter a valid phone number" : "",
    };
    
    setErrors(newErrors);
    
    // If there are errors, don't submit
    if (Object.values(newErrors).some(error => error)) {
      return;
    }
    
    setResult("Sending...");
    const formData = new FormData(e.target);

    formData.append("access_key", "e0e8251d-f2fa-4d7a-952c-053ea1d7c032");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      e.target.reset();
      setFormState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: '',
      });
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };

  return (
    <section id="contact" className="contact-page">
      <Helmet>
        <meta name="description" content="Contact AAXI for custom metal fabrication services." />
      </Helmet>
      <h1 className="contact-title">Contact Us</h1>
      <div className="contact-container">
        <div className="contact-form-section">
          <h1>Get in Touch</h1>
          <p>We're here to help. Chat to our friendly team 24/7 and get set up and ready to go in just 5 minutes.</p>
          <div className="contact-links">
            <a href="tel:+17059942294">
              <i className="fas fa-phone-volume"></i> Call us now | +1 (705) 994-2294
            </a>
            <a href="mailto:info@aaxi.ca">
              <i className="fas fa-envelope"></i> Shoot us an email
            </a>
          </div>
          <h2 className="form-title">Send us a message now!</h2>
          <form className="contact-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="firstName"
              placeholder="First name"
              value={formState.firstName}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last name"
              value={formState.lastName}
              onChange={handleChange}
              required
            />
            <div className="input-container">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formState.email}
                onChange={handleChange}
                required
                className={errors.email ? "error" : ""}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>
            <div className="input-container">
              <input
                type="tel"
                name="phone"
                placeholder="Phone number"
                value={formState.phone}
                onChange={handleChange}
                className={errors.phone ? "error" : ""}
              />
              {errors.phone && <span className="error-message">{errors.phone}</span>}
            </div>
            <div className="textarea-container">
              <textarea
                name="message"
                placeholder="Message"
                value={formState.message}
                onChange={handleChange}
                required
              ></textarea>
              <div className="character-count">
                <span className={formState.message.length > MAX_MESSAGE_LENGTH * 0.9 ? "near-limit" : ""}>
                  {formState.message.length}/{MAX_MESSAGE_LENGTH}
                </span>
              </div>
            </div>
            <button type="submit">Send Message</button>
          </form>
          <span className="result-message">{result}</span>
        </div>
        <div className="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d184552.57289994948!2d-79.5181358081316!3d43.71815566213179!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d4cb90d7c63ba5%3A0x323555502ab4c477!2sToronto%2C%20ON%2C%20Canada!5e0!3m2!1sen!2sus!4v1654123456789!5m2!1sen!2sus"
            title="AAXI Location Map"
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </section>
  );
}

export default Contact;
