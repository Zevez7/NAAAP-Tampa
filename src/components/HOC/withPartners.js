import React from "react";
import firebase from "../Firebase";

const withPartnersList = WrappedComponent => {
  class WithPartnersList extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        partnerList: null
      };
    }

    componentDidMount() {
      const refPartner = firebase.database().ref("partners/");
      refPartner.on("value", snapshot => {
        let partners = snapshot.val();
        let partnerList = [];

        for (let item in partners) {
          partnerList.push({
            partnerID: item,
            name: partners[item].name,
            location: partners[item].location,
            website: partners[item].website,
            logo: partners[item].logo
          });
        }
        this.setState({
          partnerList: partnerList
        });
      });
    }

    render() {
      return (
        <WrappedComponent
          partnerList={this.state.partnerList}
          {...this.props}
        />
      );
    }
  }
  return WithPartnersList;
};

export default withPartnersList;
