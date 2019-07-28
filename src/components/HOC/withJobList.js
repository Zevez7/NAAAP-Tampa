import React from "react";
import firebase from "../Firebase/Firebase";

const withJobList = WrappedComponent => {
  class WithJobList extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        jobList: null
      };
    }

    componentDidMount() {
      const refJobs = firebase.database().ref("jobs/");
      refJobs.on("value", snapshot => {
        let jobs = snapshot.val();
        let jobList = [];

        for (let item in jobs) {
          jobList.push({
            JobID: item,
            Title: jobs[item].Title,
            Company: jobs[item].Company,
            Address: jobs[item].Address,
            Description: jobs[item].Description,
            Skills: jobs[item].Skills,
            Type: jobs[item].Type,
            Pay: jobs[item].Pay,
            Experience: jobs[item].Experience,
            Authorization: jobs[item].Authorization,
            Benefits: jobs[item].Benefits,
            Language: jobs[item].Language,
            Contact_name: jobs[item].Contact_name,
            Contact: jobs[item].Contact,
            Date: jobs[item].Date
          });
        }
        this.setState({
          jobList: jobList
        });
      });
    }

    render() {
      return <WrappedComponent jobList={this.state.jobList} {...this.props} />;
    }
  }
  return WithJobList;
};

export default withJobList;
