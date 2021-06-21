import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import Fab from "@material-ui/core/Fab";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import LastPageIcon from "@material-ui/icons/LastPage";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import MenuIcon from "@material-ui/icons/Menu";
import Modal from "@material-ui/core/Modal";
import PastRideMap from "./MyGooglemap";
import Drawer from "@material-ui/core/Drawer";
import axios from "axios";
import moment from "moment";
import MaterialTable from "material-table";
import FilterListIcon from "@material-ui/icons/FilterList";
import CloseIcon from "@material-ui/icons/Close";
import Icon from "supercons";
import "./Ridesdetail.css";
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container,
  Row,
  Col,
} from "reactstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import CustomDatePicker from "./CustomDatePicker";
import $ from "jquery";
import onClickOutside from "react-onclickoutside";
const PastRides = () => {
  const [cardOpen, setCardOpen] = useState(false);
  const [rides, setRides] = useState([]);
  const [rideDetail, setRideDetail] = useState({});
  const [tableOpen, setTableOpen] = useState(false);

  const handleDrawerToggle = () => {
    setTableOpen(true);
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
            name: data ? data["name"] : "Not Available",
            age: data ? data.age : "Not Available",
            caseprior: data ? data.casePrior : "Not Available",
            driverNo: data.pickedBy
              ? data["pickedBy"].mobileNo
              : "Not Available",
            driverName: data.pickedBy ? data["pickedBy"].name : "Not Available",
            pcase: data ? data.pcase : "Not Available",
            date: data
              ? moment(data["createdAt"]).format("D/MM/YYYY")
              : "Not Available",
            rideid: data ? data.RideId : "Not Available",
            driverid: data.pickedBy ? data["pickedBy"]._id : "Not Available",
            guardianNo: data ? data.guardianNo : "Not Available",
            patientNo: data ? data.patientNo : "Not Available",
            polyline: data ? data["patientPolyline"] : "NOt Available",
            pickupcoordinates: data
              ? data["pickUplocation"].coordinates
              : "Not Available",
            hospitalcoordinates: data["hospital"]
              ? data["hospital"]["hospitalLocation"].coordinates
              : "Not Available",
            ispicked: data ? data.isPicked : "Not Available",
            hospitalpolyline: data ? data["hospitalPolyline"] : "Not Available",
            rideobjectid: data ? data["_id"] : "Not Available",
            activestatus: data ? data["activeStatus"] : "Not Available",
          };
        });

        setRides(arr);
      });
  }, []);

  const columns = [
    { field: "id", title: "Id", hidden: true },
    { field: "name", title: "Name" },
    { field: "case", title: "Case" },
    {
      field: "date",
      title: "Date",
      type: "date",
      filterComponent: (props) => <CustomDatePicker {...props} />,
    },
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
      activestatus: ride["activestatus"],
    };
  });

  const showRideDetail = (event, rowData) => {
    setRideDetail(rowData);
    setCardOpen(true);
    setTableOpen(false);
  };
  console.log(rideDetail);

  const hideRideDetail = () => {
    setCardOpen(false);
  };
  const rideDetailBox = (
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
            {/* <HighlightOffSharpIcon fontSize="medium" /> */}
          </span>
        </h1>
      </div>
      <div className="card-body">
        <Container>
          <Row style={{ margin: "0 50px" }}>
            {/* </Row>
              <Row xs="2" className="row"> */}
            <Col md={{ size: "auto", offset: 0 }}>
              <div className="shadow" style={{ width: "280px" }}>
                <h6 className="hospital-detail" style={{ padding: "10px" }}>
                  Patient Name: {rideDetail.name}
                </h6>
              </div>
            </Col>{" "}
            <Col md={{ size: "auto", offset: 0 }}>
              <div className="shadow" style={{ width: "280px" }}>
                <h6 className="hospital-detail" style={{ padding: "10px" }}>
                  Age: {rideDetail.age}
                </h6>
              </div>
            </Col>{" "}
            <Col md={{ size: "auto", offset: 0 }}>
              <div className="shadow" style={{ width: "280px" }}>
                <h6 className="hospital-detail" style={{ padding: "10px" }}>
                  Case: {rideDetail.case}
                </h6>
              </div>
            </Col>
            <Col md={{ size: "auto", offset: 0 }}>
              <div className="shadow" style={{ width: "280px" }}>
                <h6 className="hospital-detail" style={{ padding: "10px" }}>
                  Case priority: {rideDetail.casePrior}
                </h6>
              </div>
            </Col>
            <Col md={{ size: "auto", offset: 0 }}>
              <div className="shadow" style={{ width: "280px" }}>
                <h6 className="hospital-detail" style={{ padding: "10px" }}>
                  Guardian No: {rideDetail.guardianNo}
                </h6>
              </div>
            </Col>
            <Col md={{ size: "auto", offset: 0 }}>
              <div className="shadow" style={{ width: "280px" }}>
                <h6 className="hospital-detail" style={{ padding: "10px" }}>
                  Patient No : {rideDetail.patientNo}
                </h6>
              </div>
            </Col>
            {/* </Row> */}
            {/* <Row xs="2" className="row"> */}
            {/* <Col md={{ size: "auto", offset: 0 }}>
              <div className="shadow" style={{ width: "280px" }}>
                <h6 className="hospital-detail" style={{ padding: "10px" }}>
                  <span style={{ fontSize: "15px" }}>
                    {" "}
                    Date:{rideDetail.date}
                  </span>
                </h6>
              </div>
            </Col> */}
            {/* <Col md={{ size: "auto", offset: 0 }}>
              <div className="shadow" style={{ width: "280px" }}>
                <h6
                  className="hospital-detail"
                  style={{ padding: "10px", fontSize: "15px" }}
                >
                  Driver No: {rideDetail.driverNo}
                </h6>
              </div>
            </Col> */}
          </Row>
        </Container>
      </div>
    </div>
  );


  const tablebandkro = () => {
    setTableOpen(false);
  };
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
        <DropdownMenu>
          <Icon
            glyph="view-close-small"
            size={28}
            style={{
              cursor: "pointer",
              color: "red",
              position: "absolute",
              top: "4px",
              right: "4px",
              zIndex: "1000000",
            }}
            onClick={tablebandkro}
          />
          <MaterialTable
            columns={columns}
            data={rows}
            icons={{
              SortArrow: ArrowDownward,
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
              pageSizeOptions: false,
              paginationType: "stepped",
              pageSize: 5,
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
