import React, { useState, useEffect } from "react";
import styled from "styled-components";
import io from "socket.io-client";
import "../../Css/Map.css";
import drivericon from "../../images/drivericon.png";

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
  // console.log(props.rideid);
  // console.log(props._id);
  const userendpoi = "https://server.prioritypulse.co.in/usertrack";
  const driverendpoi = "https://server.prioritypulse.co.in/drivertrack";

  const [userLocation, setUserLocation] = useState([]);
  const [driverLocation, setDriverLocation] = useState([]);
  usersocket = io(userendpoi);
  driversocket = io(driverendpoi);

  useEffect(() => {
    if (0) {
      usersocket.emit("join", { roomid: props.rideid });
      usersocket.on("message", (res) => {
        console.log("user", res);
      });
      usersocket.emit("sendUserLocation", { coordinates: userLocation });
      usersocket.on("userlocation", (coordinates) => {
        console.log("user", coordinates);
      });
    }
  }, [userLocation]);

  useEffect(() => {
    if (0) {
      driversocket.emit("join", { roomid: props._id });
      driversocket.on("message", (res) => {
        console.log("driver", res);
      });
      driversocket.on("driverlocation", (coordinates) => {
        console.log("driver", coordinates);
        setDriverLocation(coordinates);
      });
    }
  }, [props._id]);

  useEffect(() => {
    var options = {
      maximumAge: 3000,
      timeout: 50000,
      enableHighAccuracy: true,
    };
    var watchID = navigator.geolocation.watchPosition(
      onSuccess,
      onError,
      options
    );
  }, []);
  function onSuccess(pos) {
    setUserLocation([pos.coords.latitude, pos.coords.longitude]);
  }
  function onError(error) {
    alert("code: " + error.code + "\n" + "message" + error.message + "\n");
  }

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
      // map.setCenter({ lat: userLocation[0], lng: userLocation[1] });
      usermarker.setPosition({ lat: userLocation[0], lng: userLocation[1] });
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
      center: { lat: 22.9734229, lng: 78.6568942 },
      zoom: 14,
      mapTypeControl: false,

      zoomControl: true,

      zoomControlOptions: {
        position: window.google.maps.ControlPosition.LEFT_BOTTOM,
      },
    });

    // infoWindow = new window.google.maps.InfoWindow();
    // usermarker=new window.google.maps.Marker()
    // drivermarker=new window.google.maps.Marker()
    //  infoWindow = new window.google.maps.InfoWindow();
    //  driverWindow = new window.google.maps.InfoWindow();
    usermarker = new window.google.maps.Marker();
    drivermarker = new window.google.maps.Marker({
      icon: drivericon,
    });

    if (props.polyline !== undefined) {
      poly = decodePolyline(props.polyline)[1];

      console.log(poly);

      const driverPath = new window.google.maps.Polyline({
        path: poly,
        geodesic: true,
        strokeColor: "#FF0000",
        strokeOpacity: 1.0,
        strokeWeight: 2,
      });
      driverPath.setMap(map);
    }

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

        markers.setPosition(place.geometry.location);
        map.panTo(place.geometry.location);
        map.setZoom(15);
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

  //geolocation start
  const myLocation = (e) => {
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
          infoWindow.setPosition(pos);

          infoWindow.setContent("Location found.");
          infoWindow.open(map);
          markers.setPosition(pos);
          map.setCenter(pos);
          map.setZoom(16);
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
  //geolocation end

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
