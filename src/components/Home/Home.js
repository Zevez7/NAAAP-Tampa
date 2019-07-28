import React, { Component } from "react";
import Hero from "./Hero";
import Content from "./Content";
import Social from "./Social";

export default class Home extends Component {
  render() {
    return (
      <>
        <div className="col-12 top-placeholder" />
        <Hero image="lovehero-min" />
        <Content />
        <Social />
      </>
    );
  }
}
