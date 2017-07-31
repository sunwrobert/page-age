import React, { Component } from "react";
import { Link } from "react-router-dom";

class Page extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Link to={`/pages/${this.props.id}`}>
          <h2>
            {this.props.name}
          </h2>
          <p>
            category: {this.props.category}
          </p>
        </Link>
      </div>
    );
  }
}

export default Page;
