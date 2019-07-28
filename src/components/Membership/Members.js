import React, { Component } from "react";
import { FaUser } from "react-icons/fa";
import data_members from "../../data/data_members.json";

export default class Members extends Component {
  render() {
    const member_map = data_members.map(item => (
      <div className="row p-4 border-bottom" key={item.number}>
        <div className="col-lg-2 col-md-4 col-sm-4 col-4 fa-user-profile">
          <FaUser />
        </div>
        <div className="col-lg-4 col-md-8 col-sm-8 col-8">
          <ul className="list-group user">
            <li className="list-group-item user h3">
              {item.first_name} {item.last_name}
            </li>
            <li className="list-group-item user">{item.title}</li>
            <li className="list-group-item user">{item.email}</li>
            <li className="list-group-item user">{item.phone}</li>
          </ul>
        </div>
        <div className="col-lg-6 col-md-12 col-sm-12 col-12 pt-1">
          <p>{item.bio}</p>
        </div>
      </div>
    ));
    return (
      <main>
        <div className="container">
          <div className="col-12 top-placeholder" />
          <div className="row justify-content-center">
            <div className="col-12 h1 title-padding text-center">MEMBERS</div>
          </div>
          <div className="row pt-5">
            <div className="col-12 h2 gradient ">Board Member</div>
          </div>
          {/* unit */}
          {member_map}
          {/* unit */}
        </div>
      </main>
    );
  }
}
