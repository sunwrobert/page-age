import React, { Component } from "react";
import { Route } from "react-router-dom";

import PageList from "./PageList";
import PageDetail from "./PageDetail";

class PagesContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isPostLoading: false,
      pages: []
    };
  }

  componentDidMount() {
    this.loadPages();
  }

  loadPages = () => {
    window.FB.api(
      "/me/accounts",
      function(response) {
        this.setState({
          pages: response.data,
          isLoading: false
        });
        console.log(this.state.pages);
      }.bind(this)
    );
  };

  addPost = (pageId, post) => {
    let newPages = this.state.pages.map(page => {
      if (page.id === pageId) {
        let newPosts = [post].concat(page.posts);
        let newPage = Object.assign({}, page, {
          posts: newPosts
        });
        return newPage;
      }
      return page;
    });

    this.setState({
      pages: newPages
    });
  };

  loadPagePosts = pageId => {
    window.FB.api(
      `${pageId}/promotable_posts`,
      { fields: "created_time,message,is_published,scheduled_publish_time" },
      function(response) {
        console.log(response);
        let pages = this.state.pages.map(page => {
          if (page.id === pageId) {
            let newPage = Object.assign({}, page);
            newPage.posts = response.data;
            newPage.posts.forEach(
              function(post) {
                let [pageId, postId] = post.id.split("_");
                this.loadPostViews(pageId, postId);
              }.bind(this)
            );
            return newPage;
          }
          return page;
        });

        this.setState({
          pages: pages,
          isPostLoading: false
        });
      }.bind(this)
    );
  };

  loadPostViews = (pageId, postId) => {
    window.FB.api(
      `${pageId}_${postId}/insights/post_impressions_unique`,
      function(response) {
        let newPages = this.state.pages.map(page => {
          if (page.id === pageId) {
            let newPosts = page.posts.map(post => {
              if (post.id === pageId + "_" + postId) {
                console.log("adding views");
                let newPost = Object.assign({}, post, {
                  views:
                    response.data === null || response.data.length === 0
                      ? 0
                      : response.data
                });
                return newPost;
              }
              return post;
            });
            let newPage = Object.assign({}, page, {
              posts: newPosts
            });
            return newPage;
          }
          return page;
        });

        this.setState({
          pages: newPages
        });
      }.bind(this)
    );
  };

  writePost = (pageId, message, isPublished) => {
    let accessToken = this.state.pages.find(page => page.id === pageId)
      .access_token;
    window.FB.api(
      `/${pageId}/feed?fields=created_time,id,message,is_published`,
      "POST",
      {
        message: message,
        published: isPublished,
        access_token: accessToken
      },
      function(response) {
        console.log(response);
        if (response && !response.error) {
          let post = response;
          this.addPost(pageId, post);
        }
      }.bind(this)
    );
  };

  render() {
    const isLoading = this.state.isLoading;
    return (
      <div>
        {isLoading
          ? <div className="spinner" />
          : <div className="pages-container">
              <PageList pages={this.state.pages} />
              <Route
                path="/pages/:pageId"
                render={({ match }) => {
                  const page = this.state.pages.find(
                    p => p.id === match.params.pageId
                  );
                  return (
                    <PageDetail
                      id={page.id}
                      name={page.name}
                      category={page.category}
                      posts={page.posts}
                      loadPagePosts={this.loadPagePosts}
                      writePost={this.writePost}
                    />
                  );
                }}
              />
            </div>}
      </div>
    );
  }
}

export default PagesContainer;
