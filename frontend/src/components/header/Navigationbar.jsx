import { useTheme } from "../contexts/ThemeContext"; // Import the custom hook
import { FaSun, FaMoon } from "react-icons/fa"; // Import icons for light and dark mode
// import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirecting
import { useState } from "react";

function Navigationbar() {
  const { isDarkMode, toggleTheme } = useTheme(); // Get theme context and toggle function
  const navigate = useNavigate(); // Initialize the navigate function

  // Check if the user is logged in (token in localStorage)
  const isLoggedIn = localStorage.getItem("token") !== null;
  const userName = localStorage.getItem("userName"); // Retrieve the user's name from localStorage
  // console.log("user1  ", userName);
  // console.log("log ", isLoggedIn);

  // Handle user logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove the authentication token from localStorage
    localStorage.removeItem("userName"); // Optionally remove the user's name from localStorage
    navigate("/login"); // Redirect the user to the login page
  };

  return (
    <Navbar
      expand="lg"
      className={`bg-body-tertiary ${isDarkMode ? "bg-dark" : "bg-primary"}`}
      data-bs-theme={isDarkMode ? "dark" : "light"}
      style={{
        transition: 'background-color 0.3s ease, color 0.3s ease', // Smooth transition for color changes
      }}
    >
      <Container fluid>
        <Navbar.Brand href="#">CarBay ✅</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
            <Nav.Link href="/blog">Blog</Nav.Link>
            <Nav.Link href="/contact">Contact</Nav.Link>
            <Nav.Link href="/listing">Cars</Nav.Link>

            <NavDropdown title="More" id="navbarScrollingDropdown">
              <NavDropdown.Item href="/add-car">Add Car</NavDropdown.Item>
              <NavDropdown.Item href="#action4">My Favorite</NavDropdown.Item>
              <NavDropdown.Divider />

              {/* Conditionally render Login and Logout */}
              {!isLoggedIn ? (
                <>
                  <NavDropdown.Item href="/register">Register</NavDropdown.Item>
                  <NavDropdown.Item href="/login">Log In</NavDropdown.Item>
                </>
              ) : (
                <NavDropdown.Item onClick={handleLogout}>Log Out</NavDropdown.Item>
              )}
            </NavDropdown>
          </Nav>

          {/* Search Bar */}
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            {/* <Button variant="outline-success">Search</Button> */}
          </Form>
          
              
            {/* Display Greeting if User is Logged In */}
            {isLoggedIn && userName && (
              <div className="mx-3 text-light">
                             <p style={{ color: isDarkMode ? 'white' : 'black' }}>
                  Hello, {userName}!
                </p>
              </div>
            )}


          {/* Theme Toggle Button with icons */}
          {/* <Button
            variant="outline-light"
            onClick={toggleTheme}
            className="ms-3 d-flex align-items-center"
            style={{
              border: "none",
              background: "transparent",
              cursor: "pointer",
              fontSize: "20px",
              color: isDarkMode ? 'white' : 'black', // Dynamically change color
              transition: 'color 0.3s ease',
            }}
          >
            {isDarkMode ? (
              <FaSun size={24} color="yellow" /> // Sun icon for light mode
            ) : (
              <FaMoon size={24} color="white" /> // Moon icon for dark mode
            )}
          </Button> */}

        </Navbar.Collapse>

      </Container>

    </Navbar>
  );
}

export default Navigationbar;
