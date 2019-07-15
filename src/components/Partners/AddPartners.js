import React, { Component } from "react";
import FormError from "../FormError";
import withAuth from "../HOC/withAuth";

import firebase from "../Firebase";

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
      edit: false,
      setActiveIndexEdit: null
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

    this.setState({
      name: "",
      location: "",
      website: "",
      logo: ""
    });
  };

  handelEdit = e => {
    e.preventDefault();
    this.saveEdit();

    this.setState({
      name: "",
      location: "",
      website: "",
      logo: "",
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
    this.scrollToEditIndex();
  };

  scrollToEditIndex = () => {
    this.refs[this.state.setActiveIndexEdit].scrollIntoView();
  };

  scrollToEditTop = () => {
    this.refs.TopAddEvent.scrollIntoView();
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
      <>
        <div className="container">
          <div className="col-12 top-placeholder" />
          <div className="row justify-content-center">
            <div
              className="col-12 h1 title-padding text-center"
              ref="TopAddEvent"
            >
              ADD PARTNERS
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-12 col-lg-6 col-md-8 col-sm-11">
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Partner Name</label>
                  <input
                    className="form-control"
                    type="text"
                    name="name"
                    placeholder="Name"
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
                    placeholder="Location"
                    value={location}
                    onChange={this.handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="logo">Logo</label>
                  <input
                    className="form-control text-lowercase"
                    type="logo"
                    name="logo"
                    placeholder="Logo"
                    value={logo}
                    onChange={this.handleChange}
                    onInput={this.toInputUppercase}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="website">
                    Website (example: https://www.google.com/)
                  </label>
                  <input
                    className="form-control"
                    type="website"
                    name="website"
                    placeholder="Website"
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
                  <div
                    className="btn btn-success pointer"
                    onClick={this.handelEdit}
                  >
                    Save Edit
                  </div>
                )}
                <hr />
              </form>{" "}
              {/* unit start */}
              {myPartners}
              {/* unit end */}
              <div className="col-12 top-placeholder" />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default withAuth(AddPartners, "/signin");
