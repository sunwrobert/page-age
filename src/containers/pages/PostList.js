import React, { Component } from "react";

class PostList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const posts = this.props.posts.map(function(post) {
      return <Post post={post} />;
    });

    return (
      <div>
        {posts}
      </div>
    );
  }
}

export default PostList;
