import React, { Component } from "react";
import { Link } from "react-router-dom";

import { FaHandshake } from "react-icons/fa";

class Partners extends Component {
  render() {
    const { user } = this.props;
    return (
      <>
        <div className="container">
          <div className="col-12 top-placeholder" />
          <div className="row justify-content-center">
            <div className="col-12 h1 title-padding text-center">PARTNERS</div>
          </div>
          {user && (
            <Link to="/addpartners">
              <button type="button" className="btn btn-primary">
                Add Partners
              </button>
            </Link>
          )}
          <div className="row justify-content-start pt-4">
            <div className="col-3 Fa-handshake text-center">
              <FaHandshake />
            </div>
            <div className="col-9 ">
              <div className="h3"> Connect with us today.</div>
              We are the premier Tampa Bay asian professional community. <br />
              Email us at Man.Lee@naaap.org
            </div>
          </div>

          <div className="row pt-5">
            <div className="col-12 h2 gradient">Local Partners</div>
          </div>
          {/* unit */}
          <div className="row pt-3">
            <div className="col-3 p-2 text-center">
              <img
                className="img-fluid businesslogo"
                src={require(`../../images/nielsen.jpg`)}
                alt="nielsen log"
              />
            </div>
            <div className="col-9 p-2">
              <ul className="list-group user">
                <li className="list-group-item user h2">Nielsen</li>
                <li className="list-group-item user">Tampa, Florida</li>
                <li className="list-group-item user">
                  <a href="https://www.nielsen.com/us/en.html">
                    Official Website
                  </a>
                </li>
              </ul>
            </div>
          </div>
          {/* unit */}
          <div className="row pt-3">
            <div className="col-3 p-2 text-center">
              <img
                className="img-fluid businesslogo"
                src={require(`../../images/nielsen.jpg`)}
                alt="nielsen log"
              />
            </div>
            <div className="col-9 p-2">
              <ul className="list-group user">
                <li className="list-group-item user h2">Nielsen</li>
                <li className="list-group-item user">Tampa, Florida</li>
                <li className="list-group-item user">
                  <a href="https://www.nielsen.com/us/en.html">
                    Official Website
                  </a>
                </li>
              </ul>
            </div>
          </div>
          {/* unit */}
          <div className="row pt-3">
            <div className="col-3 p-2 text-center">
              <img
                className="img-fluid businesslogo"
                src={require(`../../images/nielsen.jpg`)}
                alt="nielsen log"
              />
            </div>
            <div className="col-9 p-2">
              <ul className="list-group user">
                <li className="list-group-item user h2">Nielsen</li>
                <li className="list-group-item user">Tampa, Florida</li>
                <li className="list-group-item user">
                  <a href="https://www.nielsen.com/us/en.html">
                    Official Website
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default Partners;
