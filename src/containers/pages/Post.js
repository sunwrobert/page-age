import React, { Component } from "react";
import moment from "moment-timezone";
class Post extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let formattedViews =
      this.props.views === undefined
        ? "Loading views..."
        : this.props.views + " views";
    let formattedDate = moment.utc(this.props.date).fromNow();
    console.log(formattedDate);
    return (
      <div className="post-list--post">
        <div className="post-list--post-message">
          {this.props.message}
        </div>
        <div className="post-list--post-metadata-container">
          <div className="post-list--post-metadata">
            Posted {formattedDate}
          </div>
          <div className="post-list--post-metadata">
            {formattedViews}
          </div>
        </div>
      </div>
    );
  }
}

export default Post;
