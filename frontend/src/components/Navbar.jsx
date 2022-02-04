import React from "react";
import { Navbar as BootstrapNavbar, Container, Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/images/logo.png";

const Navbar = () => {
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
            <Nav.Link as={Link} to="/login" active={pathname === "/login"}>
              Login
            </Nav.Link>
            <Nav.Link as={Link} to="/signup" active={pathname === "/signup"}>
              SignUp
            </Nav.Link>
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;
