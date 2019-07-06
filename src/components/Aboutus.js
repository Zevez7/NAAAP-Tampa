import React, { Component } from "react";

export default class Aboutus extends Component {
  render() {
    return (
      <main>
        <div className="container">
          <div className="col-12 top-placeholder" />
          <div className="row justify-content-center">
            <div className="col-12 h1 title-padding text-center">ABOUT US</div>
          </div>
          <div className="row pt-5">
            <div className="col-12 h2 gradient ">NAAAP Tampa Bay History</div>
            <div className="col-12 p-2">
              <p>
                The National Association of Asian American Professionals Tampa
                Bay Chapter (NAAAP TPA) is an all-volunteer, Pan-Asian American
                professional organization that promotes the career advancement
                and leadership development of Asian American professionals in
                all fields through networking, promoting Asian multiculturalism,
                and supporting diversity and community service.
              </p>
              <p>
                As part of a national organization, NAAAP is the largest and
                fastest growing Asian American professional organization in the
                U.S. and Canada. Through its business units, members can
                participate in activities that bring together other Asian
                American professionals in community service, professional
                development and networking opportunities.
              </p>
              <div>
                <a href="https://www.naaap.org/">
                  National Association of Asian American Professionals
                </a>{" "}
                Official Website
              </div>
              <div>
                <a href="https://tampa.naaap.org/cpages/home">
                  Tampa Bay National Association of Asian American Professionals
                </a>{" "}
                Official Website
              </div>
            </div>
          </div>
          <div className="row pt-5">
            <div className="col-12 h2 gradient ">Mission</div>
            <div className="col-12 p-2">
              <ul>
                <li>
                  Cultivate and empower leaders for professional excellence.
                </li>
                <li>Connect accomplished professionals for mutual success.</li>
                <li>Engage and participate with the community-at-large.</li>
                <li>
                  Inspire leaders to make a meaningful difference in government,
                  education, business, and society.
                </li>
              </ul>
            </div>
          </div>
          <div className="row pt-5">
            <div className="col-12 h2 gradient ">Vision</div>
            <div className="col-12 p-2">
              <p>
                NAAAP is the premier leadership organization for Asian
                professionals
              </p>
            </div>
          </div>
          <div className="row pt-5">
            <div className="col-12 h2 gradient ">Values</div>
            <div className="col-12 p-2">
              <ul>
                <li>Leadership – Develop, Inspire, and Connect Leaders</li>
                <li>Education – Excel at Lifelong Learning</li>
                <li>Accountability – Honor commitments to Deliver Value</li>
                <li>
                  Diversity – Embrace a Culture of Inclusion and Innovation
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    );
  }
}
