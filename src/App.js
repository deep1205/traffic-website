import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Homepage from "./Screens/Homepage";
import Login from "./Screens/Login.js";
import Pastride from "./Screens/Pastride.js";
import Footer from "./Components/Footer/Footer"
import Profilepage from "./Screens/Profilepage";
import Requestpage  from "./Screens/Requestpage";
import { GuardProvider, GuardedRoute } from "react-router-guards";
import "./App.css"

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
          <GuardedRoute
            path="/request"
            exact
            component={Requestpage}
            meta={{ auth: true }}
          />
          { localStorage.getItem("token")==null ? (
            <Route exact path="/login">
              <Login />
            </Route>
          ) : (
            <Route exact path="/#">
              <Login />
            </Route>
          )}

          <Redirect to="/home" />
        </Switch>
      </GuardProvider>
      <Footer />
    </>
  );
};

export default App;
