import React, { Component } from "react";
import "../css/App.css";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import firebase from "./Firebase/Firebase";
import { DateTime } from "luxon";

import Home from "./Home/Home";
import Aboutus from "./Aboutus";
import Nav from "./Nav/Nav";
import Events from "./Events/Events";
import Members from "./Membership/Members";
import Partners from "./Partners/Partners";
import ScrollToTop from "./Nav/ScrollToTop";
import NotFound from "./Nav/Not_Found";
import SignUp from "./Register/SignUp";
import SignIn from "./Register/SignIn";
import Membership from "./Membership/Membership";
import AddEvents from "./Events/AddEvents";
import AddPartners from "./Partners/AddPartners";
import Jobs from "./Jobs/Jobs";
import AddJobs from "./Jobs/Addjobs";
import JobDetails from "./Jobs/JobDetails";
import AddMembership from "./Membership/AddMembership";

// this allows link that is clicked to start at the top of the window

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      displayName: null,
      userID: null
    };
  }

  now = () => DateTime.local().toISO();

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
          Website: jobs[item].Website,
          Date: jobs[item].Date
        });
      }
      this.setState({
        jobList: jobList
      });
    });

    const refUsers = firebase.database().ref("users/userown/");
    refUsers.on("value", snapshot => {
      let users = snapshot.val();
      let userOwnList = [];

      for (let item in users) {
        userOwnList.push({
          userID: item,
          email: users[item].email,
          userName: users[item].userName,
          userRole: users[item].role,
          activeDate: users[item].activeDate
        });
      }
      this.setState({
        userOwnList: userOwnList
      });
    });

    // when firebase is signed in onAuthStateChanged is triggered. FBUser is the currentUser object that is passed into the argument.
    firebase.auth().onAuthStateChanged(FBUser => {
      // if there's a user. Set the state of the user to these values
      if (FBUser) {
        this.setState({
          user: FBUser,
          displayName: FBUser.displayName,
          userID: FBUser.uid,
          userEmail: FBUser.email
        });
      } else {
        // if no user if found on auth change / sign-in, set user as null
        this.setState({ user: null });
      }
      if (this.state.userID) {
        const refMembership = firebase
          .database()
          .ref(`users/userown/${this.state.userID}`);
        refMembership.on("value", snapshot => {
          let userMembership = snapshot.val();

          if (userMembership) {
            this.setState({
              userMembership: userMembership,
              role: userMembership.role
            });
          }
        });
      }
    });
  }
  // component did mount end

  logOutHandler = () => {
    firebase
      .auth()
      .signOut()
      .then(result => {
        this.setState({
          user: null,
          displayName: null,
          userID: null,
          role: null,
          activeDate: null,
          userEmail: null,
          userMembership: null
        });
      });
  };

  // adding user to the database
  addUser = () => {
    const refUserOwn = firebase
      .database()
      .ref(`users/userown/${this.state.userID}`);
    refUserOwn.set({
      email: this.state.userEmail,
      userName: this.state.displayName,
      role: "user",
      activeDate: "inactive"
    });
  };

  // auth registration of user
  registerUser = userName => {
    firebase.auth().onAuthStateChanged(FBUser => {
      FBUser.updateProfile({
        displayName: userName
      })
        .then(() => {
          this.setState({
            user: FBUser,
            displayName: FBUser.displayName,
            userID: FBUser.uid,
            userEmail: FBUser.email
          });
        })
        .then(() => this.addUser());
    });
  };

  render() {
    const {
      user,
      displayName,
      userID,
      eventsList,
      partnerList,
      jobList,
      userMembership,
      userOwnList,
      role
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
                render={props => <Events {...props} role={role} />}
              />
              <Route path="/members" render={props => <Members {...props} />} />
              <Route
                path="/signup"
                render={props => (
                  <SignUp
                    {...props}
                    registerUser={this.registerUser}
                    addUser={this.addUser}
                  />
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
                render={props => <Partners {...props} role={role} />}
              />
              <Route
                path="/jobs"
                render={props => <Jobs {...props} role={role} />}
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
                    role={role}
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
                  <Membership
                    {...props}
                    displayName={displayName}
                    userMembership={userMembership}
                    role={role}
                  />
                )}
              />

              <Route
                path="/addmembership"
                render={props => (
                  <AddMembership {...props} userOwnList={userOwnList} />
                )}
              />

              {/* set default render to notfound if path is unknown */}
              <Route component={NotFound} />
            </Switch>
          </main>
        </ScrollToTop>
      </Router>
    );
  }
}
