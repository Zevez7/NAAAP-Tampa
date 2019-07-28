import React, { Component } from "react";
import { DateTime } from "luxon";
import withList from "../HOC/withList";

// convert the string time into luxon date time

class Eventmap extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  // convert the string time into luxon date time
  datestring = datedata => DateTime.fromISO(datedata);

  // return true is the date string is the future
  isAfterNow = dt1 => dt1 < DateTime.local();

  eventListSorted = () =>
    this.props.eventsList.sort(
      (a, b) => this.datestring(b.date) - this.datestring(a.date)
    );

  sliceNumber = () => {
    this.eventListSorted();
    for (let item in this.props.eventsList) {
      let date_string = this.props.eventsList[item]["date"];
      let date_value = this.datestring(date_string);
      if (this.isAfterNow(date_value)) {
        console.log(item);
        return item;
      }
    }
  };

  render() {
    const { dateFormat } = this.props;

    const myEvents =
      this.props.eventsList &&
      this.props.eventsList
        .slice(0, this.sliceNumber())
        .slice(0, `${this.props.home_number}`)
        .map(item => (
          <div className="row justify-content-center my-4" key={item.eventID}>
            <div className="col-lg-3 col-4 px-3 pt-4 bg-gray shadow-custom">
              <div className="col-12 text-center p-0">
                {dateFormat(item.date, "d")}
              </div>
              <div className="col-12 text-center p-0">
                {dateFormat(item.date, "LLL")}
              </div>
            </div>
            <div className="col-lg-9 col-7 px-4 py-1">
              <div className="h3">{item.name}</div>
              <div>
                {dateFormat(item.date, "DDDD")} | {item.time}
              </div>
              <div>{item.location}</div>
              <div>{item.address}</div>
              <div>
                <a
                  href={item.meetup_rsvp}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  RSVP @ MeetUp.com
                </a>
              </div>
            </div>
            <div className="col-12 pt-4">
              <p>{item.message}</p>
            </div>
          </div>
        ));

    return <>{myEvents}</>;
  }
}

export default withList(Eventmap);
