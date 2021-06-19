import {React,useEffect,useState,Fragment} from 'react'

import styles from "../Css/Request.module.css"

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import IconButton from '@material-ui/core/IconButton';

import axios from "axios";
import MaterialTable from 'material-table'

import Map from "../Components/Googlemaps/RequestsMap"
import Header from "../Components/Headers/Header"
 

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
          <div>{children}</div>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    width:(window.innerWidth>1080)?((window.innerWidth>=1800)?1000:750):"100%",
    maxWidth:'100vw',
    minHeight:500,

  },
}));

const Requests = () => {



  const classes = useStyles();
  const [value, setValue] = useState(0);

  const [req,setReq] = useState([]);
  const [acc,setAcc] = useState([]);
  const [rej,setRej] = useState([]);
  const [saved,setSaved] = useState([]);

  const [details,setDetails] = useState({
    name: "",
    age:"",
    date:"",
    caseprior:"",
    guardianNo:"",
    patientNo:"",
    pname:"",
    pcase: "",
    rideid: "",
    driverno: "",
    _id: "",
    polyline: "",
    pickupcoordinates:[],
    hospitalcoordinates:[],
  });

  useEffect(()=>{

    axios.get("https://server.prioritypulse.co.in/police/activeRidesByPermission",{headers:{
      Authorization: localStorage.getItem("token")
    }}).then(
      (res)=>{
        setReq(res.data.requested);
        setAcc(res.data.accepted);
        setRej(res.data.rejected);
        setSaved(res.data.saved);
        console.log(req,rej,acc);
      });

  },[])
  const fromSaved=(data)=>{
    let tmp1 = [...saved];
    let idx = tmp1.indexOf(data);
    if (idx!==-1) {
      var axData={rideid:tmp1[idx].RideId,saved:false};
        axios.put("https://server.prioritypulse.co.in/police/savedUpdate",axData,{headers:{
          Authorization: localStorage.getItem("token")
        }}).then((res)=>{
          if(res.data.RideId==axData.rideid){
            if (res.data.permission===0) {
              let tmp2 = [...req];
              let idx2 = tmp2.indexOf(data);
              tmp2[idx2].saved=false
              tmp1.splice(idx,1);
              setSaved(tmp1); 
              setReq(tmp2);
            }
            else if (res.data.permission===1) {
              let tmp2 = [...acc];
              tmp2.push(tmp1[idx]);
              tmp1.splice(idx,1);
              setSaved(tmp1); 
              setAcc(tmp2);
            }
            else if (res.data.permission===2) {
              let tmp2 = [...rej];
              tmp2.push(tmp1[idx]);
              tmp1.splice(idx,1);
              setSaved(tmp1); 
              setRej(tmp2);
            }
          }
        }).catch(
          (err)=>{
            console.log(err)
          });
    }

  }
  const toSaved=(data,from,fromSetter)=>{
    let tmp1 = [...from];
    let idx = tmp1.indexOf(data);
    if (idx!==-1) {
        let axData={rideid:tmp1[idx].RideId,saved:true};
        axios.put("https://server.prioritypulse.co.in/police/savedUpdate",axData,{headers:{
          Authorization: localStorage.getItem("token")
        }}).then((res)=>{
          if(res.data.RideId==axData.rideid){
            let tmp2 = [...saved];
            tmp2.push(tmp1[idx]);
            setSaved(tmp2);
            if (fromSetter!==setReq) {
              tmp1.splice(idx,1);
              fromSetter(tmp1);
            }
            else{
              tmp1[idx].saved=true;
              fromSetter(tmp1);
            }
          }
        }).catch(
          (err)=>{
            console.log(err)
          });
    }
  }
  const fromTo=(event,data,from,to,fromSetter,toSetter,status)=>{
    let tmp1 = [...from];
    let idx = tmp1.indexOf(data);
    if (idx!==-1) {
        let axData={rideid:tmp1[idx].RideId,permission:status};
        axios.put("https://server.prioritypulse.co.in/police/permissionUpdate",axData,{headers:{
          Authorization: localStorage.getItem("token")
        }}).then((res)=>{
          if(res.data.RideId==axData.rideid){
            let tmp2 = [...to];
            tmp2.push(tmp1[idx]);
            tmp1.splice(idx,1);
            fromSetter(tmp1);
            toSetter(tmp2);
          }
        }).catch(
          (err)=>{
            console.log(err)
          });
    }
  }

  const permissionSaved=(data,status)=>{
    let tmp=[...saved];
    let idx = tmp.indexOf(data);
    if (idx!==-1) {
      let axData={rideid:tmp[idx].RideId,permission:status};
      axios.put("https://server.prioritypulse.co.in/police/permissionUpdate",axData,{headers:{
        Authorization: localStorage.getItem("token")
      }}).then((res)=>{
        if(res.data.RideId==axData.rideid){
          tmp[idx].permission=status;
          setSaved(tmp);
        }
      }).catch(
        (err)=>{
          console.log(err)
        });
    }
  }
  const [state, setState] = useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

    return ( 
    <>
        <Header location="pastride" />
        <div className={styles.side}>
          <div className={styles.screen}>
            {details._id!==""?(
            <Map
            _id={details["pickedBy"]._id}
            rideobjectid={details.RideId}
            polyline={details.patientPolyline}
            pickupcoordinates={details["pickUplocation"].coordinates}
            hospitalcoordinates={details["hospital"]["hospitalLocation"].coordinates}
            hospitalpolyline={details.hospitalPolyline}
            ispicked={details.isPicked}
            />)
            :(
              <Map
            _id={''}
            rideobjectid={''}
            polyline={''}
            pickupcoordinates={[]}
            hospitalcoordinates={[]}
            hospitalpolyline={''}
            ispicked={false}
            />)}
            <div className={styles.root}>
                <div className={styles.tabsline}>
                  <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                      <Tab label="Requested" {...a11yProps(0)} />
                      <Tab label="Granted" {...a11yProps(1)} />
                      <Tab label="Rejected" {...a11yProps(2)} />
                      <Tab label="Saved" {...a11yProps(3)} />
                  </Tabs>
                </div>
                <TabPanel value={value} index={0}>
                <MaterialTable
                      onRowClick={(event, rowData) => {setDetails(rowData);}}
                      columns={[
                        { title: 'Name', field: 'name' },
                        { title: 'Age', field: 'age' },
                        {title: 'Patient Case', field: 'pcase' },
                        {title: 'Level', field: 'casePrior' },
                        { title: 'Driver', field: 'pickedBy.name' },
                        { title: 'Hospital', field: 'hospital.name' }
                      ]}
                      actions={[
                        {
                          icon: 'check',
                          tooltip: 'Grant Permisson',
                          onClick: (event, rowData) => {fromTo(event,rowData,req,acc,setReq,setAcc,1)}
                        },
                        {
                          icon: 'close',
                          tooltip: 'Reject Permisson',
                          onClick: (event, rowData) => {fromTo(event,rowData,req,rej,setReq,setRej,2)},
                        },
                        (row)=>(
                        {
                          icon: 'save',
                          tooltip: 'Save',
                          onClick: (event, rowData) => {toSaved(rowData,req,setReq)},
                          hidden:row.saved
                        }),
                        (row)=>({
                            icon:"bookmark",
                            tooltip:"unsave",
                            onClick: (event, rowData) => {fromSaved(rowData)},
                            hidden:!row.saved
                        })
                      ]}
                      options={{
                        filtering: true,
                        actionsColumnIndex: -1
                      }}
                      data={req}
                      title="Requests"
                />
                </TabPanel>
                <TabPanel value={value} index={1}>
                <MaterialTable
                      onRowClick={(event, rowData) => {setDetails(rowData);}}
                      columns={[
                        { title: 'Name', field: 'name' },
                        { title: 'Age', field: 'age' },
                        {title: 'Patient Case', field: 'pcase' },
                        { title: 'Driver', field: 'pickedBy.name' },
                        { title: 'Hospital', field: 'hospital.name' }
                      ]}
                      actions={[
                        {
                          icon: 'help',
                          tooltip: 'Reconsider Permisson',
                          onClick: (event, rowData) => {fromTo(event,rowData,acc,req,setAcc,setReq,0)}
                        },
                        {
                          icon: 'close',
                          tooltip: 'Reject Permisson',
                          onClick: (event, rowData) => {fromTo(event,rowData,acc,rej,setAcc,setRej,2)},
                        },
                        {
                          icon: 'save',
                          tooltip: 'Save',
                          onClick: (event, rowData) => {toSaved(rowData,acc,setAcc)},
                        }
                      ]}
                      options={{
                        filtering: true,
                        actionsColumnIndex: -1
                      }}
                      data={acc}
                      title="Accepted"
                />
                </TabPanel>
                <TabPanel value={value} index={2}>
                <MaterialTable
                      onRowClick={(event, rowData) => {setDetails(rowData);}}
                      columns={[
                        { title: 'Name', field: 'name' },
                        { title: 'Age', field: 'age' },
                        {title: 'Patient Case', field: 'pcase' },
                        { title: 'Driver', field: 'pickedBy.name' },
                        { title: 'Hospital', field: 'hospital.name' }
                      ]}
                      actions={[
                        {
                          icon: 'check',
                          tooltip: 'Grant Permisson',
                          onClick: (event, rowData) => {fromTo(event,rowData,rej,acc,setRej,setAcc,1)}
                        },
                        {
                          icon: 'help',
                          tooltip: 'Reconsider Permisson',
                          onClick: (event, rowData) => {fromTo(event,rowData,rej,req,setRej,setReq,0)},
                        },
                        {
                          icon: 'save',
                          tooltip: 'Save',
                          onClick: (event, rowData) => {toSaved(rowData,rej,setRej)},
                        }
                      ]}
                      options={{
                        filtering: true,
                        actionsColumnIndex: -1
                      }}
                      data={rej}
                      title="Rejected"
                />
                </TabPanel>
                <TabPanel value={value} index={3}>
                <MaterialTable
                      onRowClick={(event, rowData) => {setDetails(rowData);}}
                      columns={[
                        { title: 'Name', field: 'name' },
                        { title: 'Age', field: 'age' },
                        {title: 'Patient Case', field: 'pcase' },
                        { title: 'Driver', field: 'pickedBy.name' },
                        { title: 'Hospital', field: 'hospital.name' }
                      ]}
                      actions={[
                        (row)=>(
                        {
                          icon: 'check',
                          tooltip: 'Grant Permisson',
                          onClick: (event, rowData) => {permissionSaved(rowData,1)},
                          hidden:row.permission===1
                        }),
                        (row)=>(
                        {
                          icon: 'close',
                          tooltip: 'RejectPermisson',
                          onClick: (event, rowData) => {permissionSaved(rowData,2)},
                          hidden:row.permission===2
                        })
                        ,{
                          icon:"bookmark",
                          tooltip:"unsave",
                          onClick: (event, rowData) => {fromSaved(rowData)},
                        }
                      ]}
                      options={{
                        filtering: true,
                        actionsColumnIndex: -1
                      }}
                      data={saved}
                      title="Saved"
                />
                </TabPanel>
            </div>
          </div>
          {(details._id!=="")?(
                      <div className={styles.dis1}>
                      <div className={styles.details}>
                        <h2>Hospital Details</h2>
                        <p className={styles.names}>{details.hospital.name}</p>
                        <p className={styles.address}>{details.hospital.street+","+details.hospital.city+","+details.hospital.district+","+details.hospital.state}</p>
                        <p className={styles.tags}>Number:{details.hospital.hospitalNumbers[0]}</p>
                        <p className={styles.tags}>Address:{details.hospital.street+","+details.hospital.city+","+details.hospital.district+","+details.hospital.state+","+details.hospital.landmark}</p>
                      </div>
                      <div className={styles.details}>
                        <h2>Driver Details</h2>
                        <p className={styles.names}>{details.pickedBy.name}</p>
                        <p className={styles.tags}>Contact:{details.pickedBy.mobileNo}</p>
                      </div>
                      <div className={styles.details}>
                        <h2>Paitent Details</h2>
                        <p className={styles.names}>{details.name}</p>
                        <p className={styles.tags}>Age:{details.age}</p>
                        <p className={styles.tags}>Contact:{details.patientNo}</p>
                        <p className={styles.tags}>Case:{details.pcase}</p>
                      </div>
                    </div>
          ):null}
          {(details._id!=="")?(
            <div className={styles.dis2}>
            <Fragment key={'left'}>
              {(!state.left)?(
                <Button variant="contained" color="primary" size='medium'onClick={toggleDrawer('left', true)} style={{position:"fixed",top:"50vh ",left:0,zIndex:2000}}><DoubleArrowIcon/></Button>
              ):null}
                <SwipeableDrawer
                  anchor={'left'}
                  open={state['left']}
                  onClose={toggleDrawer('left', false)}
                  onOpen={toggleDrawer('left', true)}
                >
                      <div className={styles.details}>
                        <h2>Hospital Details</h2>
                        <p className={styles.names}>{details.hospital.name}</p>
                        <p className={styles.address}>{details.hospital.street+","+details.hospital.city+","+details.hospital.district+","+details.hospital.state}</p>
                        <p className={styles.tags}>Number:{details.hospital.hospitalNumbers[0]}</p>
                        <p className={styles.tags}>Address:{details.hospital.street+","+details.hospital.city+","+details.hospital.district+","+details.hospital.state+","+details.hospital.landmark}</p>
                      </div>
                      <div className={styles.details}>
                        <h2>Driver Details</h2>
                        <p className={styles.names}>{details.pickedBy.name}</p>
                        <p className={styles.tags}>Contact:{details.pickedBy.mobileNo}</p>
                      </div>
                      <div className={styles.details}>
                        <h2>Paitent Details</h2>
                        <p className={styles.names}>{details.name}</p>
                        <p className={styles.tags}>Age:{details.age}</p>
                        <p className={styles.tags}>Contact:{details.patientNo}</p>
                        <p className={styles.tags}>Case:{details.pcase}</p>
                      </div>
                </SwipeableDrawer>
            </Fragment>
            </div>
          ):null}

        </div>
    </> );
}
 
export default Requests