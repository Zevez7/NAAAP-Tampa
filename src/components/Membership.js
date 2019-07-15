import React, { Component } from "react";

import { DateTime } from "luxon";
import withAuth from "./HOC/withAuth";

class Membership extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: DateTime.local().toLocaleString(DateTime.DATETIME_MED_WITH_SECONDS)
    };
  }

  componentDidMount() {
    this.resume();
  }

  resume() {
    this.interval = setInterval(() => {
      this.setState({
        date: DateTime.local().toLocaleString(
          DateTime.DATETIME_MED_WITH_SECONDS
        )
      });
    }, 1000);
  }

  render() {
    const { date } = this.state;

    // const member_map = data_members.map(item => a);

    return (
      <main>
        <div className="container">
          <div className="col-12 top-placeholder" />
          <div className="row justify-content-center">
            <div className="col-12 h1 title-padding text-center">
              Welcome {this.props.displayName}
            </div>
          </div>
          <div className="row pt-5">
            <div className="col-12 h2 gradient ">Membership Status</div>
          </div>
          <div className="row p-4">
            <div className="col-12 text-center p-4 text-success h1">ACTIVE</div>
            <div className="col-12 text-center h2">{date}</div>
          </div>

          <div className="row pt-5">
            <div className="col-6">
              <div className="col-12 h3 text-center gradient ">Start Date</div>{" "}
              <div className="col-12 text-center h4">July 1, 2019</div>
            </div>
            <div className="col-6">
              <div className="col-12 h3 text-center gradient ">End Date</div>
              <div className="col-12 text-center h4">July 1, 2020</div>
            </div>
          </div>

          <div className="row p-4" />
          <div className="row p-4" />
        </div>
      </main>
    );
  }
}

export default withAuth(Membership, "/signin");
