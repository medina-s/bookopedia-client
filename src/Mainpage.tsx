import React from "react";
import "./App.css";
import Homepage from "./Components/home/Homepage";
import Sitebar from "./Components/home/Sitebar";
import BookInfoIndex from "./Components/bookinfo/BookInfoIndex";
import MyReviewIndex from "./Components/review/MyReviewIndex";
import MyReadingListIndex from "./Components/readinglist/MyReadingListIndex";
import AuthIndex from "./Components/auth/AuthIndex";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export type MainpageState = {
  sessionToken: string | null;
  //newToken: string | null;
};

type MainpageProps = {};

class Mainpage extends React.Component<MainpageProps, MainpageState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      sessionToken: "",
      //newToken: "",
    };
    this.updateToken = this.updateToken.bind(this);
    //this.useEffect = this.useEffect.bind(this);
    this.clearToken = this.clearToken.bind(this);
  }

  componentDidMount() {
    if (localStorage.getItem("sessionToken")) {
      this.setState({
        sessionToken: localStorage.getItem("sessionToken"),
      });
    }
  }

  updateToken = (newToken: string) => {
    localStorage.setItem("sessionToken", newToken);
    this.setState({
      sessionToken: newToken,
    });
    //this.useEffect()
    console.log("UPDATE TOKEN!");
    console.log(this.state.sessionToken);
  };

  clearToken = () => {
    localStorage.clear();
    this.setState({
      sessionToken: " ",
      //newToken: " ",
    });
  };

  protectedView = () => {
    return this.state.sessionToken === localStorage.getItem("sessionToken") ? (
      <Homepage sessionToken={this.state.sessionToken} />
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
                <MyReadingListIndex sessionToken={this.state.sessionToken}/>
              </Route>
            </Switch>
          </Router>
        </React.Fragment>
      </div>
    );
  }
}

export default Mainpage;
