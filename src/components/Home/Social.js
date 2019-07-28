import React, { Component } from "react";

export default class Social extends Component {
  render() {
    return (
      <main>
        <div className="container mb-5">
          <div className="row pt-3">
            <div className="col-12 h2 gradient ">Social Media</div>
            <div className="col-12">
              Connect with us through our active social media group
            </div>
          </div>
          {/* Unit */}
          <div className="row justify-content-center pt-5">
            <div className="col-12 h4 ">
              Facebook:{" "}
              <a
                href="https://www.facebook.com/groups/839720429549033/about/"
                target="_blank"
                rel="noopener noreferrer"
              >
                NAAAP Tampa Bay
              </a>
            </div>
            <div className="col-12 img-container">
              <a
                href="https://www.facebook.com/groups/839720429549033/about/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className="social center rounded shadow"
                  src={require(`../../images/facebook3.png`)}
                  alt="facebook screenshot"
                />
              </a>
            </div>
          </div>
          <div className="row justify-content-center pt-5">
            <div className="col-12 h4 ">
              Meetup:{" "}
              <a
                href="https://www.meetup.com/Tampa-Asian-American-professionals-Meetup"
                target="_blank"
                rel="noopener noreferrer"
              >
                NAAAP - Tampa
              </a>
            </div>
            <div className="col-12 img-container">
              <a
                href="https://www.meetup.com/Tampa-Asian-American-professionals-Meetup"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className="social center rounded shadow"
                  src={require(`../../images/meetup1.png`)}
                  alt="facebook screenshot"
                />
              </a>
            </div>
          </div>
        </div>
      </main>
    );
  }
}
