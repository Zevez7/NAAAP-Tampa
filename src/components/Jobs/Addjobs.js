import React, { Component } from "react";
import FormError from "../FormError";
import firebase from "../Firebase";
import withAuth from "../HOC/withAuth";
import { DateTime } from "luxon";

class AddJobs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      JobID: "",
      Title: "",
      Company: "",
      Address: "",
      Description: "",
      Skills: "",
      Type: "",
      Pay: "",
      Experience: "",
      Authorization: "",
      Benefits: "",
      Language: "",
      Contact_name: "",
      Contact: "",
      Date: "",
      errorMessage: null,
      redirect_addevents_success: false,
      activeIndex: null,
      setActiveIndexEdit: null,
      edit: false
    };
  }

  dateFormat = dateData =>
    DateTime.fromISO(dateData).toLocaleString(DateTime.DATETIME_MED);
  datestring = datedata => DateTime.fromISO(datedata);
  now = () => DateTime.local().toISO();

  handleChange = e => {
    const itemName = e.target.name;
    const itemValue = e.target.value;

    this.setState({ [itemName]: itemValue });
  };

  addJob = () => {
    const ref = firebase.database().ref(`jobs/`);
    ref.push({
      Title: this.state.Title,
      Company: this.state.Company,
      Address: this.state.Address,
      Description: this.state.Description,
      Skills: this.state.Skills,
      Type: this.state.Type,
      Pay: this.state.Pay,
      Experience: this.state.Experience,
      Authorization: this.state.Authorization,
      Benefits: this.state.Benefits,
      Language: this.state.Language,
      Contact_name: this.state.Contact_name,
      Contact: this.state.Contact,
      Date: this.now()
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.addJob();

    this.setState({
      Title: "",
      Company: "",
      Address: "",
      Description: "",
      Skills: "",
      Type: "",
      Pay: "",
      Experience: "",
      Authorization: "",
      Benefits: "",
      Language: "",
      Contact_name: "",
      Contact: "",
      Date: ""
    });
  };

  handelEdit = e => {
    e.preventDefault();
    this.saveEdit();

    this.setState({
      Title: "",
      Company: "",
      Address: "",
      Description: "",
      Skills: "",
      Type: "",
      Pay: "",
      Experience: "",
      Authorization: "",
      Benefits: "",
      Language: "",
      Contact_name: "",
      Contact: "",
      Date: "",
      edit: false
    });
  };

  saveEdit = () => {
    const ref = firebase.database().ref(`jobs/${this.state.JobID}`);
    ref.update({
      Title: this.state.Title,
      Company: this.state.Company,
      Address: this.state.Address,
      Description: this.state.Description,
      Skills: this.state.Skills,
      Type: this.state.Type,
      Pay: this.state.Pay,
      Experience: this.state.Experience,
      Authorization: this.state.Authorization,
      Benefits: this.state.Benefits,
      Language: this.state.Language,
      Contact_name: this.state.Contact_name,
      Contact: this.state.Contact,
      Date: this.now()
    });
    this.scrollToEditIndex();
  };

  scrollToEditIndex = () => {
    this.refs[this.state.setActiveIndexEdit].scrollIntoView();
  };

  scrollToEditTop = () => {
    this.refs.TopPage.scrollIntoView();
  };

  setActiveIndexEdit = index => {
    this.setState({ setActiveIndexEdit: index });
  };

  handleClick = (e, index) => {
    e.preventDefault();
    this.setState({ activeIndex: index });
  };

  hideDelete = e => {
    e.preventDefault();
    this.setState({ activeIndex: null });
  };

  deleteJob = (e, whatjob) => {
    e.preventDefault();
    const ref = firebase.database().ref(`jobs/${whatjob}`);
    ref.remove();
  };

  editJob = (
    e,
    JobID,
    Title,
    Company,
    Address,
    Description,
    Skills,
    Type,
    Pay,
    Experience,
    Authorization,
    Benefits,
    Language,
    Contact_name,
    Contact,
    postDate
  ) => {
    e.preventDefault();
    this.setState({
      JobID: JobID,
      Title: Title,
      Company: Company,
      Address: Address,
      Description: Description,
      Skills: Skills,
      Type: Type,
      Pay: Pay,
      Experience: Experience,
      Authorization: Authorization,
      Benefits: Benefits,
      Language: Language,
      Contact_name: Contact_name,
      Contact: Contact,
      Date: postDate,
      edit: true
    });
  };

  render() {
    const {
      Title,
      Company,
      Address,
      Description,
      Skills,
      Type,
      Pay,
      Experience,
      Authorization,
      Benefits,
      Language,
      Contact_name,
      Contact,
      errorMessage,
      edit
    } = this.state;
    this.props.jobList && console.log(this.props.jobList);
    this.props.jobList &&
      this.props.jobList.sort(
        (a, b) => this.datestring(b.Date) - this.datestring(a.Date)
      );

    const myEvents =
      this.props.jobList &&
      this.props.jobList.map((item, index) => {
        const className =
          this.state.activeIndex === index
            ? ".d-block d-flex flex-row"
            : "d-none";
        return (
          <>
            <div className="mt-3 h6" key={item.JobID} ref={index}>
              <ul className="list-group ">
                <li className="list-group-item">Title: {item.Title}</li>
                <li className="list-group-item">JobID: {item.JobID}</li>
                <li className="list-group-item">Company: {item.Company}</li>
                <li className="list-group-item">Address: {item.Address}</li>
                <li className="list-group-item">
                  Description: {item.Description}
                </li>
                <li className="list-group-item">
                  Contact_name: {item.Contact_name}
                </li>
                <li className="list-group-item">Contact: {item.Contact}</li>
                <li className="list-group-item">Job Type: {item.Type}</li>
                <li className="list-group-item">Skills: {item.Skills}</li>
                <li className="list-group-item">Pay: {item.Pay}</li>
                <li className="list-group-item">
                  Experience: {item.Experience}
                </li>
                <li className="list-group-item">
                  Authorization: {item.Authorization}
                </li>
                <li className="list-group-item">Benefits: {item.Benefits}</li>
                <li className="list-group-item">Language: {item.Language}</li>

                <li className="list-group-item">
                  Date Posted: {this.dateFormat(item.Date)}
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
                        className="px-3 f-links"
                        onClick={e => this.deleteJob(e, item.JobID)}
                      >
                        Yes
                      </div>
                      <div
                        className="px-3 f-links"
                        onClick={e => this.hideDelete(e, item.JobID)}
                      >
                        No
                      </div>
                    </div>
                    <div
                      className="f-links pl-2"
                      onClick={e => {
                        this.editJob(
                          e,
                          item.JobID,
                          item.Title,
                          item.Company,
                          item.Address,
                          item.Description,
                          item.Contact,
                          item.Contact_name,
                          item.Skills,
                          item.Type,
                          item.Pay,
                          item.Experience,
                          item.Authorization,
                          item.Benefits,
                          item.Language,

                          item.Date
                        );
                        this.setActiveIndexEdit(index);
                        this.scrollToEditTop();
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
        <div className="row justify-content-center">
          <div className="col-12 h1 title-padding text-center" ref="TopPage">
            ADD JOBS
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-12 col-lg-6 col-md-8 col-sm-11">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="Title">Title - required</label>
                <input
                  className="form-control"
                  type="text"
                  name="Title"
                  placeholder="Title"
                  value={Title}
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="Company">Company - required</label>
                <input
                  className="form-control"
                  type="text"
                  name="Company"
                  placeholder="Company"
                  value={Company}
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="Address">Address - required</label>
                <input
                  className="form-control"
                  type="text"
                  name="Address"
                  placeholder="Address"
                  value={Address}
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="Description">Description - required</label>
                <textarea
                  className="form-control min-height"
                  type="text"
                  name="Description"
                  placeholder="Description"
                  value={Description}
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="Contact">Contact Info - required</label>
                <input
                  className="form-control"
                  type="text"
                  name="Contact"
                  placeholder="Contact"
                  value={Contact}
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="Contact_name">Contact Name</label>
                <input
                  className="form-control"
                  type="text"
                  name="Contact_name"
                  placeholder="Contact Name"
                  value={Contact_name}
                  onChange={this.handleChange}
                />
              </div>{" "}
              <div className="form-group">
                <label htmlFor="Skills">Skills</label>
                <input
                  className="form-control"
                  type="text"
                  name="Skills"
                  placeholder="Skills"
                  value={Skills}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="Type">Job Type</label>
                <input
                  className="form-control"
                  type="text"
                  name="Type"
                  placeholder="Type"
                  value={Type}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="Pay">Pay Rate / Salary</label>
                <input
                  className="form-control"
                  type="text"
                  name="Pay"
                  placeholder="Pay"
                  value={Pay}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="Experience">Experience</label>
                <input
                  className="form-control"
                  type="text"
                  name="Experience"
                  placeholder="Experience"
                  value={Experience}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="Authorization">Authorization</label>
                <input
                  className="form-control"
                  type="text"
                  name="Authorization"
                  placeholder="Authorization"
                  value={Authorization}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="Benefits">Benefits</label>
                <input
                  className="form-control"
                  type="text"
                  name="Benefits"
                  placeholder="Benefits"
                  value={Benefits}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="Language">Language</label>
                <input
                  className="form-control"
                  type="text"
                  name="Language"
                  placeholder="Language"
                  value={Language}
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
                <div
                  className="btn btn-success pointer"
                  onClick={this.handelEdit}
                >
                  Save Edit
                </div>
              )}
              <hr />
            </form>
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

export default withAuth(AddJobs, "/signin");
