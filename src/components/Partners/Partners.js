import React, { Component } from "react";
import { Link } from "react-router-dom";

import withPartnersList from "../HOC/withPartners";
import { FaHandshake } from "react-icons/fa";
import { ReactComponent as Default } from "../../images/logo/default.svg";

class Partners extends Component {
  // this function checks the image path and return a string that matches png/jpg/svg
  // it will then get the keys and not the value of the array? and put the string into an array
  // the string is then sliced to remove extraneous words media/static and ending img tag
  // imagelist array of image folder name string is used to check against logo.name data to render image logo.name as an image if there's a file name match
  // if there's no match of logo.name, then it would default to svg default class
  imageList = () => {
    const r = require.context(
      "../../images/logo/",
      false,
      /\.(png|jpe?g|svg)$/
    );
    return r.keys().map(r => {
      return r.slice(2, -4);
    });
  };

  render() {
    const { user } = this.props;

    console.log(this.imageList());

    const myPartners =
      this.props.partnerList &&
      this.props.partnerList.map(item => {
        return (
          <div className="row pt-3" key={item.partnerID}>
            <div className="col-lg-3 col-sm-6 col-6 p-2 text-center">
              {item.logo && this.imageList().includes(`${item.logo}`) ? (
                <img
                  className="img-fluid businesslogo"
                  src={require(`../../images/logo/${item.logo}.jpg`)}
                  alt={`${item.logo} logo`}
                />
              ) : (
                <Default className="svg" alt="design" />
              )}
            </div>
            <div className="col-lg-8 col-sm-6 col-6 p-2">
              <ul className="list-group user">
                <li className="list-group-item user h2">{item.name}</li>
                <li className="list-group-item user">{item.location}</li>
                {item.website && (
                  <li className="list-group-item user">
                    <a
                      href={`${item.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Official Website
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>
        );
      });

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
          {myPartners}
          {/* unit */}
        </div>
      </>
    );
  }
}
export default withPartnersList(Partners);
