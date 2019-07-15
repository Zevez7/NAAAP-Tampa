import React, { Component } from "react";
import { Link } from "react-router-dom";
import { DateTime } from "luxon";
import TimeAgo from "react-timeago";

import { FaBriefcase } from "react-icons/fa";
import withJobList from "../HOC/withJobList";

class Jobs extends Component {
  datestring = datedata => DateTime.fromISO(datedata);

  dateFormat = (dateData, format) =>
    DateTime.fromISO(dateData).toFormat(format);

  render() {
    const { user } = this.props;

    this.props.jobList &&
      this.props.jobList.sort(
        (a, b) => this.datestring(b.Date) - this.datestring(a.Date)
      );

    const myjobs =
      this.props.jobList &&
      this.props.jobList.map(item => {
        return (
          <Link className="remove-styling" to={`/jobdetails/${item.JobID}`}>
            <div className="row py-3 border-bottom bg-color" key={item.JobID}>
              <div className="col-lg-3 col-sm-12 col-12">
                <ul className="list-group user">
                  <li className="list-group-item user h5 font-weight-bold">
                    {item.Title}
                  </li>
                  <li className="list-group-item user h6">{item.Company}</li>
                  <li className="list-group-item user h6">{item.Address}</li>
                  <li className="list-group-item user h6">
                    <TimeAgo date={this.dateFormat(item.Date, "ff")} />
                  </li>
                </ul>
              </div>
              <div className="col-lg-9 col-sm-12 col-12 block-with-text pt-1">
                {item.Description}
              </div>
            </div>
          </Link>
        );
      });

    return (
      <>
        <div className="container">
          <div className="col-12 top-placeholder" />
          <div className="row justify-content-center">
            <div className="col-12 h1 title-padding text-center">JOBS</div>
          </div>
          {user && (
            <Link to="/addjobs">
              <button type="button" className="btn btn-primary">
                Add Jobs
              </button>
            </Link>
          )}
          <div className="row justify-content-start pt-4">
            <div className="col-3 Fa-handshake text-center">
              <FaBriefcase />
            </div>
            <div className="col-9 ">
              <div className="h3"> Tampa-bay Local Jobs</div>
              <p>
                Local Tampa-Bay businesses are looking to hire asian
                professionals from the communities. Check job listing to find
                the latest job posting.
              </p>
              <p>
                Are you a local Tampa-Bay business looking to hire asian
                professionals to increase your company's diversity and expand
                your market? Contact Linda@naaap.org to get listed today.
              </p>
            </div>
          </div>
          <div className="row pt-5">
            <div className="col-12 h2 gradient">Listing</div>
          </div>
          {/* unit */}

          {myjobs}

          {/* unit */}
        </div>
      </>
    );
  }
}
export default withJobList(Jobs);
