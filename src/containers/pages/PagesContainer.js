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
      pages: [],
      posts: {}
    };
  }

  componentDidMount() {
    window.FB.api(
      "/me/accounts",
      function(response) {
        this.setState({
          pages: response.data,
          isLoading: false
        });
      }.bind(this)
    );
  }

  loadPagePosts = pageId => {
    window.FB.api(
      `${pageId}/feed`,
      function(response) {
        console.log(response, pageId);
        let pages = this.state.pages.map(p => {
          if (p.id === pageId) {
            let newPage = Object.assign({}, p);
            newPage.posts = response.data;
            return newPage;
          }
          return p;
        });

        this.setState({
          pages: pages,
          isPostLoading: false
        });
      }.bind(this)
    );
    console.log(this.state);
  };

  render() {
    const isLoading = this.state.isLoading;
    return (
      <div>
        <h1>Your Pages</h1>
        {isLoading
          ? <div className="spinner" />
          : <div>
              <PageList
                pages={this.state.pages}
                loadPagePosts={this.loadPagePosts}
              />
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
