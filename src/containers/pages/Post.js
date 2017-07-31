import React, { Component } from "react";

class Post extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {this.props.post}
      </div>
    );
  }
}

export default Post;
