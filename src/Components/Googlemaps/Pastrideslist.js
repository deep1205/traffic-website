import React, { useState, useEffect } from "react";
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container,
  Row,
  Col,
} from "reactstrap";
import axios from "axios";
import PhoneIcon from "@material-ui/icons/Phone";
import decodePolyline from "decode-google-map-polyline";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Ridesdetail.css"
import LatestTrackPage1 from "./Mapforpastride";

const HospitalList = (props) => {
  const [dropdownOpen, setOpen] = useState(false);
  const [cardOpen, setCardOpen] = useState(false);
  const [rides, setdata] = useState([]);
  const toggle = () => setOpen(!dropdownOpen);
  useEffect(() => {
    axios
      .get("https://server.prioritypulse.co.in/police/pastRides", {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((res) => {
        const data = res.data;
        console.log(data);
        const arr = data.map((data) => {
          return {
            name: data.name,
            driverno: data.mobileNo,
            pcase: data.pcase,
            rideid: data.RideId,
            _id: data._id,
            polyline: data.patientPolyline,
          };
        });
        setdata(arr);
      });
  }, []);

  const [hospital, setHospital] = useState({
    name: "",
    pcase: "",
    rideid: "",
    driverno: "",
    _id: "",
    polyline: "",
  });

  return (
    <div>
      <ButtonDropdown
        direction="right"
        isOpen={dropdownOpen}
        toggle={toggle}
        style={{ zIndex: 10 }}
      >
        <DropdownToggle
          caret
          style={{
            backgroundColor: "orangered",
            color: "white",
            top: "30px",
            position: "absolute",
            zIndex: "34",
          }}
        >
          {hospital.name}
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu" positionFixed={true}>
          <div>
            <div style={{ textAlign: "center", color: "#FF024E" }}>
              <p>
                Active Rides List
                <span
                  className="dropdown-span"
                  style={{ marginLeft: "10px", color: "FF024E" }}
                  onClick={() => setOpen(!dropdownOpen)}
                >
                  X
                </span>
              </p>
              <hr />
            </div>
            {rides.map((val, id) => {
              return (
                <div>
                  <div key={id}>
                    <DropdownItem
                      onClick={() => {
                        setCardOpen(true);
                        setHospital({
                          name: val.name,
                          pcase: val.pcase,
                          rideid: val.rideid,
                          driverno: val.driverno,
                          _id: val._id,
                          polyline: val.polyline,
                        });
                      }}
                    >
                      <div style={{ diplay: "flex", flexDirection: "row" }}>
                        <h6>{val.name}</h6>
                        <h6>{val.pcase}</h6>
                        <h6>{val.driverno}</h6>
                      </div>
                    </DropdownItem>
                  </div>
                  <hr />
                </div>
              );
            })}
          </div>
        </DropdownMenu>
      </ButtonDropdown>
      <LatestTrackPage1 />
      {hospital.name !== "" && cardOpen ? (
        <div className="card">
          <div className="card-body">
            <Container>
              <Row>
                <Col sm={{ size: "auto", offset: "auto" }}>
                  <div className="hospital-details">
                    <h4 className="hospital-title">
                      Hospital Details:{" "}
                      <span
                        className="cardCross"
                        style={{ position: "absolute", right: "40px" }}
                        onClick={() => setCardOpen(false)}
                      >
                        X
                      </span>{" "}
                    </h4>
                  </div>
                </Col>
              </Row>
              <Row xs="2" className="row">
                <Col sm={{ size: "auto", offset: 2 }}>
                  <div className="shadow">
                    <h6 className="hospital-detail" style={{ padding: "10px" }}>
                      {" "}
                      {hospital.name}{" "}
                    </h6>
                  </div>
                </Col>
                <Col sm={{ size: "auto", offset: 2 }}>
                  <div className="shadow">
                    <h6 className="hospital-detail" style={{ padding: "10px" }}>
                      City : {hospital.driverno}{" "}
                    </h6>
                  </div>
                </Col>
              </Row>
              <Row xs="2" className="row">
                <Col sm={{ size: "auto", offset: 2 }}>
                  <div className="shadow">
                    <h6 className="hospital-detail" style={{ padding: "10px" }}>
                      District : {hospital.age}{" "}
                    </h6>
                  </div>
                </Col>
                <Col sm={{ size: "auto", offset: 2 }}>
                  <div className="shadow">
                    <h6 className="hospital-detail" style={{ padding: "10px" }}>
                      Phone: {hospital._id}
                    </h6>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default HospitalList;
