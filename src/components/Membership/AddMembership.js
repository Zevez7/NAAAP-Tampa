import React, { Component } from "react";
import FormError from "../Firebase/FormError";
import firebase from "../Firebase/Firebase";
import withAuth from "../HOC/withAuth";
import { DateTime } from "luxon";

var dateFormat = dateData => DateTime.fromISO(dateData).toFormat("DD");

class AddMembership extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userID: "",
      name: "",
      date: "",
      time: "",
      redirect_addevents_success: false,
      activeIndex: null,
      edit: false
    };
  }

  datestring = datedata => DateTime.fromISO(datedata);

  LocalString = datedata =>
    DateTime.fromISO(datedata).isValid
      ? DateTime.fromISO(datedata).toLocaleString()
      : datedata;

  now = () => DateTime.local().toLocaleString();

  handleChange = e => {
    const itemName = e.target.name;
    const itemValue = e.target.value;

    this.setState({ [itemName]: itemValue });
  };

  handelEdit = e => {
    e.preventDefault();
    this.saveEdit();

    this.setState({
      userID: "",
      name: "",
      email: "",
      activeDate: "",
      edit: false
    });
  };

  saveEdit = () => {
    const ref = firebase.database().ref(`users/userown/${this.state.userID}`);
    ref.update({
      activeDate: this.state.activeDate
    });
  };
  cancelEdit = e => {
    this.setState({
      userID: "",
      name: "",
      email: "",
      activeDate: "",
      edit: false
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

  deleteMembership = (e, whatMembership) => {
    e.preventDefault();
    const ref = firebase.database().ref(`users/userown/${whatMembership}`);
    ref.remove();
  };

  editEvent = (e, userID, userName, email, activeDate) => {
    e.preventDefault();
    this.setState({
      userID: userID,
      name: userName,
      email: email,
      activeDate: activeDate,
      edit: true
    });
  };

  render() {
    const { name, email, userID, activeDate, errorMessage, edit } = this.state;

    const { userOwnList } = this.props;

    const myUsers =
      userOwnList &&
      userOwnList.map((item, index) => {
        const className =
          this.state.activeIndex === index
            ? ".d-block d-flex flex-row"
            : "d-none";
        return (
          <>
            <div className="mt-3 h6" key={item.userID} ref={index}>
              <ul className="list-group">
                <li className="list-group-item">Name: {item.userName}</li>
                <li className="list-group-item">Email: {item.email}</li>
                <li className="list-group-item">userID: {item.userID}</li>
                <li className="list-group-item">
                  Active Date: {this.LocalString(`${item.activeDate}`)}
                </li>
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
                        className="px-2 f-links"
                        onClick={e => this.deleteMembership(e, item.userID)}
                      >
                        Yes
                      </div>
                      <div
                        className="px-2 f-links"
                        onClick={e => this.hideDelete(e, item.userID)}
                      >
                        No
                      </div>
                    </div>
                    <div
                      className="f-links pl-2"
                      onClick={e => {
                        this.editEvent(
                          e,
                          item.userID,
                          item.userName,
                          item.email,
                          item.activeDate
                        );
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
          Admin Panel
        </div>
        <div className="row">
          {/* left column */}
          <div className="col-lg-6 col-md-6 col-sm-11 col-11">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  className="form-control"
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={name}
                  onChange={this.handleChange}
                  disabled
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  className="form-control"
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={this.handleChange}
                  disabled
                />
              </div>
              <div className="form-group">
                <label htmlFor="userID">UserID</label>
                <input
                  className="form-control"
                  type="text"
                  name="userID"
                  placeholder="UserID"
                  value={userID}
                  onChange={this.handleChange}
                  disabled
                />
              </div>
              <div className="form-group">
                <label htmlFor="activeDate">Active Date (YYYY-MM-DD)</label>
                <input
                  className="form-control"
                  type="date"
                  name="activeDate"
                  placeholder="Date"
                  value={activeDate}
                  onChange={this.handleChange}
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

          {/* right column */}
          <div className="col-lg-6 col-md-6 col-sm-11 col-11 scroll-right-column">
            {/* unit start */}
            {myUsers}
            {/* unit end */}
          </div>
          <div className="col-12 top-placeholder" />
        </div>
      </div>
    );
  }
}

export default withAuth(AddMembership, "/signin");
