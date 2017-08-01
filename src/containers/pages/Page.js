import React, { Component } from "react";
import { Link } from "react-router-dom";

class Page extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="page">
        <Link to={`/pages/${this.props.id}`}>
          <div className="page--title">
            {this.props.name}
          </div>
          <div className="page--category">
            {this.props.category}
          </div>
        </Link>
      </div>
    );
  }
}

export default Page;
