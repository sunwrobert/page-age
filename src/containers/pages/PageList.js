import React, { Component } from "react";
import Page from "./Page";

class PageList extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let pages = this.props.pages.map(
      function(page) {
        return (
          <Page
            key={page.id}
            id={page.id}
            name={page.name}
            category={page.category}
          />
        );
      }.bind(this)
    );
    return (
      <div className="page-list">
        <div className="page-list--title">Your Pages</div>
        {pages}
      </div>
    );
  }
}

export default PageList;
