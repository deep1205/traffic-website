import React from 'react'
import Header from "../Components/Header.js"
import Map from "../Components/Googlemaps/MyGooglemap"
const Homepage = () => {
    return (
      <>
        <Header location="home" />
        <div id="googlemaphomepagekiposition" className="main-wrapper">
          <Map />
        </div>
      </>
    );
}

export default Homepage
