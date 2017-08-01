import React from "react";

const NavBar = props =>
  <nav className="nav-bar">
    <div className="nav-bar--logo">Page Age</div>
    {props.isLoading
      ? ""
      : props.isLoggedIn
        ? <span className="auth-button" onClick={props.handleLogout}>Logout</span>
        : <span className="auth-button" onClick={props.handleLogin}>Login</span>}
  </nav>;

export default NavBar;
