import React, { useState } from "react";
import "../../Css/Header.css";
import { NavLink } from "react-router-dom";
// import { useHistory } from 'react-router'
import logo from "../../images/PP_logo_yellow.png";
import MenuIcon from "@material-ui/icons/Menu";
import ClearIcon from "@material-ui/icons/Clear";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Headerlogin from"./Headerlogin"
function Navbar({ location }) {
  const [icons, seticons] = useState(false);
  const [classna, setclassna] = useState("slider");
    // if (localStorage.getItem("token") == null) {
    //   return (
    //     <>
    //       <Headerlogin location="login" />
    //     </>
    //   );
    // }
  return (
    <>
      <ToastContainer
        className="white text-center text-capitalize"
        hideProgressBar
        autoClose={1000}
        position="top-center"
        closeOnClick
        draggable
        margin-top="-50px"
        zIndex="9999999"
      />

      <div className="navbar">
        <img className="navbar_logo" src={logo} alt="logo" />
        <div
          className="menu-toggle"
          onClick={() => {
            var bola = !icons;
            seticons(!icons);
            if (bola === false) {
              setclassna("mid");
              setTimeout(() => {
                setclassna(bola ? "active" : "slider");
              }, 1000);
            } else {
              setclassna(bola ? "active" : "slider");
            }
          }}
        >
          {!icons ? (
            <div className="myiconposition">
              <MenuIcon style={{ fontSize: "30px", color: "white" }} />
            </div>
          ) : (
            <div className="mycloseiconposition">
              <ClearIcon style={{ fontSize: "30px", color: "white" }} />
            </div>
          )}
        </div>
        <nav className={classna}>
          <a style={{ visibility: "hidden" }} href="/home">
            Home
          </a>
          <a href="/home">Home</a>
          <a href="/pastride">PastRide</a>
          <a href="/request">Request</a>
          

          <a
            href="/login"
            onClick={() => {
              localStorage.removeItem("token");
              window.location.reload();
            }}
            style={{ cursor: "pointer", color: "white" }}
          >
            Logout
          </a>
          {location === "home" && <div className="animation start-user" />}
          {location === "track" && <div className="animation start-hospital" />}
          {location === "pastride" && (
            <div className="animation start-aboutus" />
          )}
          {location === "profile" && (
            <div className="animation start-collaborate" />
          )}
          {location === "login" && (
            <div className="animation start-collaborate" />
          )}
        </nav>
        <div className="clearfix"></div>
      </div>
    </>
  );
}

export default Navbar;

/* <div className={location==='home' ? 'odd' : 'even'} onClick={()=>history.push('/')}>Home</div>
<div className={location==='user' ? 'odd' : 'even'} onClick={()=>history.push('/user')}>User</div>
<div className={location==='hospital' ? 'odd' : 'even'} onClick={()=>history.push('/hospital')}>Hospital</div>
<div className={location==='aboutus' ? 'odd' : 'even'} onClick={()=>history.push('/aboutus')}>About Us</div>
<div className={location==='collab' ? 'odd' : 'even'} onClick={()=>history.push('/collaborate')}>Collaborate</div> */
