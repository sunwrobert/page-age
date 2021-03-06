import React, { Component } from "react";
import PostList from './PostList';
import WritePostForm from './WritePostForm';

class PostsContainer extends Component {
  render() {
    return (
      <div className="posts-container">
        <WritePostForm id={this.props.id} isPublished={this.props.isPublished} writePost={this.props.writePost}/>
        <PostList posts={this.props.posts}/>
      </div>
    );
  }
}

export default PostsContainer;
