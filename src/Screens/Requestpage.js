import React from 'react'
import Header from  "../Components/Headers/Header"
import Newpastridelist from '../Components/Googlemaps/NewPastrideList'
const Requestpage = () => {
    return (
        <div>
        <Header location="pastride" />
           <Newpastridelist />
        </div>
    )
}

export default Requestpage
