import React, { useState, useEffect } from "react";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import LastPageIcon from "@material-ui/icons/LastPage";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";
import PastRideMap from "./GoogleMap";
import axios from "axios";
import MaterialTable from "material-table";
import FilterListIcon from "@material-ui/icons/FilterList";
import useWindowDimensions from "./getWindowDimensions";
import styles from "../../Css/Request.module.css";
import CloseIcon from "@material-ui/icons/Close";
//import "bootstrap/dist/css/bootstrap.min.css";
import CustomDatePicker from "./CustomDatePicker";
import Fab from "@material-ui/core/Fab";
import ListIcon from "@material-ui/icons/List";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";

const Activerideslist = () => {
  const { height, width } = useWindowDimensions();
  const [cardOpen, setCardOpen] = useState(false);
  const [rides, setRides] = useState([]);
  const [rideDetail, setRideDetail] = useState({});
  const [button, setButton] = useState(false);
  const [tableOpen, setTableOpen] = useState(false);
  const [state, setState] = useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

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
            hospitalPhone: data["hospital"]
              ? data["hospital"].hospitalNumbers[0]
              : "Not Available",
            hospitalName: data["hospital"]
              ? data["hospital"].name
              : "Not Available",
            hospitalAddress: data["hospital"]
              ? data["hospital"].street +
                ", " +
                data["hospital"].city +
                ", " +
                data["hospital"].district +
                ", " +
                data["hospital"].state
              : "Not Available",
            ispicked: data ? data.isPicked : "Not Available",
            hospitalpolyline: data ? data["hospitalPolyline"] : "Not Available",
            rideobjectid: data ? data["_id"] : "Not Available",
            activestatus: data ? data["activeStatus"] : "Not Available",
            pickedBy: data
              ? data.pickedBy
              : {
                  hospital: "Not Available",
                  mobileNo: "Not Available",
                  name: "Not Available",
                },
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
      hospitalPhone: ride["hospitalPhone"],
      hospitalName: ride["hospitalName"],
      hospitalAddress: ride["hospitalAddress"],
      pickedBy: ride["pickedBy"],
    };
  });

  const showRideDetail = (event, rowData) => {
    setRideDetail(rowData);
    setButton(true);
    setState({ left: true });
    setCardOpen(true);
    setTableOpen(false);
  };
  const hideRideDetail = () => {
    setCardOpen(false);
  };

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
        onClick={() => {
          setTableOpen(!tableOpen);
          setButton(false);
        }}
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

        <CloseIcon
        
          style={{
            borderRadius: "0",
            position: "absolute",
            left: window.screen.width > 800 ? "430px" : "300px",
            color: "red",
            zIndex: "10",
            tableStyle,
          }}
          
          onClick={() => {
            setTableOpen(false);
            setButton(true);
          }}
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
      {button && !state.left ? (
        <Button
          variant="contained"
          color="primary"
          size="medium"
          onClick={toggleDrawer("left", true)}
          style={{
            position: "fixed",
            top: "50vh ",
            left: 0,
            zIndex: 2000,
          }}
        >
          <DoubleArrowIcon />
        </Button>
      ) : null}
      <React.Fragment key={"left"}>
        <Drawer
          anchor={"left"}
          open={state["left"]}
          onClose={toggleDrawer("left", false)}
        >
          <div className={styles.details}>
            <h2>Paitent Details</h2>
            <p className={styles.names}>{rideDetail.name}</p>
            <p className={styles.tags}>Age:{rideDetail.age}</p>
            <p className={styles.tags}>Contact:{rideDetail.patientNo}</p>
            <p className={styles.tags}>Case:{rideDetail.case}</p>
            <p className={styles.tags}>Priority:{rideDetail.casePrior}</p>
          </div>
          <div className={styles.details}>
            <h2>Hospital Details</h2>
            <p className={styles.names}>{rideDetail.hospitalName}</p>
            <p className={styles.address}>{rideDetail.hospitalAddress}</p>
            <p className={styles.tags}>Number:{rideDetail.hospitalPhone}</p>
            <p className={styles.tags}>
              Address:
              {rideDetail.hospitalAddress}
            </p>
          </div>
          <div className={styles.details}>
            <h2>Driver Details</h2>
            <p className={styles.names}>
              {rideDetail.pickedBy ? rideDetail.pickedBy.name : "Not Available"}
            </p>
            <p className={styles.tags}>
              Contact:
              {rideDetail.pickedBy
                ? rideDetail.pickedBy.mobileNo
                : "Not Available"}
            </p>
          </div>
        </Drawer>
      </React.Fragment>
    </main>
  );
};
export default Activerideslist;
