import React from "react";

import Whyusnew from "../Components/Whyusnew";
import Header from "../Components/Header.js";
import Button from "@material-ui/core/Button";
import "../Css/Login.css";
import Slideshow from "../Components/Slideshow";
import i2 from "../images/i2.jpg";
import i3 from "../images/i3.jpg";
import i5 from "../images/i5.jpg";
import "react-toastify/dist/ReactToastify.css";
const tutorialSteps = [
  {
    label: "image",
    imgPath: i2,
  },
  {
    label: "image",
    imgPath: i3,
  },

  {
    label: "image",
    imgPath: i5,
  },
];

const Login = () => {
  
  

  return (
    <>
      <Header location="login" />
      <div id="loginkiposition">
        <div className="login-page">
          <div className="form">
            <div className="login">
              <div className="login-header">
                <h2 className="myformheadertext">Sign in</h2>
                <p className="myformheadertext">Welcome to Priority Pulse</p>
                <p style={{marginTop:"-14px"}}>Your Pulse,Our Priority</p>
              </div>
            </div>
            <form className="login-form">
             
              <input
                name="uniqid"
                type="text"
                placeholder="Unique ID"
                
              />
              <Button name="signin" size="small" variant="contained">
                Get Otp
              </Button>
              {/* <p className="message">
                Not registered?{" "}
                <NavLink to="/signup">Create an account.</NavLink>
              </p> */}
            </form>
          </div>
        </div>
      </div>
      <br/>
      <br/>
      <Slideshow tutorialSteps={tutorialSteps} />

      <Whyusnew />
    </>
  );
};

export default Login;
