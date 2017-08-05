import React, { Component } from "react";
import Post from "./Post";

class PostList extends Component {
  render() {
    const posts = this.props.posts.map(function(post) {
      return (
        <Post
          key={post.id}
          message={post.message}
          views={post.views}
          createdDate={post.created_time}
          isPublished={post.is_published}
          scheduledDate={post.scheduled_publish_time}
        />
      );
    });

    return (
      <div className="post-list--container">
        {posts.length === 0 ? <div className="post-list--no-posts">You have no posts</div> : posts}
      </div>
    );
  }
}

export default PostList;
