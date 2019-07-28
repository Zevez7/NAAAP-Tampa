import React, { Component } from "react";
import { DateTime } from "luxon";
import TimeAgo from "react-timeago";

class JobDetails extends Component {
  datestring = datedata => DateTime.fromISO(datedata);

  dateFormat = (dateData, format) =>
    DateTime.fromISO(dateData).toFormat(format);

  render() {
    const { jobItem } = this.props;

    // this.props.jobList &&

    return (
      <>
        <div className="container">
          <div className="col-12 top-placeholder " />
          <div className="row justify-content-center top_margin">
            <div className="col-12 h3">{jobItem.Title}</div>
            <div className="col-12 h5"> {jobItem.Address}</div>
            {jobItem.Contact_name && (
              <div className="col-12 h5"> {jobItem.Contact_name}</div>
            )}

            <div className="col-12 h5">{jobItem.Contact} </div>
            {jobItem.Website && (
              <div className="col-12 h5"> {jobItem.Website}</div>
            )}
          </div>
          <div className="col-12 h2 gradient my-4" />
          <div className="row py-3 border-bottom">
            <div className="col-12">
              <p>{jobItem.Description}</p>
            </div>
          </div>

          {jobItem.Skills && (
            <div className="row py-3 border-bottom">
              <div className="col-12 ">
                <div className="h5 font-weight-bold">
                  Skills/Qualifications{" "}
                </div>
                <p>{jobItem.Skills}</p>
              </div>
            </div>
          )}

          {jobItem.Experience && (
            <div className="row py-3 border-bottom">
              <div className="col-12 ">
                <div className="h5 font-weight-bold">Experience</div>
                <p>{jobItem.Experience}</p>
              </div>
            </div>
          )}

          {jobItem.Benefits && (
            <div className="row py-3 border-bottom">
              <div className="col-12 ">
                <div className="h5 font-weight-bold">Benefits</div>
                <p>{jobItem.Benefits}</p>
              </div>
            </div>
          )}

          {jobItem.Language && (
            <div className="row py-3 border-bottom">
              <div className="col-12">
                <div className="h5 font-weight-bold">Language</div>
                <p>{jobItem.Language}</p>
              </div>
            </div>
          )}

          {jobItem.Type && (
            <div className="row py-3 border-bottom">
              <div className="col-12">
                <div className="h5 font-weight-bold">Type</div>
                <p>{jobItem.Type}</p>
              </div>
            </div>
          )}

          {jobItem.Pay && (
            <div className="row py-3 border-bottom">
              <div className="col-12">
                <div className="h5 font-weight-bold">Pay</div>
                <p>{jobItem.Pay}</p>
              </div>
            </div>
          )}

          <div className="row py-3">
            <div className="col-12">
              <div className="h6">
                <TimeAgo date={this.dateFormat(jobItem.Date, "ff")} />
              </div>
            </div>
          </div>

          <div className="btm-placeholder" />
        </div>
      </>
    );
  }
}
export default JobDetails;
