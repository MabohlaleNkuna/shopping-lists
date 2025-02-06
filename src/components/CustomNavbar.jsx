import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../store/slices/userSlice";
import { Navbar, Nav, Container } from 'react-bootstrap';

const CustomNavbar = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  return (
    <Navbar bg="primary" variant="dark" expand="lg" fixed="top">
      <Container>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            {isAuthenticated ? (
              <>
                <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
                <Nav.Link as={Link} to="/products">Products</Nav.Link>
                <Nav.Link onClick={handleLogout} style={{ cursor: "pointer" }}>Logout</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/register">Register</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
