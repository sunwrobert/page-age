import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import LandingContainer from "./containers/LandingContainer";
import PagesContainer from "./containers/PagesContainer";
import NavBar from "./nav/NavBar";

import "./App.css";

class App extends Component {
  state = {
    isLoading: true,
    isLoggedIn: false
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
          this.statusChangeCallback(response);
        }.bind(this)
      );

      FB.Event.subscribe(
        "auth.statusChange",
        function(response) {
          this.statusChangeCallback(response);
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

  statusChangeCallback = response => {
    let isLoggedIn = false;
    console.log(response);
    if (response.status === "connected") {
      isLoggedIn = true;
    }
    this.setState({
      isLoggedIn,
      isLoading: false
    });
  };

  login = () => {
    window.FB.login(
      function(response) {
        this.statusChangeCallback(response);
      },
      {
        scope: "manage_pages,pages_show_list,publish_pages,public_profile",
        return_scopes: true
      }
    );
  };

  logout = () => {
    window.FB.logout(function(response) {
      this.statusChangeCallback(response);
    });
  };

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    const isLoading = this.state.isLoading;
    const Routes = (
      <div>
        <Switch>
          <Route
            exact
            path="/"
            render={() =>
              isLoggedIn ? <Redirect to="/pages" /> : <LandingContainer />}
          />
          <Route
            exact
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
