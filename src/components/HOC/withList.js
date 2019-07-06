import React from "react";
import firebase from "../Firebase";
import { DateTime } from "luxon";

const withList = WrappedComponent => {
  class WithList extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        eventsList: null
      };
    }

    dateFormat = (dateData, format) =>
      DateTime.fromISO(dateData).toFormat(format);

    componentDidMount() {
      const ref = firebase.database().ref("events/");
      ref.on("value", snapshot => {
        let events = snapshot.val();
        let eventsList = [];

        for (let item in events) {
          eventsList.push({
            eventID: item,
            name: events[item].name,
            date: events[item].date,
            time: events[item].time,
            location: events[item].location,
            meetup_rsvp: events[item].meetup_rsvp,
            address: events[item].address,
            message: events[item].message
          });
        }
        this.setState({
          eventsList: eventsList
        });
      });
    }

    render() {
      return (
        <WrappedComponent
          eventsList={this.state.eventsList}
          {...this.props}
          dateFormat={this.dateFormat}
        />
      );
    }
  }
  return WithList;
};

export default withList;
