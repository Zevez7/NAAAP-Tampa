import React, { Component } from "react";
import { DateTime } from "luxon";
import { Link } from "react-router-dom";
import withList from "../HOC/withList";
import Eventmap from "./Eventmap";

class Events extends Component {
  // convert the string time into luxon date time
  datestring = datedata => DateTime.fromISO(datedata);

  // return true is the date string is the future
  isBeforeNow = dt1 => dt1 > DateTime.local();

  sliceNumber = () => {
    for (let item in this.props.eventsList) {
      let date_string = this.props.eventsList[item]["date"];
      let date_value = this.datestring(date_string);
      if (this.isBeforeNow(date_value)) {
        return item;
      }
    }
  };
  render() {
    const { user, dateFormat } = this.props;

    this.props.eventsList &&
      this.props.eventsList.sort(
        (a, b) => this.datestring(a.date) - this.datestring(b.date)
      );

    const pastEventmap =
      this.props.eventsList &&
      this.props.eventsList.slice(0, this.sliceNumber()).map(item => (
        <div className="row justify-content-start my-4" key={item.eventID}>
          <div className="col-lg-6 col-md-6 col-sm-12 col-12 py-1">
            <div className="h3"> {item.name} </div>
            <div>
              {dateFormat(item.date, "DDDD")} | {item.time}
            </div>
            <div>{item.location}</div>
            <div>{item.address}</div>
            <div>
              <a href={item.meetup_rsvp}>RSVP @ MeetUp.com</a>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 col-12 pt-2 pt-lg-5 pt-md-5">
            <p>{item.message}</p>
          </div>
        </div>
      ));

    return (
      <main>
        <div className="container">
          <div className="col-12 top-placeholder" />
          <div className="row justify-content-center">
            <div className="col-12 h1 title-padding text-center">EVENTS</div>
            <div className="col-12">
              {user && (
                <Link to="/addevents">
                  <button type="button" className="btn btn-primary">
                    Add Events
                  </button>
                </Link>
              )}
            </div>
          </div>

          <div className="row pt-5">
            <div className="col-12 h2 gradient ">Future Events</div>
            <div className="container pt-3">
              {/* Event unit */}
              <Eventmap home_number="4" />
              {/* Event unit */}
            </div>
            {/* container ends */}
          </div>
          <div className="row pt-5">
            <div className="col-12 h2 gradient ">Past Events</div>
            <div className="container pt-3">
              {/* unit */}
              {pastEventmap}
              {/* unit */}
            </div>
            {/* container ends */}
          </div>
        </div>
      </main>
    );
  }
}
export default withList(Events);
