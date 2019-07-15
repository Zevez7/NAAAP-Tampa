import React from "react";
import firebase from "../Firebase";

const withAuth = (WrappedComponent, redirectPath) => {
  class WithAuth extends React.Component {
    componentWillMount() {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.setState({
            userUID: user.uid
          });
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
