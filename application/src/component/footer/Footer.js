import "./FooterStyles.css";
import React from "react";
import {
  FaHome,
  FaPhone,
  FaMailBulk,
  FaLinkedin,
  FaTwitter,
  FaFacebook,
} from "react-icons/fa";

export const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-container">
        <div className="left">
          <div className="location">
            <FaHome size={20} style={{ color: "#fff", marginRight: "2rem" }} />
            <div>
              <p>San Francisco State University </p>
              <p>San Francisco, California</p>
            </div>
          </div>
        </div>

        <div className="right">
          <h4>About the Company.</h4>
          <p>This is Team 04. CEO & Founders of Resume Therapy.</p>
        </div>
      </div>
    </div>
  );
};
