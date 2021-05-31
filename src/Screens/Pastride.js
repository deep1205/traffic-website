import React from 'react'
import Header from "../Components/Headers/Header"
import Map from "../Components/Googlemaps/PastrideGoogleMap"
const Pastride = () => {
    return (
      <>
        <Header location="pastride" />
        <Map/>
      </>
    );
}

export default Pastride
