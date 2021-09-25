import React from "react";
import Login from "./Login";
import Register from "./Register";

type AuthIndexProps = {
  updateToken: (newToken: string, role: string, firstname: string) => void;
};

class AuthIndex extends React.Component<AuthIndexProps, {}> {
  render() {
    return (
      <div className="AuthIndex">
        <Register updateToken={this.props.updateToken} />
        <hr />
        <Login updateToken={this.props.updateToken} />
      </div>
    );
  }
}

export default AuthIndex;
