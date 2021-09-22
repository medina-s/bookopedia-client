import React from "react";

type HomepageProps = {
  sessionToken: string | null;
};

class Homepage extends React.Component<HomepageProps, {}> {
  render() {
    return (
      <div className="Homepage">
        Hello Bookopedia Homepage!
        {this.props.sessionToken}
      </div>
    );
  }
}

export default Homepage;
