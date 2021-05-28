import React, { useState } from "react";
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Css/Hospitallist.css"
import PhoneIcon from "@material-ui/icons/Phone";

const HospitalList = (props) => {
  const [dropdownOpen, setOpen] = useState(false);

  const toggle = () => setOpen(!dropdownOpen);

//   const hospitals = useSelector((state) => state.Hospital.hospitalDetails);
const hospitals=[
    {
        ride:'test ride 1',
    },
    {
        ride:'test ride 2'
    }
]

  const setHospitalCenter = (place) => {
    var content =
      '<div id="iw-container">' +
      '<div class="iw-title">' +
      place.name +
      "</div>" +
      '<div class="iw-content">' +
      '<div class="iw-subTitle">near</div>' +
      "<p >" +
      place.distance +
      " KM  away " +
      "</div>" +
      "</div>";
    var bounds = new window.google.maps.LatLngBounds();
    var pos = new window.google.maps.LatLng(
      place.coordinates[0],
      place.coordinates[1]
    );
    props.map.setZoom(14);
    props.map.panTo({ lat: place.coordinates[0], lng: place.coordinates[1] });
    props.infoWindow.setPosition({
      lat: place.coordinates[0],
      lng: place.coordinates[1],
    });
    props.infoWindow.setContent(content);
    props.infoWindow.open(props.map);
    bounds.extend(pos);
    // props.map.fitBounds(bounds)
  };
  const [hospital, setHospital] = useState({
    ride: ""
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
            backgroundColor: "white",
            color: "black",
            marginTop: "10px",
            marginBottom: "15px",
            marginLeft: "5px",
          }}
        >
          {hospital.ride}
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu" positionFixed={true}>
          <div>
            <div style={{ textAlign: "center", color: "#FF024E" }}>
              <p>
                Hospitals List
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
            {hospitals.map((val, id) => {
              return (
                <div>
                  <div key={id}>
                    {/* <DropdownItem onClick={() => setHospital({ name: val.name,rating:val.rating, description: val.description})}><h5>{val.name}</h5></DropdownItem> */}
                    <DropdownItem
                      onClick={() => {
                        // setHospitalCenter(val);
                        setHospital({
                          ride: val.ride,
                        });
                      }}
                    >
                      <div style={{ diplay: "flex", flexDirection: "row" }}>
                        <h6>{val.ride}</h6>
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
      {hospital.ride !== "" ? (
        <div className="card">
          <div className="card-body">
            <h5>Name:{hospital.ride}</h5>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default HospitalList;
