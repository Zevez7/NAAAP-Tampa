import React, { Component } from "react";
import { FaGlobeAmericas } from "react-icons/fa";
import { Link, Redirect } from "react-router-dom";
export default class Nav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect_logout_success: false
    };
  }

  redirect_logout_success = () => {
    this.setState({
      redirect_logout_success: true
    });
  };

  render() {
    const { logOutUser, user, displayName } = this.props;
    const { redirect_logout_success } = this.state;

    return (
      <div>
        <nav className="navbar navbar-expand-md navbar-dark bg-naap fixed-top shadow-custom">
          <Link to="/" className="navbar-brand h3">
            <span className="h3">
              <FaGlobeAmericas />
            </span>
            <span className="h4 underline"> NAAAP </span>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <Link to="/events" className="nav-link " href="#">
                  EVENTS
                </Link>
              </li>
              <li className="nav-item active">
                <Link to="/members" className="nav-link">
                  MEMBERS
                </Link>
              </li>
              <li className="nav-item active text-nowrap">
                <Link to="/aboutus" className="nav-link ">
                  ABOUT
                </Link>
              </li>
              <li className="nav-item active">
                <Link to="/partners" className="nav-link">
                  PARTNERS
                </Link>
              </li>

              <li className="nav-item active">
                <a className="nav-link" href="https://tampa.naaap.org/join">
                  MEMBERSHIP
                </a>
              </li>
            </ul>
            <span className="navbar-text d-flex">
              <div className="pr-3 text-uppercase">{displayName} </div>

              {!user && (
                <Link to="/signin" className="pointer no-decoration">
                  <div className="underline">SIGN IN</div>
                </Link>
              )}

              {user && (
                <span
                  className="pointer"
                  onClick={() => {
                    logOutUser();
                    this.redirect_logout_success();
                  }}
                >
                  <div className="underline logout-class">LOG OUT</div>
                </span>
              )}

              {redirect_logout_success && <Redirect to="/" />}
            </span>
          </div>
        </nav>
      </div>
    );
  }
}
