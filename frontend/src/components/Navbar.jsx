import React from "react";
import {
  Navbar as BootstrapNavbar,
  Container,
  Nav,
  NavDropdown,
} from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { connect } from "react-redux";
import { logout } from "../redux/actions/auth";

const Navbar = ({ isAuthenticated, logout }) => {
  const { pathname } = useLocation();
  return (
    <BootstrapNavbar bg="primary" expand="lg" variant="dark">
      <Container>
        <BootstrapNavbar.Brand as={Link} to="/">
          <img
            src={logo}
            alt="Logo"
            className="img-fluid me-3"
            style={{ height: "30px" }}
          />
          Lead Manager
        </BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" active={pathname === "/"}>
              Home
            </Nav.Link>
            {isAuthenticated ? (
              <>
                <NavDropdown
                  title={
                    pathname.startsWith("/dashboard/lead")
                      ? "Lead"
                      : pathname.startsWith("/dashboard/developer")
                      ? "Developer"
                      : "Dashboard"
                  }
                  id="basic-nav-dropdown"
                  active={pathname.startsWith("/dashboard/")}
                >
                  <NavDropdown.Item as={Link} to="/dashboard/lead">
                    Lead
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/dashboard/developer">
                    Developer
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" active={pathname === "/login"}>
                  Login
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/signup"
                  active={pathname === "/signup"}
                >
                  SignUp
                </Nav.Link>
              </>
            )}
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { logout })(Navbar);
