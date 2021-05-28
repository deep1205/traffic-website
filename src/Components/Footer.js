import React from "react";
import "../Css/Footer.css";
import fb from "../images/fb.png";
import linkin from "../images/linkedin.png";
import insta from "../images/insta.png";
import logo from "../images/logo.png";
import call from "../images/phone.png";
import address from "../images/location.png";
import mail from "../images/mail.png";

function Footer() {
  return (
    <div className="footer">
      <img className="footer_logo" src={logo} alt="logo" />
      <div className="footer_dialog">
        <div className="footer_logos">
          <img src={fb} alt="facebook" />
          <img src={linkin} alt="linked in" />
          <img src={insta} alt="instagram" />
        </div>
        <div className="footer_foottextcontainer">
          <div className="footer_foottext">
            <img src={call} alt="phone" />
            <div>+91 91826 87397</div>
          </div>
          <div className="footer_foottext">
            <img src={address} alt="address" />
            <div>MCIIE, IIT (BHU) Varanasi</div>
          </div>
          <div className="footer_foottext">
            <img src={mail} alt="mail" />
            <div>prioritypulse@gmail.com</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
