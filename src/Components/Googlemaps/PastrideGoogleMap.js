import React, { useEffect } from "react";
import "../../Css/Custom.css";
import styled from "styled-components";
import HospitalList from "../Rides/Hospitalllistpastrides"

var map, infoWindow, markers;
const HomePageSideMap = () => {
  useEffect(() => {
    renderMap();
  }, []);

  const renderMap = () => {
    loadScript(
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyATwnp3e3ZL7__Oskpdo8Gutgls6ir4FeU&libraries=places&callback=initMap"
    );
    window.initMap = initMap;
  };
  var initMap = () => {
    map = new window.google.maps.Map(document.getElementById("map"), {
      center: { lat: 25.27794, lng: 83.00244 },
      zoom: 15,

      zoomControlOptions: {
        position: window.google.maps.ControlPosition.LEFT_BOTTOM,
      },
    });

    infoWindow = new window.google.maps.InfoWindow();

    markers = new window.google.maps.Marker({
      map,
      draggable: true,
      position: { lat: 25.27794, lng: 83.00244 },
    });
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
      <div id="searchbar">
        <input
          placeholder="Search the Location              🍳"
          className="input"
          id="mapsearch"
        />
      </div>
      <HospitalList map={map} />

      <div
        style={{ marginTop: "20px" }}
        className="indexMaphomepage"
        id="map"
      ></div>
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
