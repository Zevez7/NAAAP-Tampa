import React, { Component } from "react";
import { Link } from "react-router-dom";
import { DateTime, Interval } from "luxon";
import withAuth from "../HOC/withAuth";

class Membership extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: DateTime.local().toLocaleString(DateTime.DATE_FULL)
    };
  }

  dateNow = () => DateTime.local();

  dateFormat = dateData =>
    DateTime.fromISO(dateData).toLocaleString(DateTime.DATE_FULL);

  dateAddOneYear = dateData =>
    DateTime.fromISO(dateData)
      .plus({ years: 1 })
      .toLocaleString(DateTime.DATE_FULL);

  componentDidMount() {
    this.resume();
  }

  resume() {
    this.interval = setInterval(() => {
      this.setState({
        date: DateTime.local().toLocaleString(DateTime.DATE_FULL)
      });
    }, 1000);
  }

  render() {
    const { date } = this.state;
    const { role } = this.props;

    let renderActivity;

    let active;

    if (
      this.props.userMembership &&
      Interval.fromDateTimes(
        DateTime.fromISO(this.props.userMembership["activeDate"]),
        DateTime.fromISO(this.props.userMembership["activeDate"]).plus({
          years: 1
        })
      ).contains(this.dateNow())
    ) {
      active = (
        <div className="col-12 text-center p-4 text-success h1">ACTIVE</div>
      );
    } else {
      active = (
        <div className="col-12 text-center p-4 text-info h1">INACTIVE</div>
      );
    }

    const myMembership = this.props.userMembership && (
      <>
        <div className="h5 p-2">
          <strong>User Name:</strong> {this.props.userMembership.userName}
        </div>
        <div className="h5 p-2">
          <strong>Email Address: </strong> {this.props.userMembership.email}
        </div>
      </>
    );

    if (
      this.props.userMembership &&
      this.props.userMembership["activeDate"] === "inactive"
    ) {
      renderActivity = (
        <div className="row p-4">
          <div className="col-12 text-center p-4 text-info h1">REGISTERED</div>
        </div>
      );
    } else if (
      this.props.userMembership &&
      DateTime.fromISO(this.props.userMembership["activeDate"]).isValid === true
    ) {
      renderActivity = (
        <>
          <div className="row p-4">
            {active}
            <div className="col-12 text-center h2">{date}</div>
          </div>

          <div className="row pt-5">
            <div className="col-6">
              <div className="col-12 h3 text-center gradient ">Start Date</div>
              <div className="col-12 text-center h4">
                {this.props.userMembership &&
                  this.dateFormat(this.props.userMembership["activeDate"])}
              </div>
            </div>
            <div className="col-6">
              <div className="col-12 h3 text-center gradient ">End Date</div>
              <div className="col-12 text-center h4">
                {this.props.userMembership &&
                  this.dateAddOneYear(this.props.userMembership["activeDate"])}
              </div>
            </div>
          </div>
        </>
      );
    } else {
      renderActivity = "";
    }

    return (
      <main>
        <div className="container">
          <div className="col-12 top-placeholder" />
          <div className="row justify-content-center">
            <div className="col-12 h1 title-padding text-center">
              MEMBERSHIP
            </div>
            <div className="col-12">
              {role === "admin" && (
                <Link to="/addmembership">
                  <button type="button" className="btn btn-primary">
                    Add Membership
                  </button>
                </Link>
              )}
            </div>
          </div>
          <div className="row pt-5">
            <div className="col-12 h2 gradient ">Account</div>
            <div className="col-12 p-4">{myMembership}</div>
          </div>
          <div className="row pt-5">
            <div className="col-12 h2 gradient ">Membership Status</div>
          </div>
          {renderActivity}
          <div className="row p-4" />
          <div className="row p-4" />
        </div>
      </main>
    );
  }
}

export default withAuth(Membership, "/signin");
