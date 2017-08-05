import React, { Component } from "react";
import { Route } from "react-router-dom";
import Noty from "noty";
import PageList from "./PageList";
import PageDetail from "./PageDetail";
import DataProvider from "../../api/DataProvider";

class PagesContainer extends Component {
  state = {
    isLoading: true,
    isPostLoading: false,
    pages: []
  };

  componentDidMount() {
    this.loadPages();
  }

  loadPages = () => {
    DataProvider.loadPages()
      .then(pages => {
        console.log("calling from data provider", pages);
        this.setState({
          pages: pages,
          isLoading: false
        });
      })
      .catch(error => {
        this.showUnexpectedError(error);
      });
  };

  addPost = (pageId, post) => {
    let newPages = this.state.pages.map(page => {
      if (page.id === pageId) {
        post.views = 0;
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
    DataProvider.loadPagePosts(pageId)
      .then(posts => {
        let pages = this.state.pages.map(page => {
          if (page.id === pageId) {
            let newPage = Object.assign({}, page);
            newPage.posts = posts;
            newPage.posts.forEach(post => {
              let [pageId, postId] = post.id.split("_");
              this.loadPostViews(pageId, postId);
            });
            return newPage;
          }
          return page;
        });

        this.setState({
          pages: pages,
          isPostLoading: false
        });
      })
      .catch(error => {
        this.showUnexpectedError(error);
      });
  };

  loadPostViews = (pageId, postId) => {
    DataProvider.loadPostViews(pageId, postId)
      .then(views => {
        let newPages = this.state.pages.map(page => {
          if (page.id === pageId) {
            let newPosts = page.posts.map(post => {
              if (post.id === pageId + "_" + postId) {
                let newPost = Object.assign({}, post, {
                  views: views === null || views.length === 0 ? 0 : views
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
      })
      .catch(error => {
        this.showUnexpectedError(error);
      });
  };

  writePost = (pageId, message, isPublished, scheduledTime) => {
    let accessToken = this.state.pages.find(page => page.id === pageId)
      .access_token;

    let data = {
      message: message,
      published: isPublished,
      access_token: accessToken
    };

    // Not 0 or undefined
    if (scheduledTime) {
      data.scheduled_publish_time = scheduledTime;
    }

    DataProvider.writePost(pageId, data)
      .then(post => {
        this.showPostCreatedMessage();
        this.addPost(pageId, post);
      })
      .catch(error => {
        this.showUnexpectedError(error);
      });
  };

  showPostCreatedMessage() {
    new Noty({
      text: "Post created successfully!",
      type: "success",
      layout: "bottomCenter",
      theme: "metroui",
      timeout: 3000
    }).show();
  }

  showUnexpectedError(errorMessage) {
    new Noty({
      text: errorMessage,
      type: "error",
      layout: "bottomCenter",
      theme: "metroui",
      timeout: 3000
    }).show();
  }

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
