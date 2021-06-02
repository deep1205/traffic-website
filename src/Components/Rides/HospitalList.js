

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
import "bootstrap/dist/css/bootstrap.min.css";
import "../../Css/Hospitallist.css"
import LatestTrackPage1 from "../Googlemaps/LatestTrackPage1"

const HospitalList = (props) => {
  const [initpolystate, setpolystate] = useState(true);
  const [dropdownOpen, setOpen] = useState(false);
  // const [rides, setdata] = useState([]);
  const toggle = () => setOpen(!dropdownOpen);
  // useEffect(() => {
  //   axios
  //     .get("https://server.prioritypulse.co.in/hosp/hospitalActiveRides", {
  //       headers: { Authorization: localStorage.getItem("token") },
  //     })
  //     .then((res) => {
  //       const data = res.data;
  //       console.log(data);
  //       const arr = data.map((data) => {
  //         return {
  //           name: "Sudeep kumar",
  //           driverno: "9182687397",
  //           rideid: "yqygf7endsxrk6zbeh9q",
  //           pcase:"Heart Attack"
  //           // name: data["pickedBy"].name,
  //           // driverno: data["pickedBy"].mobileNo,
  //           // pcase: data.pcase,
  //           // rideid: data.RideId,
  //           // _id:data['pickedBy']._id,
  //           // polyline:data.patientPolyline,
  //         };
  //       });
  //       setdata(arr);
  //     });
  // }, []);

  const rides = [
    {
      name: "Sudeep kumar",
      driverno: "9182687397",
      rideid: "yqygf7endsxrk6zbeh9q",
      pcase: "Heart Attack",
    },
  ];
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
                      <div
                        style={{ diplay: "flex", flexDirection: "row" }}
                        onClick={() => {
                          setpolystate("false");
                        }}
                      >
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
      <LatestTrackPage1 polystate={setpolystate} />
      {hospital.name !== "" ? (
        <div className="card">
          <div className="card-body">
            <Container>
              <Row>
                <Col sm={{ size: "auto", offset: -10 }}>
                  <div
                    style={{
                      borderRadius: "20px",
                      color: "black",
                      marginBottom: "10px",
                      fontWeight: "bold",
                    }}
                  >
                    <h4>Hospital Details: </h4>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col sm={{ size: "auto", offset: -10 }}>
                  <div
                    style={{
                      borderRadius: "20px",
                      width: "250px",
                      background: "white",
                      color: "black",
                    }}
                    class="shadow"
                  >
                    <h6 style={{ padding: "10px" }}>Name : {hospital.name} </h6>
                  </div>
                </Col>
                <Col sm={{ size: "auto", offset: 5 }}>
                  <div
                    style={{
                      borderRadius: "20px",
                      width: "250px",
                      background: "white",
                      color: "black",
                    }}
                    class="shadow"
                  >
                    <h6 style={{ padding: "10px" }}>
                      Case : {hospital.pcase}{" "}
                    </h6>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col sm={{ size: "auto", offset: -10 }}>
                  <div
                    style={{
                      borderRadius: "20px",
                      width: "250px",
                      background: "white",
                      color: "black",
                    }}
                    class="shadow"
                  >
                    <h6 style={{ padding: "10px" }}>
                      Rideid : {hospital.rideid}{" "}
                    </h6>
                  </div>
                </Col>
                <Col sm={{ size: "auto", offset: 5 }}>
                  <div
                    style={{
                      borderRadius: "20px",
                      width: "250px",
                      background: "white",
                      color: "black",
                    }}
                    class="shadow"
                  >
                    <h6 style={{ padding: "10px" }}>
                      Driver No.: {hospital.driverno}
                    </h6>
                  </div>
                </Col>
              </Row>
            </Container>

            {/* <h5>Name:{hospital.name}</h5>
          <h5>City:{hospital.city}</h5>
          <h5>District:{hospital.district}</h5>
          <h5>Hospital Numbers:{hospital.mobile}
          </h5> */}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default HospitalList;















// import React, { useState, useEffect } from "react";
// import {
//   ButtonDropdown,
//   DropdownToggle,
//   DropdownMenu,
//   DropdownItem,
//   Container,
//   Row,
//   Col,
// } from "reactstrap";
// import axios from "axios";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "../../Css/Hospitallist.css"
// import Map from '../Googlemaps/MyGooglemap'
// import LatestTrackPage1 from "../../Components/Googlemaps/LatestTrackPage1"
// const HospitalList = (props) => {
//   const [dropdownOpen, setOpen] = useState(false);
//   const [rides, setdata] = useState([]);
//   const toggle = () => setOpen(!dropdownOpen);
//   useEffect(() => {
//     axios
//       .get("https://server.prioritypulse.co.in/police/activeRides", {
//         headers: { Authorization: localStorage.getItem("token") },
//       })
//       .then((res) => {
//         const data = res.data;
//         console.log(data);
//         const arr = data.map((data) => {
//           return {
//             name: data.name,
//             caseprior: data.casePrior,
//             pcase: data.pcase,
//             rideid: data.RideId,
//             _id:data.pickedBy
//           };
//         });
//         setdata(arr);
//       });
//   }, []);

//   const [hospital, setHospital] = useState({
//     name: "",
//     pcase: "",
//     rideid: "",
//     caseprior: "",
//     _id:""
//   });

//   return (
//     <div>
//       <ButtonDropdown
//         direction="right"
//         isOpen={dropdownOpen}
//         toggle={toggle}
//         style={{ zIndex: 10 }}
//       >
//         <DropdownToggle caret id="mytogglebutton">
//           {hospital.name}
//         </DropdownToggle>
//         <DropdownMenu className="dropdown-menu" positionFixed={true}>
//           <div>
//             <div style={{ textAlign: "center", color: "blue" }}>
//               <h5>
//                 Present Rides
//                 <span
//                   className="dropdown-span"
//                   style={{ marginLeft: "70px", color: "red" }}
//                   onClick={() => setOpen(!dropdownOpen)}
//                 >
//                   &times;
//                 </span>
//               </h5>
//               <hr />
//             </div>
//             {rides.map((val, id) => {
//               return (
//                 <div>
//                   <div key={id}>
//                     {/* <DropdownItem onClick={() => setHospital({ name: val.name,rating:val.rating, description: val.description})}><h5>{val.name}</h5></DropdownItem> */}
//                     <DropdownItem
//                       onClick={() => {
//                         // setHospitalCenter(val);
//                         setHospital({
//                           name: val.name,
//                           pcase: val.pcase,
//                           rideid: val.rideid,
//                           caseprior: val.caseprior,
//                           _id: val._id,
//                         });
//                       }}
//                     >
//                       <div style={{ diplay: "flex", flexDirection: "row" }}>
//                         <h6>{val.name}</h6>
//                         <h6>{val.pcase}</h6>
//                         <h6>{val.caseprior}</h6>
//                       </div>
//                     </DropdownItem>
//                   </div>
//                   <hr />
//                 </div>
//               );
//             })}
//           </div>
//         </DropdownMenu>
//       </ButtonDropdown>
//       <LatestTrackPage1 />
//       {hospital.name !== "" ? (
//         <div className="card">
//           <div className="card-body">
//             <Container>
//               <Row>
//                 <Col sm={{ size: "auto", offset: -10 }}>
//                   <div
//                     style={{
//                       borderRadius: "20px",
//                       color: "black",
//                       marginBottom: "10px",
//                       fontWeight: "bold",
//                     }}
//                   >
//                     <h4>Hospital Details: </h4>
//                   </div>
//                 </Col>
//               </Row>
//               <Row>
//                 <Col sm={{ size: "auto", offset: -10 }}>
//                   <div
//                     style={{
//                       borderRadius: "20px",
//                       width: "250px",
//                       background: "white",
//                       color: "black",
//                     }}
//                     class="shadow"
//                   >
//                     <h6 style={{ padding: "10px" }}>Name : {hospital.name} </h6>
//                   </div>
//                 </Col>
//                 <Col sm={{ size: "auto", offset: 5 }}>
//                   <div
//                     style={{
//                       borderRadius: "20px",
//                       width: "250px",
//                       background: "white",
//                       color: "black",
//                     }}
//                     class="shadow"
//                   >
//                     <h6 style={{ padding: "10px" }}>
//                       Case : {hospital.pcase}{" "}
//                     </h6>
//                   </div>
//                 </Col>
//               </Row>
//               <Row>
//                 <Col sm={{ size: "auto", offset: -10 }}>
//                   <div
//                     style={{
//                       borderRadius: "20px",
//                       width: "250px",
//                       background: "white",
//                       color: "black",
//                     }}
//                     class="shadow"
//                   >
//                     <h6 style={{ padding: "10px" }}>
//                       Rideid : {hospital.rideid}{" "}
//                     </h6>
//                   </div>
//                 </Col>
//                 <Col sm={{ size: "auto", offset: 5 }}>
//                   <div
//                     style={{
//                       borderRadius: "20px",
//                       width: "250px",
//                       background: "white",
//                       color: "black",
//                     }}
//                     class="shadow"
//                   >
//                     <h6 style={{ padding: "10px" }}>
//                       Case Priority.: {hospital.caseprior}
//                     </h6>
//                   </div>
//                 </Col>
//               </Row>
//             </Container>

//             {/* <h5>Name:{hospital.name}</h5>
//           <h5>City:{hospital.city}</h5>
//           <h5>District:{hospital.district}</h5>
//           <h5>Hospital Numbers:{hospital.mobile}
//           </h5> */}
//           </div>
//         </div>
//       ) : null}
//     </div>
//   );
// };

// export default HospitalList;
