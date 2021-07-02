import React, { useState, useEffect } from "react";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import LastPageIcon from "@material-ui/icons/LastPage";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import PastRideMap from "./GoogleMap";
import axios from "axios";
import MaterialTable from "material-table";
import FilterListIcon from "@material-ui/icons/FilterList";
import { Container, Row, Col } from "reactstrap";
import useWindowDimensions from "./getWindowDimensions";
import "./Ridesdetail.css";
import "bootstrap/dist/css/bootstrap.min.css";
import CustomDatePicker from "./CustomDatePicker";
import Fab from "@material-ui/core/Fab";
import ListIcon from "@material-ui/icons/List";
import HighlightOffRoundedIcon from "@material-ui/icons/HighlightOffRounded";
const Activerideslist = () => {
  const { height, width } = useWindowDimensions();
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
            date: data ? new Date(data["createdAt"]) : "Not Available",
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
            isVerified: data.pickedBy
              ? data["pickedBy"].isVerified
              : "Not Available",
          };
        });

        setRides(arr);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const columns = [
    { field: "name", title: "Name" },
    { field: "case", title: "Case" },
    {
      field: "date",
      title: "Date",
      type: "date",
      filterComponent: (props) => <CustomDatePicker {...props} />,
    },
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
      isVerified: ride["isVerified"],
    };
  });

  const showRideDetail = (event, rowData) => {
    setRideDetail(rowData);
    setCardOpen(true);
    setTableOpen(false);
  };
  const hideRideDetail = () => {
    setCardOpen(false);
  };
  const rideDetailBox =
    width > 0 ? (
      <div className="carddetails">
        <div className="card-header">
          <h2> Ride details :</h2>
          <HighlightOffRoundedIcon  onClick={hideRideDetail} />
        </div>
        <div className="card-body">
          <Container>
            <Row>
              <Col xs="12" sm="6" lg="3">
                <div className="card-box">Name:{rideDetail.name}</div>
              </Col>
              <Col xs="12" sm="6" lg="3">
                <div className="card-box">Case:{rideDetail.case}</div>
              </Col>
              <Col xs="12" sm="6" lg="3">
                <div className="card-box">Age:{rideDetail.age}</div>
              </Col>
              <Col xs="12" sm="6" lg="3">
                <div className="card-box">Guardian {rideDetail.guardianNo}</div>
              </Col>
            </Row>
            <Row>
              <Col xs="12" sm="6" lg="3">
                <div className="card-box">
                  Driver Name:{rideDetail.driverName}
                </div>
              </Col>
              <Col xs="12" sm="6" lg="3">
                <div className="card-box">
                  Case Priority:{rideDetail.casePrior}
                </div>
              </Col>
              <Col xs="12" sm="6" lg="3">
                <div className="card-box">
                  Driver Number:{rideDetail.driverNo}
                </div>
              </Col>
              <Col xs="12" sm="6" lg="3">
                <div className="card-box">
                  {rideDetail.isVerified
                    ? "Verified Driver"
                    : "Not Verified Driver"}
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    ) : null;
  let tableStyle = {
    transform: "translateX(-444px)",
  };
  if (tableOpen) {
    tableStyle = {
      transition: "transform 0.2s cubic-bezier(0, 0, 0.8, 1) 0ms",
    };
  }
  return (
    <main>
      <Fab
        style={{
          zIndex: 10,
          position: "absolute",
          borderRadius: "0px 30px 30px 0px",
          color: "white",
          backgroundColor: "black",
        }}
        variant="extended"
        color="primary"
        aria-label="list"
        onClick={() => setTableOpen(!tableOpen)}
      >
        <ListIcon />
        Active Rides
      </Fab>

      <div style={tableStyle}>
        <MaterialTable
          className="ridedetailbox"
          columns={columns}
          data={rows}
          icons={{
            Filter: FilterListIcon,
            FirstPage: FirstPageIcon,
            LastPage: LastPageIcon,
            PreviousPage: ArrowBackIcon,
            NextPage: ArrowForwardIcon,
            SortArrow: ArrowUpwardIcon,
          }}
          style={{
            width: window.screen.width > 800 ? "460px" : "330px",
            position: "absolute",
            zIndex: 10,
            marginLeft: "7px",
            tableStyle,
          }}
          onRowClick={showRideDetail}
          options={{
            filtering: true,
            sorting: true,
            search: false,
            toolbar: false,
            pageSizeOptions: false,
            paginationType: "stepped",
            pageSize: 5,
          }}
        />

        <HighlightOffRoundedIcon
          style={{
            borderRadius: "0",
            position: "absolute",
            left: window.screen.width > 800 ? "430px" : "300px",
            color: "red",
            zIndex: "10",
            tableStyle,
          }}
         
          onClick={() => setTableOpen(false)}
        />
      </div>
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
export default Activerideslist;
