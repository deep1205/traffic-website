import React, { useState, useEffect } from "react";
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../Css/Hospitallist.css"
import Map from '../Googlemaps/MyGooglemap'

const HospitalList = (props) => {
  const [dropdownOpen, setOpen] = useState(false);
  const [rides, setdata] = useState([]);
  const toggle = () => setOpen(!dropdownOpen);
  useEffect(() => {
    axios
      .get("https://server.prioritypulse.co.in/police/activeRides", {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((res) => {
        const data = res.data;
        console.log(data);
        const arr = data.map((data) => {
          return {
            name: data.name,
            caseprior: data.casePrior,
            pcase: data.pcase,
            rideid: data.RideId,
            _id:data.pickedBy
          };
        });
        setdata(arr);
      });
  }, []);

  const [hospital, setHospital] = useState({
    name: "",
    pcase: "",
    rideid: "",
    caseprior: "",
    _id:""
  });

  return (
    <div>
      <ButtonDropdown
        direction="right"
        isOpen={dropdownOpen}
        toggle={toggle}
        style={{ zIndex: 10 }}
      >
        <DropdownToggle caret id="mytogglebutton">
          {hospital.name}
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu" positionFixed={true}>
          <div>
            <div style={{ textAlign: "center", color: "blue" }}>
              <h5>
                Present Rides
                <span
                  className="dropdown-span"
                  style={{ marginLeft: "70px", color: "red" }}
                  onClick={() => setOpen(!dropdownOpen)}
                >
                  &times;
                </span>
              </h5>
              <hr />
            </div>
            {rides.map((val, id) => {
              return (
                <div>
                  <div key={id}>
                    {/* <DropdownItem onClick={() => setHospital({ name: val.name,rating:val.rating, description: val.description})}><h5>{val.name}</h5></DropdownItem> */}
                    <DropdownItem
                      onClick={() => {
                        // setHospitalCenter(val);
                        setHospital({
                          name: val.name,
                          pcase: val.pcase,
                          rideid: val.rideid,
                          caseprior: val.caseprior,
                          _id: val._id,
                        });
                      }}
                    >
                      <div style={{ diplay: "flex", flexDirection: "row" }}>
                        <h6>{val.name}</h6>
                        <h6>{val.pcase}</h6>
                        <h6>{val.caseprior}</h6>
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
      <Map _id={hospital._id} />
      {hospital.name !== "" ? (
        <div className="card" style={{ margin: "-30px 0" }}>
          <h4 style={{ textAlign: "center", margin: "3px 0" }}>Ride details</h4>
          <div className="card-body">
            <p>
              Name:{hospital.name} <br />
              Case:{hospital.pcase}
              <br />
              RideId:{hospital.rideid}
              <br />
              Case Priority:{hospital.caseprior}
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default HospitalList;
