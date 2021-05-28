import React from "react";
import "../Css/Whychooseus.css"
// import location from "../images/maplocation.png"
// import traffic from "../images/maplocation.png";
// import premed from "../images/maplocation.png";
// import call from "../images/maplocation.png";

function WhyUsnew() {
  return (
    <div style={{ backgroundColor: "#ebf5fc", paddingTop: "30px" }}>
      <div className="whyus_head">Why Choose Us</div>
      <div className="whyusnew">
        <div className="cardwhychooseus">
          <div className="box">
            <div className="content">
              <img src=" " alt="location" />
              <h3>Live Tracking</h3>
              <p>An individual can book an ambulance & Track it.</p>
            </div>
          </div>
        </div>
        <div className="cardwhychooseus">
          <div className="box">
            <div className="content">
              <img src="" alt="traffic" />
              <h3>Smart traffic signals</h3>
              <p>An individual can book an ambulance & Track it.</p>
            </div>
          </div>
        </div>
        <div className="cardwhychooseus">
          <div className="box">
            <div className="content">
              <img src=" " alt="pre-med" />
              <h3>Pre-Medication</h3>
              <p>An individual can book an ambulance & Track it.</p>
            </div>
          </div>
        </div>
        <div className="cardwhychooseus">
          <div className="box">
            <div className="content">
              <img src=" " alt="call" />
              <h3>On call communication</h3>
              <p>An individual can book an ambulance & Track it.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WhyUsnew;
