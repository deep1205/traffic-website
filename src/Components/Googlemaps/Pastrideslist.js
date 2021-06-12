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
import Icon from "supercons";
import ListIcon from "@material-ui/icons/List";
import axios from "axios";
import HighlightOffSharpIcon from "@material-ui/icons/HighlightOffSharp";
import decodePolyline from "decode-google-map-polyline";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Ridesdetail.css";
import Map from "./Mapforpastride";

const Pastrides = (props) => {
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
            age: data.age,
            pcase: data.pcase,
            casePrior: data.casePrior,
            guardianNo: data.guardianNo,
            patientNo: data.patientNo,
            rideid: data.RideId,
            _id: data._id,
            hospital: data.hospital,
            ispicked: data.isPicked,
            polyline: data.patientPolyline,
          };
        });
        setdata(arr);
      });
  }, []);

  const [hospital, setHospital] = useState({
    name: "",
    age: "",
    pcase: "",
    casePrior: "",
    rideid: "",
    guardianNo: "",
    patientNo: "",
    _id: "",
    polyline: "",
    ispicked: "",
    hospital: "",
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

            top: "57px",
            position: "absolute",
            zIndex: "34",
            left: "10px",
            padding: "4px",
            outline: "none",
          }}
        >
          <Icon glyph="list" size={38} />
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu" positionFixed={true}>
          <div>
            <div style={{ textAlign: "center", color: "blue" }}>
              <h4>
                Past Rides
                <span
                  className="dropdown-span"
                  style={{ marginLeft: "39px", color: "black" }}
                  onClick={() => setOpen(!dropdownOpen)}
                >
                  <Icon glyph="view-close-small" size={28} />
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
      <Map />
      {hospital.name !== "" && cardOpen ? (
        <div className="carddetails">
          <div className="hospital-details">
            <h1 className="hospital-title" style={{ fontSize: "2rem" }}>
              Ride details :
              <span
                className="cardCross"
                style={{ position: "absolute", right: "40px", color: "white" }}
                onClick={() => setCardOpen(false)}
              >
                <Icon glyph="view-close-small" size={38} />
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
                    <h6 className="hospital-detail" style={{ padding: "10px" }}>
                      Name: {hospital.name}
                    </h6>
                  </div>
                </Col>{" "}
                <Col md={{ size: "auto", offset: 0 }}>
                  <div className="shadow">
                    <h6 className="hospital-detail" style={{ padding: "10px" }}>
                      Age: {hospital.age}
                    </h6>
                  </div>
                </Col>{" "}
                <Col md={{ size: "auto", offset: 0 }}>
                  <div className="shadow">
                    <h6 className="hospital-detail" style={{ padding: "10px" }}>
                      Case: {hospital.pcase}
                    </h6>
                  </div>
                </Col>
                <Col md={{ size: "auto", offset: 0 }}>
                  <div className="shadow">
                    <h6 className="hospital-detail" style={{ padding: "10px" }}>
                      Case priority: {hospital.casePrior}
                    </h6>
                  </div>
                </Col>
                <Col md={{ size: "auto", offset: 0 }}>
                  <div className="shadow">
                    <h6 className="hospital-detail" style={{ padding: "10px" }}>
                      Guardian No: {hospital.guardianNo}
                    </h6>
                  </div>
                </Col>
                <Col md={{ size: "auto", offset: 0 }}>
                  <div className="shadow">
                    <h6 className="hospital-detail" style={{ padding: "10px" }}>
                      Patient No:{hospital.patientNo}
                    </h6>
                  </div>
                </Col>
                {/* </Row> */}
                {/* <Row xs="0" className="row"> */}
                <Col md={{ size: "auto", offset: 0 }}>
                  <div className="shadow">
                    <h6
                      className="hospital-detail"
                      style={{ padding: "10px", fontSize: "15px" }}
                    >
                      Id: {hospital.hospital}
                    </h6>
                  </div>
                </Col>
                <Col md={{ size: "auto", offset: 0 }}>
                  <div className="shadow">
                    <h6
                      className="hospital-detail"
                      style={{ padding: "10px", fontSize: "15px" }}
                    >
                      RideId: {hospital.rideid}
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

export default Pastrides;







