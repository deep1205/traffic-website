

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

import ListIcon from "@material-ui/icons/List";
import axios from "axios";
import HighlightOffSharpIcon from "@material-ui/icons/HighlightOffSharp";
import decodePolyline from "decode-google-map-polyline";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Ridesdetail.css"
import Map from "./MyGooglemap";

const HospitalList = (props) => {
 
  const [dropdownOpen, setOpen] = useState(false);
  const [cardOpen,setCardOpen]=useState(false);
  const [rides, setdata] = useState([]);
  const toggle = () => setOpen(!dropdownOpen);
  useEffect(() => {
    axios
      .get("https://server.prioritypulse.co.in/police/ActiveRides", {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((res) => {
        const data = res.data;
        console.log(data);
        const arr = data.map((data) => {
          return {
            name: data.name,
            age: data.age,
            pcase: data.pcase,
            casePrior: data.casePrior,
            guardianNo: data.guardianNo,
            patientNo:data.patientNo,
            rideid: data.RideId,
            _id: data._id,
            hospital:data.hospital,
            ispicked:data.isPicked,
            polyline: data.patientPolyline,
          };
        });
        setdata(arr);
      });
  }, []);

  
  const [hospital, setHospital] = useState({
    name: "",
    age:"",
    pcase: "",
    casePrior:"",
    rideid: "",
    guardianNo: "",
    patientNo:"",
    _id: "",
    polyline: "",
    ispicked:"",
    hospital:"",
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
          style={{
            backgroundColor: "black",
            color: "white",
            borderRadius: "10px",
            top: "49px",
            position: "absolute",
            zIndex: "34",
            left: "8px",
            padding: "4px",
            outline: "none",
          }}
        >
          <ListIcon fontSize="large" />
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu" positionFixed={true}>
          <div>
            <div style={{ textAlign: "center", color: "blue" }}>
              <h4>
                Active Rides
                <span
                  className="dropdown-span"
                  style={{ marginLeft: "39px", color: "black" }}
                  onClick={() => setOpen(!dropdownOpen)}
                >
                  <HighlightOffSharpIcon />
                </span>
              </h4>
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
                          age: val.age,
                          pcase: val.pcase,
                          rideid: val.rideid,
                          casePrior: val.casePrior,
                          guardianNo: val.guardianNo,
                          patientNo: val.patientNo,
                          _id: val._id,
                          polyline: val.polyline,
                          ispicked: val.ispicked,
                          hospital: val.hospital,
                        });
                      }}
                    >
                      <div
                        style={{
                          diplay: "flex",
                          color: "black",
                          flexDirection: "row",
                        }}
                      >
                        <h6>{val.name}</h6>
                        <h6>{val.pcase}</h6>
                        <h6>{val.guardianNo}</h6>
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
      <Map _id={hospital._id} rideid={hospital.rideid} polyline={hospital.polyline} />
      {hospital.name !== "" && cardOpen ? (
        <div className="card">
          <div className="hospital-details">
            <h1 className="hospital-title">
              Ride details :
              <span
                className="cardCross"
                style={{ position: "absolute", right: "40px", color: "white" }}
                onClick={() => setCardOpen(false)}
              >
                <HighlightOffSharpIcon fontSize="medium" />
              </span>
            </h1>
          </div>
          <div className="card-body">
            <Container>
              <Row style={{ margin: "0 50px" }}>
                {/* </Row>
              <Row xs="2" className="row"> */}
                <Col md={{ size: "auto", offset: 0 }}>
                  <div className="shadow">
                    <h6 className="hospital-detail" style={{ padding: "12px" }}>
                      Name: {hospital.name}
                    </h6>
                  </div>
                </Col>{" "}
                <Col md={{ size: "auto", offset: 0 }}>
                  <div className="shadow">
                    <h6 className="hospital-detail" style={{ padding: "12px" }}>
                      Age: {hospital.age}
                    </h6>
                  </div>
                </Col>{" "}
                <Col md={{ size: "auto", offset: 0 }}>
                  <div className="shadow">
                    <h6 className="hospital-detail" style={{ padding: "12px" }}>
                      Case: {hospital.pcase}
                    </h6>
                  </div>
                </Col>
                <Col md={{ size: "auto", offset: 0 }}>
                  <div className="shadow">
                    <h6 className="hospital-detail" style={{ padding: "12px" }}>
                      Case priority: {hospital.casePrior}
                    </h6>
                  </div>
                </Col>
                <Col md={{ size: "auto", offset: 0 }}>
                  <div className="shadow">
                    <h6 className="hospital-detail" style={{ padding: "12px" }}>
                      Guardian No: {hospital.guardianNo}
                    </h6>
                  </div>
                </Col>
                <Col md={{ size: "auto", offset: 0 }}>
                  <div className="shadow">
                    <h6 className="hospital-detail" style={{ padding: "12px" }}>
                      Patient No : {hospital.patientNo}
                    </h6>
                  </div>
                </Col>
                {/* </Row> */}
                {/* <Row xs="2" className="row"> */}
                <Col md={{ size: "auto", offset: 0 }}>
                  <div className="shadow">
                    <h6 className="hospital-detail" style={{ padding: "12px" }}>
                      Hospital: {hospital.hospital}
                    </h6>
                  </div>
                </Col>
                <Col md={{ size: "auto", offset: 0 }}>
                  <div className="shadow">
                    <h6 className="hospital-detail" style={{ padding: "12px" }}>
                      Ride id: {hospital.rideid}
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







