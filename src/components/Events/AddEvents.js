import React, { Component } from "react";
import FormError from "../Firebase/FormError";
import firebase from "../Firebase/Firebase";
import withAuth from "../HOC/withAuth";
import { DateTime } from "luxon";

var dateFormat = dateData => DateTime.fromISO(dateData).toFormat("DD");

class AddEvents extends Component {
  constructor(props) {
    super(props);

    this.state = {
      eventID: "",
      name: "",
      date: "",
      time: "",
      location: "",
      meetup_rsvp: "",
      address: "",
      message: "",
      errorMessage: null,
      redirect_addevents_success: false,
      activeIndex: null,
      edit: false
    };
  }

  datestring = datedata => DateTime.fromISO(datedata);

  handleChange = e => {
    const itemName = e.target.name;
    const itemValue = e.target.value;

    this.setState({ [itemName]: itemValue });
  };

  addEvent = () => {
    const ref = firebase.database().ref(`events/`);
    ref.push({
      name: this.state.name,
      date: this.state.date,
      time: this.state.time,
      location: this.state.location,
      meetup_rsvp: this.state.meetup_rsvp,
      address: this.state.address,
      message: this.state.message
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.addEvent();

    this.setState({
      eventID: "",
      name: "",
      date: "",
      time: "",
      location: "",
      meetup_rsvp: "",
      address: "",
      message: ""
    });
  };

  handelEdit = e => {
    e.preventDefault();
    this.saveEdit();

    this.setState({
      eventID: "",
      name: "",
      date: "",
      time: "",
      location: "",
      meetup_rsvp: "",
      address: "",
      message: "",
      edit: false
    });
  };

  saveEdit = () => {
    const ref = firebase.database().ref(`events/${this.state.eventID}`);
    ref.update({
      name: this.state.name,
      date: this.state.date,
      time: this.state.time,
      location: this.state.location,
      meetup_rsvp: this.state.meetup_rsvp,
      address: this.state.address,
      message: this.state.message
    });
  };
  cancelEdit = e => {
    this.setState({
      name: "",
      date: "",
      time: "",
      location: "",
      meetup_rsvp: "",
      address: "",
      message: "",
      edit: false
    });
  };

  scrollToEditTop = () => {
    this.refs.TopAddEvent.scrollIntoView();
  };

  handleClick = (e, index) => {
    e.preventDefault();
    this.setState({ activeIndex: index });
  };

  hideDelete = e => {
    e.preventDefault();
    this.setState({ activeIndex: null });
  };

  deleteEvent = (e, whatEvent) => {
    e.preventDefault();
    const ref = firebase.database().ref(`events/${whatEvent}`);
    ref.remove();
  };

  editEvent = (
    e,
    eventID,
    eventName,
    eventDate,
    eventTime,
    eventLocation,
    eventMeetup,
    eventAddress,
    eventMessage
  ) => {
    e.preventDefault();
    this.setState({
      eventID: eventID,
      name: eventName,
      date: eventDate,
      time: eventTime,
      location: eventLocation,
      meetup_rsvp: eventMeetup,
      address: eventAddress,
      message: eventMessage,
      edit: true
    });
  };

  render() {
    const {
      name,
      date,
      time,
      location,
      meetup_rsvp,
      address,
      message,
      errorMessage,
      edit
    } = this.state;

    this.props.eventsList &&
      this.props.eventsList.sort(
        (a, b) => this.datestring(b.date) - this.datestring(a.date)
      );

    const myEvents =
      this.props.eventsList &&
      this.props.eventsList.map((item, index) => {
        const className =
          this.state.activeIndex === index
            ? ".d-block d-flex flex-row"
            : "d-none";
        return (
          <>
            <div className="mt-3 h6" key={item.eventID} ref={index}>
              <ul className="list-group">
                <li className="list-group-item">Name: {item.name}</li>
                <li className="list-group-item">ID: {item.eventID}</li>
                <li className="list-group-item">
                  Date: {dateFormat(item.date)}
                </li>
                <li className="list-group-item">Time: {item.time}</li>
                <li className="list-group-item">Location: {item.location}</li>
                <li className="list-group-item">
                  Meetup_rsvp: {item.meetup_rsvp}
                </li>
                <li className="list-group-item">Address: {item.address}</li>
                <li className="list-group-item">Message: {item.message}</li>
                <li className="list-group-item">
                  <div className="d-flex flex-row">
                    <div
                      className="f-links"
                      onClick={e => this.handleClick(e, index)}
                    >
                      delete
                    </div>
                    <div className={`${className}`}>
                      <div className="px-1">: Are you sure? </div>
                      <div
                        className="px-3 f-links"
                        onClick={e => this.deleteEvent(e, item.eventID)}
                      >
                        Yes
                      </div>
                      <div
                        className="px-3 f-links"
                        onClick={e => this.hideDelete(e, item.eventID)}
                      >
                        No
                      </div>
                    </div>
                    <div
                      className="f-links pl-2"
                      onClick={e => {
                        this.editEvent(
                          e,
                          item.eventID,
                          item.name,
                          item.date,
                          item.time,
                          item.location,
                          item.meetup_rsvp,
                          item.address,
                          item.message
                        );
                        this.scrollToEditTop();
                      }}
                    >
                      edit
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </>
        );
      });

    return (
      <div className="container">
        <div className="col-12 top-placeholder" />

        <div className="col-12 h1 title-padding text-center" ref="TopAddEvent">
          ADD EVENTS
        </div>
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-11 col-11">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Event Name - required</label>
                <input
                  className="form-control"
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={name}
                  onChange={this.handleChange}
                  required
                />
              </div>{" "}
              <div className="form-group">
                <label htmlFor="date">Date - required</label>
                <input
                  className="form-control"
                  type="date"
                  name="date"
                  placeholder="Date"
                  value={date}
                  onChange={this.handleChange}
                  required
                />
              </div>{" "}
              <div className="form-group">
                <label htmlFor="time">Time (ex: 3pm-5:30pm)</label>
                <input
                  className="form-control"
                  type="text"
                  name="time"
                  placeholder="Time"
                  value={time}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="location">Location Name - required</label>
                <input
                  className="form-control"
                  type="location"
                  name="location"
                  value={location}
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="meetup_rsvp">
                  Meetup Link (ex: https://www.meetup.com/)
                </label>
                <input
                  className="form-control"
                  type="url"
                  name="meetup_rsvp"
                  value={meetup_rsvp}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="address">Address</label>
                <input
                  className="form-control"
                  type="address"
                  name="address"
                  value={address}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message - required</label>
                <textarea
                  className="form-control"
                  type="message"
                  name="message"
                  value={message}
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div className="my-3 errormsg">
                {errorMessage !== null ? (
                  <FormError theMessage={errorMessage} />
                ) : null}
              </div>
              {!edit ? (
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              ) : (
                <>
                  <div
                    className="btn btn-success pointer"
                    onClick={this.handelEdit}
                  >
                    Save Edit
                  </div>

                  <div
                    className="btn btn-warning pointer ml-4"
                    onClick={this.cancelEdit}
                  >
                    Cancel Edit
                  </div>
                </>
              )}
              <hr />
            </form>
          </div>

          <div className="col-lg-6 col-md-6 col-sm-11 col-11 scroll-right-column">
            {/* unit start */}
            {myEvents}
            {/* unit end */}
          </div>
          <div className="col-12 top-placeholder" />
        </div>
      </div>
    );
  }
}

export default withAuth(AddEvents, "/signin");
