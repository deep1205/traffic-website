import React from 'react'
import Header from "../Components/Headers/Header"
import ActiveridesList from "../Components/Rides/HospitalList"
import Map from "../Components/Googlemaps/MyGooglemap"
const Homepage = () => {
    return (
      <>
        <Header location="home" />
        <ActiveridesList/>
        
          <Map />
        
      </>
    );
}

export default Homepage
