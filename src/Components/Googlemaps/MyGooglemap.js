import React, { useState, useEffect } from "react";
import styled from "styled-components";
import io from "socket.io-client";
import "../../Css/Custom.css"
import "decode-google-map-polyline";
import drivericon from "../../images/drivericon.png";
import decodePolyline from "decode-google-map-polyline";
import usericon from "../../images/patient.png";
import hospitalicon from "../../images/destinationicon.png";
var map, infoWindow, markers;

const HomePageSideMap = () => {
  /*--------polyline ----------*/
  const polyline =
    "czeeB}erqNGGe@g@OMa@a@a@@y@o@IEg@]y@c@OEUGAAu@w@KDi@VGFGDY[d@e@r@ALU|AQv@M^CDEBC@E?C?C?CASGa@SeAe@SMUOc@Y[SKEo@[y@]iAm@o@a@i@W?DEPAJCHANEN?@OAi@Gi@G@KC?KCGCIAIGECOI_@OGCEAEAE?E?K@iBGg@Bs@?aA?c@A[Aa@Ci@IOA}@GSAoFIy@Ac@GuAe@uB|FKZoApDaBlEg@zAe@lAe@tA_BpEqAzDy@~Bi@zAi@zAiAfDUn@iAfDKVGPiAdDIRGRk@`Bk@fBENCNERERCREVCTCRAPAT?R?T?T@V@P?@@NBXBVBTBRDTFVFTHRFTHTTb@FNJPx@rAf@r@`ApAdAtAhChDLRNTLPFHDFv@rALRDJP^L^Rj@Lj@BPDNFh@D^BPBNDHj@NtALdANtA`@~CHj@Fb@NlAjAhIFd@F|@Br@?VAN?B?H?f@AXARCVCTV^X@";
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
      center: { lat: 22.9734229, lng: 78.6568942 },
      zoom: 15,
      zoomControlOptions: {
        position: window.google.maps.ControlPosition.LEFT_BOTTOM,
      },
    });
    const pcoords1 = decodePolyline(polyline);
    new window.google.maps.Polyline({
      map,
      path: pcoords1,
      geodesic: true,
      strokeColor: "red",
      strokeOpacity: 1.0,
      strokeWeight: 3,
    });

    new window.google.maps.Marker({
      position: pcoords1[pcoords1.length - 1],
      map,
      icon: {
        url: usericon,
        scaledSize: new window.google.maps.Size(50, 50),
      },
    });
    new window.google.maps.Marker({
      map,
      position: pcoords1[0],
      icon: {
        url: hospitalicon,
        scaledSize: new window.google.maps.Size(50, 50),
      },
    });

    let driverMarker = new window.google.maps.Marker({
      map,
      icon: {
        url: drivericon,
        scaledSize: new window.google.maps.Size(30, 30),
      },
    });

    var i = 0;
    var len = pcoords1.length;
    var interval = window.setInterval(function () {
      i += 1;
      if (i === len) {
        clearInterval(interval);
      }
      driverMarker.setPosition(pcoords1[i]);
      map.panTo(pcoords1[i]);
    }, 1000);

    //   const input = document.getElementById("mapsearch");
    //   const searchBox = new window.google.maps.places.SearchBox(input);
    //   // Bias the SearchBox results towards current map's viewport.
    //   map.addListener("bounds_changed", () => {
    //     searchBox.setBounds(map.getBounds());
    //   });
    //   // Listen for the event fired when the user selects a prediction and retrieve
    //   // more details for that place.
    //   searchBox.addListener("places_changed", () => {
    //     const places = searchBox.getPlaces();

    //     if (places.length === 0) {
    //       return;
    //     }
    //     // For each place, get the icon, name and location.
    //     const bounds = new window.google.maps.LatLngBounds();
    //     places.forEach((place) => {
    //       if (!place.geometry) {
    //         console.log("Returned place contains no geometry");
    //         return;
    //       }
    //       if (place.geometry.viewport) {
    //         bounds.union(place.geometry.viewport);
    //       } else {
    //         bounds.extend(place.geometry.location);
    //       }
    //       markers.setPosition(place.geometry.location);
    //       map.panTo(place.geometry.location);
    //       map.setZoom(15);
    //     });
    //     map.fitBounds(bounds);
    //   });
    //   //searchbox end

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
  // geolocation end

  return (
    <main>
      <div id="searchbartrackpage">
        <input
          placeholder="Search the Location              🍳"
          className="input"
          id="mapsearch"
        />
      </div>

      <div
        style={{ marginTop: "20px" }}
        className="indexMaptrackpage"
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
