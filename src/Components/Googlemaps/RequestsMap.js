import React, { useState, useEffect } from "react";

import io from "socket.io-client";
import "../../Css/RequestsMap.css";
import hospitalicon from "../../images/hospitalicon.png";
import drivericon from "../../images/drivericon.png";
import usericon from "../../images/usericon.png";
const decodePolyline = require("decode-google-map-polyline");
var map,
  infoWindow,
  markers,
  usersocket,
  driversocket,
  driverWindow,
  drivermarker,
  poly,
  usermarker,
  hospitalmarker,
  driverPath;

const HomePageSideMap = (props) => {
  console.log(`Ispicked value is ${props.ispicked}`);
  console.log(
    `red color polyline is patient poline and value is ${props.polyline}`
  );
  console.log(
    `green color polyline is hospital poline and value is ${props.hospitalpolyline}`
  );
  useEffect(() => {
    if (map && props.pickupcoordinates.length > 0) {
      map.setCenter({
        lat: props.pickupcoordinates[0],
        lng: props.pickupcoordinates[1],
      });
      hospitalmarker.setPosition({
        lat: props.hospitalcoordinates[0],
        lng: props.hospitalcoordinates[1],
      });
      hospitalmarker.setMap(map);
    }

    if (
      (props.polyline !== undefined && map) ||
      (props.hospitalpolyline !== undefined && map)
    ) {
      const visibilepolyline = props.ispicked
        ? props.hospitalpolyline
        : props.polyline;
      poly = decodePolyline(visibilepolyline);
      let idx = poly.length - 1;
      console.log(poly, idx);
      if (idx !== -1) {
        let cen = {
          lat: (poly[0].lat + poly[idx].lat) / 2,
          lng: (poly[0].lng + poly[idx].lng) / 2,
        };
        map.setCenter(cen);
      } else {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((pos) => {
            let cen = {
              lat: pos.coords.latitude,
              lng: pos.coords.longitude,
            };
            map.setCenter(cen);
          });
        }
      }
      if (props.ispicked === true) {
        driverPath.setOptions({
          strokeColor: "green",
        });
      } else {
        driverPath.setOptions({
          strokeColor: "red",
        });
      }

      driverPath.setPath(poly);
      console.log(poly);
      driverPath.setMap(map);
    } else if (map) {
      driverPath.setMap(null);
    }
  }, [props.pickupcoordinates]);

  const driverendpoi = "https://server.prioritypulse.co.in/drivertrack";

  const [driverLocation, setDriverLocation] = useState([]);

  driversocket = io(driverendpoi);

  useEffect(() => {
    if (props._id !== "") {
      driversocket.emit("join", { roomid: props._id });
      driversocket.on("message", (res) => {
        console.log("driver", res);
      });
      driversocket.on("driverlocation", ({ coordinates }) => {
        console.log("driver", coordinates);
        setDriverLocation(coordinates);
      });
    }
  }, [props._id]);

  const myLocation = () => {
    const handleLocationError = (browserHasGeolocation, infoWindow, pos) => {
      infoWindow.setPosition(pos);
      infoWindow.setContent(
        browserHasGeolocation
          ? "Error: The Geolocation service failed."
          : "Error: Your browser doesn't support geolocation."
      );
      infoWindow.open(map);
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          map.setCenter(pos);
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter());
        }
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  };

  /*----------------------------current user location initially when page loads -------------------*/
  useEffect(() => {
    renderMap();
  }, []);

  const renderMap = () => {
    loadScript(
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyATwnp3e3ZL7__Oskpdo8Gutgls6ir4FeU&libraries=places&callback=initMap"
    );
    window.initMap = initMap;
  };

  useEffect(() => {
    if (map && driverLocation.length > 0) {
      // driverWindow=new window.google.maps.InfoWindow()
      // driverWindow.setPosition({lat:driverLocation[0],lng:driverLocation[1]})
      // driverWindow.setContent('Driver is here')
      // driverWindow.open(map)
      drivermarker.setPosition({
        lat: driverLocation[0],
        lng: driverLocation[1],
      });
      drivermarker.setMap(map);
    }
  }, [driverLocation]);
  var initMap = () => {
    map = new window.google.maps.Map(document.getElementById("map"), {
      // center: { lat: 26.2258858, lng: 78.2173995 },
      zoom: 17,
      streetViewControl: true,
      mapTypeControl: false,
      zoomControlOptions: true,
      zoomControl: true,

      zoomControlOptions: {
        position: window.google.maps.ControlPosition.RIGHT_BOTTOM,
      },
    });

    /*--------------user and driver icon -------------*/

    drivermarker = new window.google.maps.Marker({
      icon: {
        url: drivericon,
        scaledSize: new window.google.maps.Size(60, 60),
      },
      animation: window.google.maps.Animation.DROP,
    });

    driverPath = new window.google.maps.Polyline({
      path: poly,
      geodesic: true,

      strokeOpacity: 2.0,
      strokeWeight: 3,
    });

    hospitalmarker = new window.google.maps.Marker({
      icon: {
        url: hospitalicon,
        scaledSize: new window.google.maps.Size(60, 60),
      },
      animation: window.google.maps.Animation.DROP,
    });
    /*--------------user and driver icon -------------*/
    myLocation();

    // infoWindow = new window.google.maps.InfoWindow();
    // usermarker=new window.google.maps.Marker()
    // drivermarker=new window.google.maps.Marker()
    //  infoWindow = new window.google.maps.InfoWindow();
    //  driverWindow = new window.google.maps.InfoWindow();

    // markers = new window.google.maps.Marker({
    //   map,
    //   draggable: true,
    //   position: { lat: 25.27794, lng: 83.00244 },
    // });
    //search bar start
    const input = document.getElementById("mapsearch");
    const searchBox = new window.google.maps.places.SearchBox(input);
    // Bias the SearchBox results towards current map's viewport.
    map.addListener("bounds_changed", () => {
      searchBox.setBounds(map.getBounds());
    });
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener("places_changed", () => {
      const places = searchBox.getPlaces();

      if (places.length === 0) {
        return;
      }
      // For each place, get the icon, name and location.
      const bounds = new window.google.maps.LatLngBounds();
      places.forEach((place) => {
        if (!place.geometry) {
          console.log("Returned place contains no geometry");
          return;
        }
        if (place.geometry.viewport) {
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }

        // markers.setPosition(place.geometry.location);
        // map.panTo(place.geometry.location);
        // map.setZoom(15);
      });
      map.fitBounds(bounds);
    });
    //searchbox end

    const geocode = new window.google.maps.event.addListener(
      markers,
      "dragend",
      (event) => {
        console.log("iam dragged");
        var lat, lng;
        var npos = {
          lat: markers.getPosition().lat(),
          lng: markers.getPosition().lng(),
        };
      }
    );
  };

  return <div className="indexReqMaptrackpage" id="map"></div>;
};

function loadScript(url) {
  var index = window.document.getElementsByTagName("script")[0];
  var script = window.document.createElement("script");
  script.src = url;
  script.async = true;
  script.defer = true;
  index.parentNode.insertBefore(script, index);
}

export default HomePageSideMap;
