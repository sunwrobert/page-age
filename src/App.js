import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import LandingContainer from "./containers/LandingContainer";
import PagesContainer from "./containers/pages/PagesContainer";
import NavBar from "./nav/NavBar";
import Noty from "noty";

import "./App.css";
import "./lib/pikaday.css";
import "./lib/noty.css";

class App extends Component {
  state = {
    isLoading: true,
    isLoggedIn: false,
    pages: []
  };

  componentDidMount() {
    window.fbAsyncInit = function() {
      const FB = window.FB;
      FB.init({
        appId: "640162282995927",
        xfbml: true,
        version: "v2.10"
      });

      FB.getLoginStatus(
        function(response) {
          this.statusChangeCallback(response, false);
        }.bind(this)
      );

      FB.Event.subscribe(
        "auth.statusChange",
        function(response) {
          this.statusChangeCallback(response, false);
        }.bind(this)
      );
    }.bind(this);

    // Load the SDK asynchronously
    (function(d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }

  statusChangeCallback = (response, fromLoginOrLogout) => {
    let isLoggedIn = false;
    console.log(response);
    if (response.error) {
      new Noty({
        text: "There was an error logging in",
        type: "error",
        layout: "bottomCenter",
        theme: "metroui",
        timeout: 3000
      }).show();
    }
    if (response.status === "connected") {
      isLoggedIn = true;
      if (fromLoginOrLogout) {
        new Noty({
          text: "Logged in successfully!",
          type: "success",
          layout: "bottomCenter",
          theme: "metroui",
          timeout: 3000
        }).show();
      }
    } else {
      if (fromLoginOrLogout) {
        new Noty({
          text: "Logged out successfully!",
          type: "success",
          layout: "bottomCenter",
          theme: "metroui",
          timeout: 3000
        }).show();
      }
    }
    this.setState({
      isLoggedIn,
      isLoading: false
    });
  };

  login = () => {
    window.FB.login(
      function(response) {
        this.statusChangeCallback(response, true);
      }.bind(this),
      {
        scope: "manage_pages,pages_show_list,publish_pages,public_profile",
        return_scopes: true
      }
    );
  };

  logout = () => {
    window.FB.logout(
      function(response) {
        this.statusChangeCallback(response, true);
      }.bind(this)
    );
  };

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    const isLoading = this.state.isLoading;
    const Routes = (
      <div className="container">
        <Switch>
          <Route
            exact
            path="/"
            render={() =>
              isLoggedIn ? <Redirect to="/pages" /> : <LandingContainer />}
          />
          <Route
            path="/pages"
            render={() =>
              isLoggedIn ? <PagesContainer /> : <Redirect to="/" />}
          />
          <Route render={({ location }) => <Redirect to="/" />} />
        </Switch>
      </div>
    );

    return (
      <div>
        <NavBar
          isLoading={isLoading}
          isLoggedIn={isLoggedIn}
          handleLogin={this.login}
          handleLogout={this.logout}
        />
        {isLoading ? <div className="spinner" /> : Routes}
      </div>
    );
  }
}

export default App;
