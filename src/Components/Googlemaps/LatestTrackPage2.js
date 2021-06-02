import React from "react";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Polyline,
  Marker,
} from "react-google-maps";
import drivericon from "../../images/drivericon.png";
import finalpositionicon from "../../images/destinationicon.png";
import patienticon from "../../images/patient.png";
class Map extends React.Component {
  state = {
    progress: [],
  };

  path = [
    {
      lat: 25.26519,
      lng: 82.9837746,
    },
    {
      lat: 25.268996,
      lng: 82.9855383,
    },
    {
      lat: 25.27056,
      lng: 82.9895543,
    },
    {
      lat: 25.27056,
      lng: 82.9895543,
    },
    {
      lat: 25.27287,
      lng: 82.990993,
    },
    {
      lat: 25.27287,
      lng: 82.990993,
    },
    {
      lat: 25.2742864,
      lng: 82.9918521,
    },
    {
      lat: 25.2752409,
      lng: 82.9948656,
    },
    {
      lat: 25.2756506,
      lng: 82.9972258,
    },
    {
      lat: 25.2757064,
      lng: 82.9987807,
    },
    {
      lat: 25.2757896,
      lng: 82.9994722,
    },
    {
      lat: 25.276434,
      lng: 82.9974544,
    },
  ];

  velocity = 45;
  initialDate = new Date();

  getDistance = () => {
    // seconds between when the component loaded and now
    const differentInTime = (new Date() - this.initialDate) / 1000; // pass to seconds
    return differentInTime * this.velocity; // d = v*t -- thanks Newton!
  };

  componentDidMount = () => {
    this.interval = window.setInterval(this.moveObject, 1000);
  };

  componentWillUnmount = () => {
    window.clearInterval(this.interval);
  };

  moveObject = () => {
    const distance = this.getDistance();
    if (!distance) {
      return;
    }

    let progress = this.path.filter(
      (coordinates) => coordinates.distance < distance
    );

    const nextLine = this.path.find(
      (coordinates) => coordinates.distance > distance
    );
    if (!nextLine) {
      this.setState({ progress });
      return; // it's the end!
    }
    const lastLine = progress[progress.length - 1];

    const lastLineLatLng = new window.google.maps.LatLng(
      lastLine.lat,
      lastLine.lng
    );

    const nextLineLatLng = new window.google.maps.LatLng(
      nextLine.lat,
      nextLine.lng
    );

    // distance of this line
    const totalDistance = nextLine.distance - lastLine.distance;
    const percentage = (distance - lastLine.distance) / totalDistance;

    const position = window.google.maps.geometry.spherical.interpolate(
      lastLineLatLng,
      nextLineLatLng,
      percentage
    );

    progress = progress.concat(position);
    this.setState({ progress });
  };

  componentWillMount = () => {
    this.path = this.path.map((coordinates, i, array) => {
      if (i === 0) {
        return { ...coordinates, distance: 0 }; // it begins here!
      }
      const { lat: lat1, lng: lng1 } = coordinates;
      const latLong1 = new window.google.maps.LatLng(lat1, lng1);

      const { lat: lat2, lng: lng2 } = array[0];
      const latLong2 = new window.google.maps.LatLng(lat2, lng2);

      // in meters:
      const distance =
        window.google.maps.geometry.spherical.computeDistanceBetween(
          latLong1,
          latLong2
        );

      return { ...coordinates, distance };
    });

    console.log(this.path);
  };

  render = () => {
    let ambulanceicon = new window.google.maps.MarkerImage(
      drivericon,

      null,
      null,
      null,
      new window.google.maps.Size(30, 30)
    );
    let destinationicon = new window.google.maps.MarkerImage(
      finalpositionicon,

      null,
      null,
      null,
      new window.google.maps.Size(50, 50)
    );
    let patient_marker = new window.google.maps.MarkerImage(
      patienticon,

      null,
      null,
      null,
      new window.google.maps.Size(50, 50)
    );

    return (
      <GoogleMap
        defaultControl={false}
        streetviewControl={false}
        defaultZoom={14}
        defaultCenter={{
          lat: 25.2752409,
          lng: 82.9948656,
        }}
      >
       
      </GoogleMap>
    );
  };
}

const MapComponent = withScriptjs(withGoogleMap(Map));

export default () => (
  <MapComponent
    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyATwnp3e3ZL7__Oskpdo8Gutgls6ir4FeU&libraries=geometry,drawing,places"
    loadingElement={<div style={{ height: `69vh` }} />}
    containerElement={<div style={{ height: `75vh`, width: `100vw` }} />}
    mapElement={<div style={{ height: `69vh` }} />}
  />
);
