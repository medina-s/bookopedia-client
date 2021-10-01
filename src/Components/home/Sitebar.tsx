import React from "react";
import { Collapse, NavbarToggler, Navbar, NavbarBrand, Nav, NavItem } from "reactstrap";
import { Link } from "react-router-dom";

type AuthIndexProps = {
  sessionToken: string | null;
  clearToken: () => void;
  role: string | null;
};

type AuthIndexState = {
  collapsed: boolean
}
class Sitebar extends React.Component<AuthIndexProps, AuthIndexState> {
  constructor(props: AuthIndexProps) {
    super(props);
    this.state = {
      collapsed: true,
    };
    this.toggleNavBar = this.toggleNavBar.bind(this);
  }

  toggleNavBar(){
    this.setState({collapsed: !this.state.collapsed})
  }

  render() {
    let protectedView;
    let adminview;
    if (this.props.sessionToken === localStorage.getItem("sessionToken")) {
      protectedView = true;
      if (this.props.role === "admin") {
        adminview = true;
      } else {
        adminview = false;
      }
    } else {
      protectedView = false;
    }

    return (
      <div >
        {protectedView ? (
          <Navbar color="dark" dark expand="sm md">
            <NavbarBrand style={{color: '#fc766aff'}} href="/">Home</NavbarBrand>
            <NavbarToggler onClick={this.toggleNavBar} className="mr-2" />
        <Collapse isOpen={!this.state.collapsed} navbar>
            <Nav navbar className="ml-auto">
              <NavItem>
                <Link to="/bookinfo" className="site-link">
                  Book Information
                </Link>
              </NavItem>

              <NavItem>
                <Link to="/myreviews" className="site-link">
                  My Reviews
                </Link>
              </NavItem>
              <NavItem>
                <Link to="/myreadinglist" className="site-link">
                  My Reading List
                </Link>
              </NavItem>
              {adminview ? (
                <NavItem>
                  <Link to="/allusers" className="site-link">
                    All Users
                  </Link>
                </NavItem>
              ) : (
                <></>
              )}
              <NavItem >
                <Link style={{color: '#fc766aff'}} to="#" className="site-link" onClick={this.props.clearToken}>Logout</Link>
              </NavItem>
            </Nav>
            </Collapse>
          </Navbar>
        ) : (
          <Navbar color="dark" dark expand="md">
            <NavbarBrand href="/">Home</NavbarBrand>
            
            <Nav navbar className="ml-auto">
              <NavItem>
                <Link to="/bookinfo" className="site-link">
                  Book Information
                </Link>
              </NavItem>
            </Nav>
          </Navbar>
        )}
      </div>
    );
  }
}

export default Sitebar;
