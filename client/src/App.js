import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Dashboard from "./components/pages/Dashboard";
import AuthState from "./context/auth/AuthState";
import AlertState from "./context/alert/AlertState";
import EventState from "./context/events/eventState";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import setAuthToken from "./utils/setAuthToken";
import ProtectedRoute from "./utils/protectedRoute";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const LoginContainer = () => (
  <Fragment>
    <Route path="/login" component={Login} />
    <Route path="/register" component={Register} />
  </Fragment>
);

const DefaultContainer = () => (
  <Fragment>
    <Navbar />
    <Route exact path="/" component={Home} />
    <Route exact path="/dashboard" component={Dashboard} />
  </Fragment>
);

const ProtectedContainer = () => (
  <Fragment>
    <Navbar />
    <ProtectedRoute exact path="/dashboard" component={Dashboard} />
  </Fragment>
);

const App = () => {
  return (
    <AuthState>
      <EventState>
        <AlertState>
          <Router>
            <Fragment>
              <div className="container">
                <Switch>
                  <Route exact path="/login" component={LoginContainer} />
                  <Route exact path="/register" component={LoginContainer} />
                  <Route
                    exact
                    path="/dashboard"
                    component={ProtectedContainer}
                  />
                  >
                  <Route component={DefaultContainer} />
                </Switch>
              </div>
            </Fragment>
          </Router>
        </AlertState>
      </EventState>
    </AuthState>
  );
};

export default App;
