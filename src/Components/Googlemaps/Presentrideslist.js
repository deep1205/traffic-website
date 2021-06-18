import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import Fab from "@material-ui/core/Fab";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import LastPageIcon from "@material-ui/icons/LastPage";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import MenuIcon from "@material-ui/icons/Menu";
import Modal from "@material-ui/core/Modal";
import PastRideMap from "./MyGooglemap";
import Drawer from "@material-ui/core/Drawer";
import axios from "axios";
import moment from "moment";
import MaterialTable from "material-table";
import FilterListIcon from "@material-ui/icons/FilterList";
import CloseIcon from "@material-ui/icons/Close";
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container,
  Row,
  Col,
} from "reactstrap";
import "./Ridesdetail.css"
import "bootstrap/dist/css/bootstrap.min.css";

const PastRides = () => {
  const [cardOpen, setCardOpen] = useState(false);
  const [rides, setRides] = useState([]);
  const [rideDetail, setRideDetail] = useState({});
  const [tableOpen, setTableOpen] = useState(false);

  const handleDrawerToggle = () => {
    setTableOpen(!tableOpen);
  };

  useEffect(() => {
    axios
      .get("https://server.prioritypulse.co.in/police/activeRides", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        const data = res.data;
        console.log(data);
        const arr = data.map((data) => {
          return {
            name: data["name"],
            age: data.age,
            caseprior: data.casePrior,
            driverNo: data["pickedBy"].mobileNo,
            driverName: data["pickedBy"].name,
            pcase: data.pcase,
            date: moment(data["createdAt"]).format("D/MM/YYYY"),
            rideid: data.RideId,
            driverid: data["pickedBy"]._id,
            guardianNo: data.guardianNo,
            patientNo: data.patientNo,
            polyline: data["patientPolyline"],
            pickupcoordinates: data["pickUplocation"].coordinates,
            hospitalcoordinates:
              data["hospital"]["hospitalLocation"].coordinates,
            ispicked: data.isPicked,
            hospitalpolyline: data["hospitalPolyline"],
            rideobjectid: data["_id"],
          };
        });
        setRides(arr);
      });
  }, []);

  const columns = [
    { field: "id", title: "Id", hidden: true },
    { field: "name", title: "Name" },
    { field: "case", title: "Case" },
    { field: "date", title: "Date" },
    { field: "age", title: "Age", hidden: true, type: "numeric" },
    { field: "casePrior", title: "Case Prior", hidden: true },
    { field: "isPicked", title: "is Picked", hidden: true },
    { field: "driverNo", title: "Driver Number", hidden: true },
    { field: "driverName", title: "Driver Name", hidden: true },
    { field: "guardianNo", title: "Guardian Number", hidden: true },
    { field: "patientNo", title: "Patient Number", hidden: true },
    { field: "patientPolyline", title: "Patient Polyline", hidden: true },
    { field: "hospitalPolyline", title: "Hospital Polyline", hidden: true },
    { field: "hospitalCoords", title: "Hospital Coordinates", hidden: true },
  ];
  const rows = rides.map((ride) => {
    return {
      name: ride["name"],
      case: ride["pcase"],
      date: ride["date"],
      age: ride["age"],
      rideid: ride["rideid"],
      casePrior: ride["caseprior"],
      driverNo: ride["driverNo"],
      driverName: ride["driverName"],
      guardianNo: ride["guardianNo"],
      patientNo: ride["patientNo"],
      ispicked: ride["ispicked"],
      pickupcoordinates: ride["pickupcoordinates"],
      hospitalcoordinates: ride["hospitalcoordinates"],
      polyline: ride["polyline"],
      hospitalpolyline: ride["hospitalpolyline"],
      rideobjectid: ride["rideobjectid"],
      driverid: ride["driverid"],
    };
  });

  const showRideDetail = (event, rowData) => {
    setRideDetail(rowData);
    setCardOpen(true);
  };
  console.log(rideDetail);

  const hideRideDetail = () => {
    setCardOpen(false);
  };
  const rideDetailBox = (
    <div className="carddetails">
      <div className="card-header">
        Ride details :
        <CloseIcon
          style={{ cursor: "pointer", fontSize: "2rem" }}
          onClick={hideRideDetail}
        />
      </div>
      <div className="card-body">
        <Container>
          <Row>
            <Col>
              <div className="card-box">Name:{rideDetail.name}</div>
            </Col>
            <Col>
              <div className="card-box">Case:{rideDetail.case}</div>
            </Col>
            <Col>
              <div className="card-box">Age:{rideDetail.age}</div>
            </Col>
            <Col>
              <div className="card-box">Guardian {rideDetail.guardianNo}</div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="card-box">
                Driver Name:{rideDetail.driverName}
              </div>
            </Col>
            <Col>
              <div className="card-box">
                Case Priority:{rideDetail.casePrior}
              </div>
            </Col>
            <Col>
              <div className="card-box">
                Driver Number:{rideDetail.driverNo}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );

  return (
    <main>
      <ButtonDropdown
        direction="right"
        isOpen={tableOpen}
        toggle={handleDrawerToggle}
        style={{ zIndex: "10", backgroundColor: "white" }}
      >
        <DropdownToggle style={{ border: "none", backgroundColor: "white" }}>
          <MenuIcon color="primary" size="large" />
        </DropdownToggle>
        <DropdownMenu style={{ maxWidth: "99vw", padding: "0" }}>
          <MaterialTable
            columns={columns}
            data={rows}
            icons={{
              Filter: FilterListIcon,
              FirstPage: FirstPageIcon,
              LastPage: LastPageIcon,
              PreviousPage: ArrowBackIcon,
              NextPage: ArrowForwardIcon,
            }}
            onRowClick={showRideDetail}
            options={{
              filtering: true,
              search: false,
              toolbar: false,
            }}
          />
        </DropdownMenu>
      </ButtonDropdown>

      <PastRideMap
        rideid={rideDetail.rideid}
        rideobjectid={rideDetail.rideobjectid}
        driverid={rideDetail.driverid}
        polyline={rideDetail.polyline} //patient polyline
        pickupcoordinates={rideDetail.pickupcoordinates}
        hospitalcoordinates={rideDetail.hospitalcoordinates}
        hospitalpolyline={rideDetail.hospitalpolyline}
        ispicked={rideDetail.ispicked}
      />
      {cardOpen && rideDetailBox}
    </main>
  );
};
export default PastRides;
