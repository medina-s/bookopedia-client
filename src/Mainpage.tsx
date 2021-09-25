import React from "react";
import "./App.css";
import Homepage from "./Components/home/Homepage";
import Sitebar from "./Components/home/Sitebar";
import BookInfoIndex from "./Components/bookinfo/BookInfoIndex";
import MyReviewIndex from "./Components/review/MyReviewIndex";
import MyReadingListIndex from "./Components/readinglist/MyReadingListIndex";
import AuthIndex from "./Components/auth/AuthIndex";
import AllUsersIndex from "./Components/admin/AllUsersIndex";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export type MainpageState = {
  sessionToken: string | null;
  role: string | null;
  firstname: string | null;
};

type MainpageProps = {};

class Mainpage extends React.Component<MainpageProps, MainpageState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      sessionToken: "",
      role: "",
      firstname: "",
    };
    this.updateToken = this.updateToken.bind(this);
    this.clearToken = this.clearToken.bind(this);
  }

  componentDidMount() {
    if (localStorage.getItem("sessionToken")) {
      this.setState({
        sessionToken: localStorage.getItem("sessionToken"),
        role: localStorage.getItem("role"),
        firstname: localStorage.getItem("firstname"),
      });
    }
  }

  updateToken = (newToken: string, role: string, firstname: string) => {
    localStorage.setItem("sessionToken", newToken);
    localStorage.setItem("role", role);
    localStorage.setItem("firstname", firstname);
    this.setState({
      sessionToken: newToken,
      role: role,
      firstname: firstname,
    });
    console.log("UPDATE TOKEN!");
    console.log(this.state.sessionToken);
    console.log(this.state.role);
  };

  clearToken = () => {
    localStorage.clear();
    this.setState({
      sessionToken: " ",
      role: null,
      firstname: " ",
    });
  };

  protectedView = () => {
    return this.state.sessionToken === localStorage.getItem("sessionToken") ? (
      <Homepage
        sessionToken={this.state.sessionToken}
        firstname={this.state.firstname}
      />
    ) : (
      <AuthIndex updateToken={this.updateToken} />
    );
  };

  render() {
    return (
      <div>
        <React.Fragment>
          <Router>
            <Sitebar
              sessionToken={this.state.sessionToken}
              clearToken={this.clearToken}
              role={this.state.role}
            />

            <Switch>
              <Route exact path="/">
                {this.protectedView()}
              </Route>
              <Route exact path="/bookinfo">
                <BookInfoIndex sessionToken={this.state.sessionToken} />
              </Route>
              <Route exact path="/myreviews">
                <MyReviewIndex sessionToken={this.state.sessionToken} />
              </Route>
              <Route exact path="/myreadinglist">
                <MyReadingListIndex sessionToken={this.state.sessionToken} />
              </Route>
              <Route exact path="/allusers">
                <AllUsersIndex sessionToken={this.state.sessionToken} />
              </Route>
            </Switch>
          </Router>
        </React.Fragment>
      </div>
    );
  }
}

export default Mainpage;
