import React, { useState } from "react";
import { useHistory, NavLink } from "react-router-dom";
import Whyusnew from "../Components/Whyusnew";
import Header from "../Components/Header.js";
import Button from "@material-ui/core/Button";
import { toast } from "react-toastify";
import axios from "axios";
import "../Css/Login.css";
import Slideshow from "../Components/Slideshow";
import i2 from "../images/i2.jpg";
import i3 from "../images/i3.jpg";
import i5 from "../images/i5.jpg";
import "react-toastify/dist/ReactToastify.css";
const delay = require("delay");
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
  const history = useHistory();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      email: user.hemail,
      password: user.hpassword,
    };
    axios
      .put("https://server.prioritypulse.co.in/auth/hospisignin", newUser)

      .then(async (res) => {
        localStorage.setItem("token", res["data"]["token"]);
        toast.success("Login Sucessfully");
        await delay(5000);
        console.log("Login SuccessFully");
        console.log(res);
        history.push("/home");
      })
      .catch((err) => {
        console.log(err.error);
        toast.error("Invalid Credentials");
        console.log(`Invalid Details`);
      });
  };

  return (
    <>
      <Header location="login" />
      <div id="loginkiposition">
        <div className="login-page">
          <div className="form">
            <div className="login">
              <div className="login-header">
                <h2 className="myformheadertext">Login</h2>
                <p className="myformheadertext">Welcome to Priority Pulse</p>
                <p>Your Pulse,Our Priority</p>
              </div>
            </div>
            <form className="login-form" method="PUT">
              <input
                name="hemail"
                type="text"
                placeholder="Email"
                autoComplete="on"
                onChange={handleInputs}
              />
              <input
                name="hpassword"
                type="password"
                placeholder="password"
                onChange={handleInputs}
              />
              <Button name="signin" variant="contained" onClick={handleSubmit}>
                Login
              </Button>
              <p className="message">
                Not registered?{" "}
                <NavLink to="/signup">Create an account.</NavLink>
              </p>
            </form>
          </div>
        </div>
      </div>
      <Slideshow tutorialSteps={tutorialSteps} />

      <Whyusnew />
    </>
  );
};

export default Login;
