import * as React from "react";
import "./Footer.css";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

const Footer = () => {
  return (
    <footer>
      <div className="footer_container">
        <div className="footer_section">
          <h3>Contact Us</h3>
          <p>
            <LocalPhoneIcon /> +123 456 7890
          </p>
          <p>
            <EmailIcon /> info@procritique.com
          </p>
          <p>
            <LocationOnIcon /> 123 Main Street, Bishkek, Kyrgyzstan
          </p>
        </div>
        <div className="footer_section">
          <h3>Follow Us</h3>
          <div className="footer_socials">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <FacebookIcon />
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
              <TwitterIcon />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <InstagramIcon />
            </a>
          </div>
        </div>
        <div className="footer_section">
          <h3>About Us</h3>
          <p>
            ProCritique is your go-to platform for finding and reviewing programming courses. We connect learners with the best courses and provide honest reviews.
          </p>
        </div>
      </div>
      <p>© 2024 ProCritique</p>
    </footer>
  );
};

export default Footer;
