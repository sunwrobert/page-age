import React, { Component } from "react";
import Pikaday from "pikaday-time";
import moment from "moment";
import autosize from "autosize";
class WritePostForm extends Component {
  state = {
    message: "",
    isScheduled: false,
    scheduledTime: 0
  };

  componentDidMount() {
    autosize(document.querySelector("textarea"));
  }

  componentDidUpdate() {
    if (this.state.isScheduled && !this.picker) {
      let that = this;
      let convertDateToUnixTime = this.convertDateToUnixTime;
      this.picker = new Pikaday({
        field: this.datePicker,
        format: "MMMM Do YYYY, h:mm",
        minDate: new Date(),
        onSelect(date) {
          console.log("test");
          that.updateScheduledTime(date);
        }
      });
    } else if (!this.state.isScheduled && this.picker) {
      this.picker.destroy();
      this.picker = null;
    }
  }

  updateScheduledTime(date) {
    this.setState({
      scheduledTime: this.convertDateToUnixTime(date)
    });
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      message: "",
      isScheduled: false,
      scheduledTime: 0
    });
  }

  writePost = () => {
    this.props.writePost(
      this.props.id,
      this.state.message,
      this.props.isPublished,
      this.state.scheduledTime
    );
    this.setState({
      message: ""
    });
  };

  convertDateToUnixTime(date) {
    return moment(date).unix();
  }
  render() {
    let scheduledInput;
    if (!this.props.isPublished) {
      scheduledInput = (
        <div className="schedule--container">
          <div className="schedule-checkbox--container">
            <input
              id="schedule"
              type="checkbox"
              onChange={e => {
                this.setState({ isScheduled: e.target.checked });
              }}
            />
            <label htmlFor="schedule">Schedule this post</label>
          </div>

          {this.state.isScheduled
            ? <input
                placeholder="Select a date"
                className="schedule-datepicker"
                type="text"
                id="datepicker"
                ref={input => (this.datePicker = input)}
                onKeyDown={e => e.preventDefault()}
              />
            : ""}
        </div>
      );
    }

    let buttonText = this.props.isPublished
      ? "Publish"
      : this.state.isScheduled ? "Schedule" : "Create Unpublished Post";
    return (
      <div className="write-post--container">
        <textarea
          className="write-post--input"
          onChange={e => this.setState({ message: e.target.value })}
          value={this.state.message}
          placeholder="Write something..."
        />
        {scheduledInput}

        <button className="write-post--submit" onClick={this.writePost}>
          {buttonText}
        </button>
      </div>
    );
  }
}

export default WritePostForm;
