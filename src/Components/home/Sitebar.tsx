import React from "react";
import { Navbar, NavbarBrand, Nav, NavItem, Button } from "reactstrap";
import { Link } from "react-router-dom";

type AuthIndexProps = {
  sessionToken: string | null;
  clearToken: () => void;
  role: string | null;
};

class Sitebar extends React.Component<AuthIndexProps, {}> {
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
      <div>
        {protectedView ? (
          <Navbar color="dark" dark expand="md">
            <NavbarBrand href="/">Home</NavbarBrand>
            <Nav className="ml-auto">
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
              <NavItem>
                <Button onClick={this.props.clearToken}>Logout</Button>
              </NavItem>
            </Nav>
          </Navbar>
        ) : (
          <Navbar color="dark" dark expand="md">
            <NavbarBrand href="/">Home</NavbarBrand>
            <Nav className="ml-auto">
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
