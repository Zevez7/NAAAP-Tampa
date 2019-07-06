import React, { Component } from "react";
import FormError from "./FormError";
import firebase from "./Firebase";
import { Redirect } from "react-router-dom";

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayName: "",
      email: "",
      passwordOne: "",
      passwordTwo: "",
      errorMessage: null,
      redirect_signup_success: false
    };
  }

  handleSubmit = e => {
    var registrationInfo = {
      displayName: this.state.displayName,
      email: this.state.email,
      password: this.state.passwordOne
    };
    e.preventDefault();

    firebase
      .auth()
      .createUserWithEmailAndPassword(
        registrationInfo.email,
        registrationInfo.password
      )
      .then(() => {
        this.props.registerUser(registrationInfo.displayName);
      })
      .catch(error => {
        if (error.message !== null) {
          this.setState({ errorMessage: error.message });
          return Promise.reject();
        } else {
          this.setState({ errorMessage: null });
        }
      })
      .then(() => {
        this.setState({
          redirect_signup_success: true
        });
      });
  };

  handleChange = e => {
    const itemName = e.target.name;
    const itemValue = e.target.value;

    this.setState({ [itemName]: itemValue }, () => {
      if (this.state.passwordOne !== this.state.passwordTwo) {
        this.setState({ errorMessage: "Passwords do not match" });
      } else {
        this.setState({ errorMessage: null });
      }
    });
  };

  render() {
    const {
      displayName,
      email,
      passwordOne,
      passwordTwo,
      errorMessage,
      redirect_signup_success
    } = this.state;

    return (
      <>
        <div className="container">
          <div className="col-12 top-placeholder" />
          <div className="row justify-content-center">
            <div className="col-12 h1 title-padding text-center">SIGN-UP</div>
          </div>
          <div className="row justify-content-center">
            <div className="col-12 col-lg-5 col-md-7 col-sm-11">
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label htmlFor="displayName">Username</label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Username"
                    name="displayName"
                    value={displayName}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    className="form-control"
                    type="email"
                    placeholder="Email Address"
                    name="email"
                    value={email}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="passwordOne">Password</label>
                  <input
                    className="form-control"
                    type="password"
                    placeholder="Password "
                    name="passwordOne"
                    value={passwordOne}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="passwordTwo">Confirm Password</label>
                  <input
                    className="form-control"
                    type="password"
                    placeholder="Password "
                    name="passwordTwo"
                    value={passwordTwo}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="my-2 errormsg">
                  {errorMessage !== null ? (
                    <FormError theMessage={errorMessage} />
                  ) : null}
                </div>

                {passwordTwo !== passwordOne ? (
                  <button type="submit" className="btn btn-primary" disabled>
                    Submit
                  </button>
                ) : (
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                )}

                {redirect_signup_success && <Redirect to="/" />}
                <div className="col-12 top-placeholder" />
                <div className="col-12 top-placeholder" />
                <div className="col-12 top-placeholder" />
                <div className="col-12 top-placeholder" />
                <div className="col-12 top-placeholder" />
                <div className="col-12 top-placeholder" />
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }
}
