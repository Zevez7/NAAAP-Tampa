import React, { Component } from "react";

export default class Hero extends Component {
  render() {
    return (
      <main>
        <div
          className="container-fluid background  "
          style={{
            backgroundImage:
              `url(` + require(`../images/${this.props.image}.jpg`) + `)`
          }}
        >
          <div className="row justify-content-start pt-5">
            <div className="col-lg-4 col-md-6 col-sm-7 col-9 p-3 ml-0 rounded">
              <div className="p-3 bg-title  rounded-bottom shadow-custom">
                <span className="subtitle">
                  National Association of Asian American Professionals
                </span>{" "}
                <br />
                <span className="h1"> Tampa Bay</span>
                <br />
              </div>
            </div>
          </div>
        </div>
        {/* container */}
      </main>
    );
  }
}
