import React, { Component } from "react";
import FormError from "../Firebase/FormError";
import withAuth from "../HOC/withAuth";

import firebase from "../Firebase/Firebase";

class AddPartners extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      location: "",
      website: "",
      logo: "",
      errorMessage: null,
      activeIndex: null,
      edit: false
    };
  }

  toInputUppercase = e => {
    e.target.value = e.target.value.toLowerCase();
  };

  handleChange = e => {
    const itemName = e.target.name;
    const itemValue = e.target.value;

    this.setState({ [itemName]: itemValue });
  };

  addPartners = () => {
    const ref = firebase.database().ref(`partners/`);
    ref.push({
      name: this.state.name,
      location: this.state.location,
      website: this.state.website,
      logo: this.state.logo
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.addPartners();
    this.resetState();
  };

  handelEdit = e => {
    e.preventDefault();
    this.saveEdit();
    this.resetState();

    this.setState({
      edit: false
    });
  };

  saveEdit = () => {
    const ref = firebase.database().ref(`partners/${this.state.partnerID}`);
    ref.update({
      name: this.state.name,
      location: this.state.location,
      website: this.state.website,
      logo: this.state.logo
    });
  };

  scrollToEditTop = () => {
    this.refs.TopAddEvent.scrollIntoView();
  };

  handleClick = (e, index) => {
    e.preventDefault();
    this.setState({ activeIndex: index });
  };

  hideDelete = e => {
    e.preventDefault();
    this.setState({ activeIndex: null });
  };

  deleteProject = (e, whatProject) => {
    e.preventDefault();
    const ref = firebase.database().ref(`partners/${whatProject}`);
    ref.remove();
  };

  editPartner = (e, partnerID, name, location, logo, website) => {
    e.preventDefault();
    this.setState({
      partnerID: partnerID,
      name: name,
      location: location,
      logo: logo,
      website: website,
      edit: true
    });
  };

  cancelEdit = e => {
    this.resetState();
    this.setState({
      edit: false
    });
  };

  resetState = () => {
    this.setState({
      name: "",
      location: "",
      website: "",
      logo: ""
    });
  };

  render() {
    const { name, location, website, logo, errorMessage, edit } = this.state;

    const myPartners =
      this.props.partnerList &&
      this.props.partnerList.map((item, index) => {
        const className =
          this.state.activeIndex === index
            ? ".d-block d-flex flex-row"
            : "d-none";
        return (
          <>
            <div className="mt-3 h6" key={item.partnerID} ref={index}>
              <ul class="list-group">
                <li class="list-group-item">Name: {item.name}</li>
                <li class="list-group-item">Location: {item.location}</li>
                <li class="list-group-item">Logo: {item.logo}</li>
                <li class="list-group-item">Website: {item.website}</li>
                <li class="list-group-item">
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
                        onClick={e => this.deleteProject(e, item.partnerID)}
                      >
                        Yes
                      </div>
                      <div
                        className="px-3 f-links"
                        onClick={e => this.hideDelete(e, item.partnerID)}
                      >
                        No
                      </div>
                    </div>
                    <div
                      className="f-links pl-2"
                      onClick={e => {
                        this.editPartner(
                          e,
                          item.partnerID,
                          item.name,
                          item.location,
                          item.logo,
                          item.website
                        );
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
      <>
        <div className="container">
          <div className="col-12 top-placeholder" />
          <div
            className="col-12 h1 title-padding text-center"
            ref="TopAddEvent"
          >
            ADD PARTNERS
          </div>
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-11 col-11">
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Partner Name</label>
                  <input
                    className="form-control"
                    type="text"
                    name="name"
                    value={name}
                    onChange={this.handleChange}
                    required
                  />
                </div>{" "}
                <div className="form-group">
                  <label htmlFor="location">Location Name</label>
                  <input
                    className="form-control"
                    type="location"
                    name="location"
                    value={location}
                    onChange={this.handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="logo">
                    Logo (type a name and tell Dat about it)
                  </label>
                  <input
                    className="form-control text-lowercase"
                    type="logo"
                    name="logo"
                    value={logo}
                    onChange={this.handleChange}
                    onInput={this.toInputUppercase}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="website">
                    Website Address (ex: https://www.google.com/)
                  </label>
                  <input
                    className="form-control"
                    type="url"
                    name="website"
                    value={website}
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
              </form>{" "}
            </div>
            <div className="col-lg-6 col-md-6 col-sm-11 col-11 scroll-right-column">
              {/* unit start */}
              {myPartners}
              {/* unit end */}
            </div>

            <div className="col-12 top-placeholder" />
          </div>
        </div>
      </>
    );
  }
}

export default withAuth(AddPartners, "/signin");
