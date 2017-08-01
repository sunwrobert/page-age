import React, { Component } from "react";

class WritePostForm extends Component {
  state = {
    message: ""
  };

  writePost = () => {
    console.log("writing post...");
    this.props.writePost(
      this.props.id,
      this.state.message,
      this.props.isPublished
    );
  };

  render() {
    return (
      <div>
        <input
          onChange={e => this.setState({ message: e.target.value })}
          type="text"
          placeholder="Write something..."
        />
        {this.props.isPublished
          ? <button onClick={this.writePost}>Publish</button>
          : <button onClick={this.writePost}>Schedule</button>}
      </div>
    );
  }
}

export default WritePostForm;
