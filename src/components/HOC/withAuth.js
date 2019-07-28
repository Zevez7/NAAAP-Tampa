import React from "react";
import firebase from "../Firebase/Firebase";

const withAuth = (WrappedComponent, redirectPath) => {
  class WithAuth extends React.Component {
    componentDidMount() {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
        } else {
          return this.props.history.push(redirectPath);
        }
      });
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }
  return WithAuth;
};

export default withAuth;
