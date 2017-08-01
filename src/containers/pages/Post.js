import React, { Component } from "react";
import moment from 'moment-timezone';
class Post extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let formattedDate = moment.utc(this.props.date).fromNow();
    console.log(formattedDate);
    return (
      <div>
        <p>{this.props.message}</p> 
        <p>{this.props.views}</p>
        <p>{formattedDate}</p>
      </div>
    );
  }
}

export default Post;
