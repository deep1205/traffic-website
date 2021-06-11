import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Homepage from "./Screens/Homepage";
import Login from "./Screens/Login.js";
import Pastride from "./Screens/Pastride.js";
import Footer from "./Components/Footer/Footer"

import { GuardProvider, GuardedRoute } from "react-router-guards";

const requireLogin = (to, from, next) => {
  if (to.meta.auth) {
    if (localStorage.getItem("token") != null) {
      next();
    }
    next.redirect("/login");
  } else {
    next();
  }
};
const App = () => {
  return (
    <>
      <GuardProvider guards={[requireLogin]}>
        <Switch>
          <GuardedRoute
            path="/home"
            exact
            component={Homepage}
            meta={{ auth: true }}
          />
          <GuardedRoute
            path="/pastride"
            exact
            component={Pastride}
            meta={{ auth: true }}
          />
          <Route exact path="/login">
            <Login />
          </Route>

          <Redirect to="/login" />
        </Switch>
      </GuardProvider>
      <Footer />
    </>
  );
};

export default App;
