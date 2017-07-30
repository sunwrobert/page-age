import React from "react";

const NavBar = props =>
  <nav className="nav-bar">
    <span>Page Age</span>
    {props.isLoading
      ? ""
      : props.isLoggedIn
        ? <button onClick={props.handleLogout}>Logout</button>
        : <button onClick={props.handleLogin}>Login</button>}
  </nav>;

export default NavBar;
