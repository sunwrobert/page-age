import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class Page extends Component {
  render() {
    return (
      <div className="page">
        <NavLink activeClassName='active' to={`/pages/${this.props.id}`}>
          <div className="page--title">
            {this.props.name}
          </div>
          <div className="page--category">
            {this.props.category}
          </div>
        </NavLink>
      </div>
    );
  }
}

export default Page;
