import React from 'react';
import { MainpageState } from '../../Mainpage'
import Login from './Login';
import Register from './Register';

type AuthIndexProps = {
  updateToken(props: MainpageState): void
}

class AuthIndex extends React.Component<AuthIndexProps, {}>{
  render()  {
    return (
      <div className="AuthIndex">
      Hello Bookopedia AuthIndex!
      <Register updateToken={this.props.updateToken}/>
      <hr />
      <Login updateToken={this.props.updateToken}/>
  </div>
  );
  }
  
  }

export default AuthIndex;
