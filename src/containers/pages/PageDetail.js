import React, { Component } from "react";

class PageDetail extends Component {
  constructor(props) {
    super(props);
  }

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
      return <h1>Loading...</h1>;
    }
    let posts = this.props.posts.map(function(post) {
      return (
        <div key={post.id}>
          {post.message}
        </div>
      );
    });
    return (
      <div>
        <h1>
          {this.props.name}
        </h1>
        <p>
          category: {this.props.category}
        </p>
        {posts.length === 0 ? <h1>You have no posts</h1> : posts}
      </div>
    );
  }
}

export default PageDetail;
