import React, { useState, useEffect } from "react";

import io from "socket.io-client";
import "../../Css/Map.css";
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
  usermarker;

const HomePageSideMap = (props) => {
  useEffect(() => {
    if (map && props.pickupcoordinates.length > 0) {
      console.log(`PickupCoordinates:[${props.pickupcoordinates}]`);
      map.setCenter({
        lat: props.pickupcoordinates[0],
        lng: props.pickupcoordinates[1],
      });
    }

    if (props.polyline !== undefined && map) {
      poly = decodePolyline(props.polyline);
      console.log(poly);
      const hospitallocation = [poly[0].lat, poly[0].lng];
      const patientlocation = [
        poly[poly.length - 1].lat,
        poly[poly.length - 1].lng,
      ];
      console.log(
        `Hospital location getting from polyline: [${hospitallocation}]`
      );
      console.log(
        `Patient location getting from polyline : [${patientlocation}]`
      );

      const driverPath = new window.google.maps.Polyline({
        path: poly,
        geodesic: true,
        strokeColor: "#FF0000",
        strokeOpacity: 2.0,
        strokeWeight: 3,
      });
      driverPath.setMap(map);
        const patientmarker = new window.google.maps.Marker({
          position: { lat: patientlocation[0], lng: patientlocation[1] },
          icon: {
            url: usericon,
            scaledSize: new window.google.maps.Size(60, 60),
          },
        });
        patientmarker.setMap(map);
      const hospitalmarker = new window.google.maps.Marker({
        position: { lat: hospitallocation[0], lng: hospitallocation[1] },
        icon: {
          url: hospitalicon,
          scaledSize: new window.google.maps.Size(60, 60),
        },
      });
      hospitalmarker.setMap(map);
    }
  }, [props.pickupcoordinates && props.polyline]);

  const userendpoi = "https://server.prioritypulse.co.in/usertrack";
  const driverendpoi = "https://server.prioritypulse.co.in/drivertrack";

  const [userLocation, setUserLocation] = useState([]);
  const [driverLocation, setDriverLocation] = useState([]);

  usersocket = io(userendpoi);
  driversocket = io(driverendpoi);

  // useEffect(() => {
  //   if (props.rideid !== "") {
  //     usersocket.emit("join", { roomid: props.rideid });
  //     usersocket.on("message", (res) => {
  //       console.log("user", res);
  //     });
  //     // usersocket.emit("sendUserLocation", { coordinates: userLocation });
  //     usersocket.on("userlocation", (coordinates) => {
  //       console.log("user", coordinates);
  //       setUserLocation(coordinates);
  //     });
  //   }
  // }, [props.rideid]);

  // useEffect(() => {
  //   if (props._id !== "") {
  //     driversocket.emit("join", { roomid: props._id });
  //     driversocket.on("message", (res) => {
  //       console.log("driver", res);
  //     });
  //     driversocket.on("driverlocation", (coordinates) => {
  //       console.log("driver", coordinates);
  //       setDriverLocation(coordinates);
  //     });
  //   }
  // }, [props._id]);

  // useEffect(() => {
  //   var options = {
  //     maximumAge: 10000,
  //     timeout: 10000,
  //     enableHighAccuracy: true,
  //   };
  //   var watchID = navigator.geolocation.watchPosition(
  //     onSuccess,
  //     onError,
  //     options
  //   );
  // }, []);
  // function onSuccess(pos) {
  //   setUserLocation([pos.coords.latitude, pos.coords.longitude]);
  // }
  // function onError(error) {
  //   alert("code: " + error.code + "\n" + "message" + error.message + "\n");
  // }

  /*----------------------------current user location initially when page loads -------------------*/
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
    if (map && userLocation.length > 0) {
      // infoWindow = new window.google.maps.InfoWindow();
      // infoWindow.setPosition({ lat: userLocation[0], lng: userLocation[1] });
      // infoWindow.setContent("You are here");
      // infoWindow.open(map);
      usermarker.setPosition({
        lat: userLocation[0],
        lng: userLocation[1],
      });
      // usermarker.setPosition({ lat:props.pickupcoordinates[0], lng:props.pickupcoordinates[1] });
      usermarker.setMap(map);
    }
  }, [userLocation]);

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
      zoom: 14,
      streetViewControl: true,
      mapTypeControl: false,
      zoomControlOptions: true,
      zoomControl: true,

      zoomControlOptions: {
        position: window.google.maps.ControlPosition.RIGHT_BOTTOM,
      },
    });

    /*--------------user and driver icon -------------*/
    usermarker = new window.google.maps.Marker({
      icon: {
        url: usericon,
        scaledSize: new window.google.maps.Size(60, 60),
      },
    });
    drivermarker = new window.google.maps.Marker({
      icon: {
        url: drivericon,
        scaledSize: new window.google.maps.Size(60, 60),
      },
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

  return (
    <main>
      <div id="searchbartrackpage">
        <input
          placeholder="Search the Location              🍳"
          className="input"
          id="mapsearch"
        />
      </div>

      <div className="indexMaptrackpage" id="map"></div>
    </main>
  );
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
