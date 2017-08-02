import React, { Component } from "react";
import autosize from 'autosize';
class WritePostForm extends Component {
  state = {
    message: ""
  };

  componentDidMount(){
    autosize(document.querySelector('textarea'));
  }
  writePost = () => {
    this.props.writePost(
      this.props.id,
      this.state.message,
      this.props.isPublished
    );
    this.setState({
      message: ""
    });
  };

  render() {
    return (
      <div className="write-post--container">
        <textarea 
          className="write-post--input"
          onChange={e => this.setState({ message: e.target.value })}
          placeholder="Write something..."
        />
        {this.props.isPublished
          ? <button className="write-post--submit" onClick={this.writePost}>Publish</button>
          : <button className="write-post--submit" onClick={this.writePost}>Schedule</button>}
      </div>
    );
  }
}

export default WritePostForm;
