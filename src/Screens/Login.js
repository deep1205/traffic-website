import React, { useState } from "react";
import { useHistory, NavLink } from "react-router-dom";
import Whyusnew from "../Components/Whyusnew"
import Header from "../Components/Headers/Headerlogin"
import Button from "@material-ui/core/Button";
import { toast } from "react-toastify";
import axios from "axios";
import "../Css/Login.css";
import Slideshow from "../Components/Slideshow"
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
      .put("https://server.prioritypulse.co.in/auth/policesignin", newUser)

      .then(async (res) => {
        localStorage.setItem("token", res["data"]["token"]);
        toast.success("Login Sucessfully");
        await delay(1000);
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
      <div class=" fadeInDown">
        <div className="login-page" style={{ position: "relative" }}>
          <div className="form">
            <div className="login">
              <div className="login-header">
                <h1 style={{ margin: "-10px" }} id="myformheadertextl">
                  Sign in
                </h1>
                <div style={{ marginTop: "28px" }} id="myformheadertext1l">
                  <p>Welcome to Priority Pulse</p>
                  <p style={{ marginTop: "-14px" }}>Your Pulse,Our Priority</p>
                </div>
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
                Sign in
              </Button>
              {/* <p className="message" id="myformheadertext1l">
                Not registered?{" "}
                <NavLink to="/signup">Create an account.</NavLink>
              </p> */}
            </form>
          </div>
        </div>

        <Slideshow tutorialSteps={tutorialSteps} />
      </div>
      <div style={{ position: "relative", marginTop: "100px" }}>
        <Whyusnew />
      </div>
    </>
  );
};

export default Login;
