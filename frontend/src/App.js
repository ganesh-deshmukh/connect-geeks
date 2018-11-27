import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";
import store from "./store";

import { setCurrentUser, logoutUser } from "./actions/authActions";
import setAuthToken from "./utils/setAuthToken";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from "./components/create-profile/CreateProfile";
import EditProfile from "./components/edit-profile/EditProfile";
import AddExperience from "./components/add-credentials/AddExperience";
import AddEducation from "./components/add-credentials/AddEducation";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";

import PrivateRoute from "./components/common/PrivateRoute";
import NotFound from "./components/not-found/NotFound";

import "./App.css";
import { clearCurrentProfile } from "./actions/profileActions";

// check if token is stored in localstorage, if user has logged in.

if (localStorage.jwtToken) {
  // if token exitst, then set auth token header auth
  setAuthToken(localStorage.jwtToken);

  // now decode token and get user-info, expiry-date of token
  const decoded = jwt_decode(localStorage.jwtToken);

  // set user and user is now authenticated
  store.dispatch(setCurrentUser(decoded));

  // check for expired date of token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // exp should be greater to keep alive login
    store.dispatch(logoutUser());

    // Logout user and clear it's profile
    store.dispatch(clearCurrentProfile());
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/profiles" component={Profiles} />
              <Route exact path="/profile/:handle" component={Profile} />
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/create-profile"
                  component={CreateProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/edit-profile"
                  component={EditProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/add-experience"
                  component={AddExperience}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/add-education"
                  component={AddEducation}
                />
              </Switch>
              <Switch>
                <Route exact path="/not-found" component={NotFound} />
                <Route component={NotFound} />
              </Switch>
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
