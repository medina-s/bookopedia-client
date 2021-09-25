import React from "react";

type HomepageProps = {
  sessionToken: string | null;
  firstname: string | null;
};

class Homepage extends React.Component<HomepageProps, {}> {
  render() {
    return <div className="Homepage">Welcome, {this.props.firstname}.</div>;
  }
}

export default Homepage;
