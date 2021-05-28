import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Homepage from "./Screens/Homepage";
import Login from "./Screens/Login.js";
import Pastride from "./Screens/Pastride.js";
import Footer from "./Components/Footer";


const App = () => {
  return (
    <>
      
      <Switch>
        <Route exact path="/home">
          <Homepage/>
        </Route>
        <Route exact path="/pastride">
          <Pastride />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Redirect to="/login" />
      </Switch>
      <Footer />
    </>
  );
};

export default App;
