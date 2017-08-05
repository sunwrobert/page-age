import React, { Component } from "react";
import moment from "moment-timezone";
class Post extends Component {
  // Force time to update
  componentDidMount() {
    this.forceUpdateInterval = setInterval(() => this.forceUpdate(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.forceUpdateInterval);
  }

  render() {
    let formattedViews =
      this.props.views === undefined
        ? "Loading views..."
        : this.props.views + " views";

    let formattedDateText;
    // Subtract 30 seconds to account for differing time between client and server
    if (this.props.isPublished) {
      formattedDateText = `Posted ${moment
        .utc(this.props.createdDate)
        .subtract(30, "seconds")
        .fromNow()}`;
    } else if (this.props.scheduledDate) {
      formattedDateText = `Scheduled to post ${moment
        .unix(this.props.scheduledDate)
        .subtract(30, "seconds")
        .fromNow()}`;
    } else {
      formattedDateText = `Created ${moment
        .utc(this.props.createdDate)
        .subtract(30, "seconds")
        .fromNow()}`;
    }

    return (
      <div className="post-list--post">
        <div className="post-list--post-message">
          {this.props.message}
        </div>
        <div className="post-list--post-metadata-container">
          <div className="post-list--post-metadata">
            {formattedDateText}
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
