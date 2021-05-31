import React from 'react'
import Header from "../Components/Headers/Header"
import Map from "../Components/Googlemaps/MyGooglemap"
const Homepage = () => {
    return (
      <>
        <Header location="home" />
        
          <Map />
        
      </>
    );
}

export default Homepage
