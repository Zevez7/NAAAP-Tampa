import React, { Component } from "react";
import FormError from "../FormError";
import firebase from "../Firebase";
import withAuth from "./withAuth";
import { DateTime } from "luxon";

var dateFormat = dateData => DateTime.fromISO(dateData).toFormat("DD");

class AddEvents extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      date: "",
      time: "",
      location: "",
      meetup_rsvp: "",
      address: "",
      message: "",
      errorMessage: null,
      redirect_addevents_success: false,
      activeIndex: null
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
      name: "",
      date: "",
      time: "",
      location: "",
      meetup_rsvp: "",
      address: "",
      message: ""
    });
  };

  handleClick = (e, index) => {
    e.preventDefault();
    this.setState({ activeIndex: index });
  };

  hideDelete = e => {
    e.preventDefault();
    this.setState({ activeIndex: null });
  };

  deleteProject = (e, whatProject) => {
    e.preventDefault();
    const ref = firebase.database().ref(`events/${whatProject}`);
    ref.remove();
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
      errorMessage
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
            <div className="mt-3 h6" key={item.eventID}>
              <ul class="list-group">
                <li class="list-group-item">Name: {item.name}</li>
                <li class="list-group-item">ID: {item.eventID}</li>
                <li class="list-group-item">Date: {dateFormat(item.date)}</li>
                <li class="list-group-item">Time: {item.time}</li>
                <li class="list-group-item">Location: {item.location}</li>
                <li class="list-group-item">Meetup_rsvp: {item.meetup_rsvp}</li>
                <li class="list-group-item">Address: {item.address}</li>
                <li class="list-group-item">Message: {item.message}</li>
                <li class="list-group-item">
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
                        onClick={e => this.deleteProject(e, item.eventID)}
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
        <div className="row justify-content-center">
          <div className="col-12 h1 title-padding text-center">ADD EVENTS</div>
        </div>
        <div className="row justify-content-center">
          <div className="col-12 col-lg-6 col-md-8 col-sm-11">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Event Name</label>
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
                <label htmlFor="date">Date</label>
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
                <label htmlFor="time">Time</label>
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
                <label htmlFor="location">Location Name</label>
                <input
                  className="form-control"
                  type="location"
                  name="location"
                  placeholder="Location"
                  value={location}
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="meetup_rsvp">Meetup Link</label>
                <input
                  className="form-control"
                  type="meetup_rsvp"
                  name="meetup_rsvp"
                  placeholder="Meetup Link"
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
                  placeholder="Address"
                  value={address}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  className="form-control"
                  type="message"
                  name="message"
                  placeholder="Message"
                  value={message}
                  onChange={this.handleChange}
                />
              </div>
              <div className="my-3 errormsg">
                {errorMessage !== null ? (
                  <FormError theMessage={errorMessage} />
                ) : null}
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
              <hr />
            </form>{" "}
            {/* unit start */}
            {myEvents}
            {/* unit end */}
            <div className="col-12 top-placeholder" />
          </div>
        </div>
      </div>
    );
  }
}

export default withAuth(AddEvents, "/signin");
