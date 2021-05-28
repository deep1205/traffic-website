import React from 'react'
import Header from "../Components/Header.js";
import Map from "../Components/Googlemaps/MyGooglemap";
const Pastride = () => {
    return (
      <>
        <Header location="pastride" />
        <div id="googlemaphomepagekiposition" className="main-wrapper">
          <Map  />
        </div>
      </>
    );
}

export default Pastride
