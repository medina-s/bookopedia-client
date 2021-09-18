import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { MainpageState } from '../../Mainpage'

type AuthIndexProps = {
  sessionToken: string | null;
  clearToken(): void
}


class Sitebar extends React.Component<AuthIndexProps, {}>{
  
  render(){
    let protectedView ;
    if(this.props.sessionToken === localStorage.getItem('token')){
      protectedView = true
    }else{
      protectedView = false
    }
    
    return (
      <div>
      {protectedView ? (
        <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/">
          Home
        </NavbarBrand>
        <Nav className="ml-auto">
            <NavItem>
                <Link to="/bookinfo" className="site-link">Book Information</Link>
            </NavItem>
            
              <NavItem><Link to="/myreviews" className="site-link">My Reviews</Link></NavItem>
          <NavItem>
              <Link to="/myreadinglist" className="site-link">My Reading List</Link>
          </NavItem>
          <NavItem>
              <Button onClick={this.props.clearToken}>Logout</Button>
          </NavItem>
            
        </Nav>
    </Navbar>
      ) : (
        <Navbar color="dark" dark expand="md">
      <NavbarBrand href="/">
        Home
      </NavbarBrand>
      <Nav className="ml-auto">
          <NavItem>
              <Link to="/bookinfo" className="site-link">Book Information</Link>
          </NavItem>

      </Nav>
  </Navbar>
  
      )}
      </div>
   
    );
}
}
  

export default Sitebar;
