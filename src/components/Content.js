import React, { Component } from "react";
import Eventmap from "../components/Events/Eventmap";

export default class Content extends Component {
  render() {
    return (
      <>
        <div className="container">
          <div className="row pt-5">
            <div className="col-12 h2 gradient ">Upcoming Events</div>
            <div className="col-12">
              Join us at our next professional or social events
            </div>
            <div className="container pt-3">
              {/* Event unit */}
              <Eventmap home_number="2" />
              {/* Event unit */}
            </div>
          </div>
          {/* row-spacer */}
          <div className="m-4" />
        </div>
      </>
    );
  }
}
