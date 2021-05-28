import React, { useState } from "react";
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import "../Css/Hospitallist.css"

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
    },
    
    
]

  // const setHospitalCenter = (place) => {
  //   var content =
  //     '<div id="iw-container">' +
  //     '<div class="iw-title">' +
  //     place.name +
  //     "</div>" +
  //     '<div class="iw-content">' +
  //     '<div class="iw-subTitle">near</div>' +
  //     "<p >" +
  //     place.distance +
  //     " KM  away " +
  //     "</div>" +
  //     "</div>";
  //   var bounds = new window.google.maps.LatLngBounds();
  //   var pos = new window.google.maps.LatLng(
  //     place.coordinates[0],
  //     place.coordinates[1]
  //   );
  //   props.map.setZoom(14);
  //   props.map.panTo({ lat: place.coordinates[0], lng: place.coordinates[1] });
  //   props.infoWindow.setPosition({
  //     lat: place.coordinates[0],
  //     lng: place.coordinates[1],
  //   });
  //   props.infoWindow.setContent(content);
  //   props.infoWindow.open(props.map);
  //   bounds.extend(pos);
  //   // props.map.fitBounds(bounds)
  // };
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
            position:"absolute",
            top:"34px",
            background:'purple',
            marginLeft:'91vw',
            transform:"rotate(90deg)",
            
          }}
        >
          {hospital.ride}
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu" positionFixed={true}>
          <div>
            <div style={{ textAlign: "center", color: "blue"}}>
              <h5>
                Hospitals List
                <span
                  className="dropdown-span"
                  style={{ marginLeft: "10px", color: "FF024E" }}
                  onClick={() => setOpen(!dropdownOpen)}
                >
                  &times;
                </span>
              </h5>
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
        <h4 style={{textAlign:"center",margin:'3px 0'}}>Ride details</h4>
          <div className="card-body">
            <p>Name:{hospital.ride}</p>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default HospitalList;
