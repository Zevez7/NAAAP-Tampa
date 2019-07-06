import React, { Component } from "react";
import withCounter from "./withCounter";

class HoverCounter extends Component {
  render() {
    const { count, incrementCount } = this.props;
    return (
      <button onMouseOver={incrementCount}>
        {this.props.name}
        {count} {this.props.name}
      </button>
    );
  }
}

export default withCounter(HoverCounter);
