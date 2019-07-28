import React, { Component } from "react";
import FormError from "../Firebase/FormError";
import firebase from "../Firebase/Firebase";
import { Redirect } from "react-router-dom";

export default class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      errorMessage: null,
      redirect_signin_success: false
    };
  }
  handleChange = e => {
    const itemName = e.target.name;
    const itemValue = e.target.value;

    this.setState({ [itemName]: itemValue });
  };

  handleSubmit = e => {
    e.preventDefault();
    var registrationInfo = {
      email: this.state.email,
      password: this.state.password
    };

    firebase
      .auth()
      .signInWithEmailAndPassword(
        registrationInfo.email,
        registrationInfo.password
      )
      .catch(error => {
        this.setState({
          errorMessage: error.message
        });
        return Promise.reject();
      })
      .then(() => {
        this.setState({
          errorMessage: null,
          redirect_signin_success: true
        });
      });
  };

  render() {
    const {
      email,
      password,
      errorMessage,
      redirect_signin_success
    } = this.state;

    return (
      <div className="container">
        <div className="col-12 top-placeholder" />
        <div className="row justify-content-center">
          <div className="col-12 h1 title-padding text-center">SIGN IN</div>
        </div>
        <div className="row justify-content-center">
          <div className="col-12 col-lg-5 col-md-7 col-sm-11">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  className="form-control"
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  className="form-control"
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={this.handleChange}
                />
              </div>
              <div className="my-3 errormsg">
                {errorMessage !== null ? (
                  <FormError theMessage={errorMessage} />
                ) : null}
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
              {redirect_signin_success && <Redirect to="/" />}
            </form>
          </div>
        </div>
      </div>
    );
  }
}
