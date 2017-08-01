import React, { Component } from "react";
import Post from './Post';

class PostList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const posts = this.props.posts.map(function(post) {
      return <Post key={post.id} message={post.message} views={post.views} date={post.created_time}/>;
    });

    return (
      <div>
        {posts.length === 0
          ? <h1>You have no posts</h1>
          : posts}
      </div>
    );
  }
}

export default PostList;
