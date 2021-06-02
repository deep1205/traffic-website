import React from 'react'
import Header from "../Components/Headers/Header"
import Map from "../Components/Googlemaps/MyGooglemap"
import PastrideList from "../Components/Rides/Hospitalllistpastrides"

const Pastride = () => {
    return (
      <>
        <Header location="pastride" />
        <PastrideList />
      </>
    );
}

export default Pastride
