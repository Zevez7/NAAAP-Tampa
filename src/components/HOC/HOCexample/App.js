import React, { Component } from "react";
import ClickCounter from "./ClickCounter";
import HoverCounter from "./HoverCounter";

class App extends Component {
  render() {
    return (
      <>
        <div className="App">
          <ClickCounter name="Hello" />
          <HoverCounter name="Sad" />
        </div>
      </>
    );
  }
}

export default App;
