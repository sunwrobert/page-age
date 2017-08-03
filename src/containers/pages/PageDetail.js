import React, { Component } from "react";
import PostList from "./PostList";
import WritePostForm from "./WritePostForm";
import PostsContainer from "./PostsContainer";
import { Route, Redirect } from "react-router-dom";

class PageDetail extends Component {
  state = {
    isPublished: true
  };

  componentDidMount() {
    this.loadPagePostsIfNeeded(this.props.posts, this.props.id);
  }
  
  componentWillReceiveProps(nextProps) {
    this.loadPagePostsIfNeeded(nextProps.posts, nextProps.id);
  }

  loadPagePostsIfNeeded(posts, pageId) {
    if (posts === undefined) {
      this.props.loadPagePosts(pageId);
    }
  }

  render() {
    if (this.props.posts === undefined) {
      return (
      <div className="page-detail">
        <div className="page-detail--loading">Loading...</div>
      </div>
      )
    }
    let posts = this.props.posts.filter(
      post => post.is_published === this.state.isPublished
    );
    return (
      <div className="page-detail">
        <div className="page-detail--header">
          <div className="page-detail--title">
            {this.props.name}
          </div>
          <div className="page-detail--category">
            {this.props.category}
          </div>
        </div>
        
        <div className="page-detail--post-type-container">
          <div
            className={(this.state.isPublished ? 'active page-detail--post-type' : 'page-detail--post-type')} 
            onClick={() => this.setState({ isPublished: true })}>
            Published Posts
          </div>
          <div
            className={(!this.state.isPublished ? 'active page-detail--post-type' : ' page-detail--post-type')} 
            onClick={() => this.setState({ isPublished: false })}
          >
            Unpublished Posts
          </div>
        </div>
        <PostsContainer
          id={this.props.id}
          isPublished={this.state.isPublished}
          posts={posts}
          writePost={this.props.writePost}
        />
      </div>
    );
  }
}

export default PageDetail;
