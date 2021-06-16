import React from 'react'
import Header from "../Components/Headers/Header"

import PastrideList from "../Components/Googlemaps/Pastrideslist"

const Pastride = () => {
    return (
      <>
        <Header location="track" />
        <PastrideList />
      </>
    );
}

export default Pastride
