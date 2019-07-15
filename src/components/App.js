import React, { Component } from "react";
import "../css/App.css";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Hero from "./Hero";
import Content from "./Content";
import Aboutus from "./Aboutus";
import Social from "./Social";
import Nav from "./Nav";
import Events from "./Events/Events";
import Members from "./Members";
import Partners from "./Partners/Partners";
import ScrollToTop from "./ScrollToTop";
import NotFound from "./Not_Found";
import SignUp from "./SignUp";
import SignIn from "./SignIn";

import firebase from "./Firebase";
import Membership from "./Membership";
import AddEvents from "./Events/AddEvents";
import AddPartners from "./Partners/AddPartners";
import Jobs from "./Jobs/Jobs";
import AddJobs from "./Jobs/Addjobs";
import JobDetails from "./Jobs/JobDetails";

// this allows link that is clicked to start at the top of the window

class Home extends Component {
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

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      displayName: null,
      userID: null
    };
  }

  componentDidMount() {
    const refEvent = firebase.database().ref("events/");
    refEvent.on("value", snapshot => {
      let events = snapshot.val();
      let eventsList = [];

      for (let item in events) {
        eventsList.push({
          eventID: item,
          name: events[item].name,
          date: events[item].date,
          time: events[item].time,
          location: events[item].location,
          meetup_rsvp: events[item].meetup_rsvp,
          address: events[item].address,
          message: events[item].message
        });
      }
      this.setState({
        eventsList: eventsList
      });
    });

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

    // when firebase is signed in onAuthStateChanged is triggered. FBUser is the currentUser object that is passed into the argument.
    firebase.auth().onAuthStateChanged(FBUser => {
      // if there's a user. Set the state of the user to these values
      if (FBUser) {
        this.setState({
          user: FBUser,
          displayName: FBUser.displayName,
          userID: FBUser.uid
        });
      } else {
        // if no user if found on auth change / sign-in, set user as null
        this.setState({ user: null });
      }
    });
  }

  logOutHandler = () => {
    this.setState({
      user: null,
      displayName: null,
      userID: null
    });
    firebase.auth().signOut();
  };

  registerUser = userName => {
    firebase.auth().onAuthStateChanged(FBUser => {
      FBUser.updateProfile({
        displayName: userName
      }).then(() => {
        this.setState({
          user: FBUser,
          displayName: FBUser.displayName,
          userID: FBUser.uid
        });
      });
    });
  };

  render() {
    const {
      user,
      displayName,
      userID,
      eventsList,
      partnerList,
      jobList
    } = this.state;

    return (
      <Router>
        <ScrollToTop>
          <main>
            <Nav
              logOutUser={this.logOutHandler}
              user={user}
              displayName={displayName}
            />
            <Switch>
              <Route exact path="/" render={props => <Home {...props} />} />
              <Route path="/aboutus" render={props => <Aboutus {...props} />} />
              <Route
                path="/events"
                render={props => <Events {...props} user={user} />}
              />
              <Route path="/members" render={props => <Members {...props} />} />
              <Route
                path="/signup"
                render={props => (
                  <SignUp {...props} registerUser={this.registerUser} />
                )}
              />
              <Route
                path="/signin"
                render={props => (
                  <SignIn {...props} registerUser={this.registerUser} />
                )}
              />
              <Route
                path="/partners"
                render={props => <Partners {...props} user={user} />}
              />
              <Route
                path="/jobs"
                render={props => <Jobs {...props} user={user} />}
              />
              <Route
                exact
                path="/addevents"
                render={props => (
                  <AddEvents
                    {...props}
                    displayName={displayName}
                    userID={userID}
                    eventsList={eventsList}
                  />
                )}
              />
              <Route
                exact
                path="/addpartners"
                render={props => (
                  <AddPartners
                    {...props}
                    displayName={displayName}
                    userID={userID}
                    partnerList={partnerList}
                  />
                )}
              />

              <Route
                exact
                path="/addjobs"
                render={props => (
                  <AddJobs
                    {...props}
                    displayName={displayName}
                    userID={userID}
                    jobList={jobList}
                  />
                )}
              />

              <Route
                exact
                path="/jobdetails/:id"
                render={props => {
                  let jobDetailIds = props.location.pathname.replace(
                    "/jobdetails/",
                    ""
                  );

                  let jobIndex = jobList.findIndex(
                    item => item.JobID === jobDetailIds
                  );
                  return <JobDetails {...props} jobItem={jobList[jobIndex]} />;
                }}
              />

              <Route
                path="/membership"
                render={props => (
                  <Membership {...props} displayName={displayName} />
                )}
              />
              <Route component={NotFound} />
            </Switch>
          </main>
        </ScrollToTop>
      </Router>
    );
  }
}
