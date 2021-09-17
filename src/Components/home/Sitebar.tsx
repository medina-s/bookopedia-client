import React from 'react';
import { Navbar, NavbarBrand, Nav, NavItem } from 'reactstrap';
import { Link } from 'react-router-dom';

const Sitebar: React.FunctionComponent = () => {
    return (
      <Navbar color="dark" dark expand="md">
      <NavbarBrand href="/">
        Home
      </NavbarBrand>
      <Nav className="ml-auto">
          <NavItem>
              <Link to="/bookinfo" className="site-link">Book Information</Link>
          </NavItem>
          <NavItem>
              <Link to="/myreviews" className="site-link">My Reviews</Link>
          </NavItem>
          <NavItem>
              <Link to="/myreadinglist" className="site-link">My Reading List</Link>
          </NavItem>
      </Nav>
  </Navbar>
    );
  }

export default Sitebar;
