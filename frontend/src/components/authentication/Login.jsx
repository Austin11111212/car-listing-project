import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Importing eye icons
import Spinner from "react-bootstrap/Spinner";

function Login() {
  // styles for the eye icon
  const styles = {
    eyeIcon: {
      position: "absolute",
      right: "10px",
      top: "70%",
      transform: "translateY(-50%)",
      cursor: "pointer",
      fontSize: "20px", // You can adjust the size of the icon
    },
    spinnerContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  };

  const navigate = useNavigate();

  // form data state
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [processing, setProcessing] = useState(false); // to manage spinner state
  const [isLoggedIn, setIsLoggedIn] = useState(false); // track login state
  const [username, setUsername] = useState(""); // track username for greeting

  // Check if the user is already logged in by checking localStorage for token
 

  // toggle password visibility
  const toggleShow = () => {
    setShow(!show);
  };

  // handle form data change
  const handleFormDataChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // handle clear input fields
  const handleClearInput = () => {
    setFormData({
      email: "",
      password: "",
    });
  };

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true); // Show the spinner when the form is submitted

    try {
      const response = await fetch("http://localhost:5001/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setProcessing(false); // Hide the spinner after receiving the response
        // save token and username to local storage
 
     
        localStorage.setItem("token", data.authToken);
        localStorage.setItem("userName", data.user.userName); // Assuming the response contains user info
        setIsLoggedIn(true); // Set login state to true
        // setUsername(data.user.username); // Set username for greeting

        console.log(data);
        alert("Login successful");
        handleClearInput();

        // navigate to listing page after successful login
        navigate("/listing");
      }
    } catch (error) {
      console.error(error);
      setProcessing(false); // Hide the spinner in case of error
    }

  };

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   const user = localStorage.getItem("user");
  //   console.log("stored  ", user);
  //   if (token) {
  //     setIsLoggedIn(true); // Set login state to true if token exists
  //     // setUsername(storedUsername); // Set username for greeting
  //   }
  // }, []);

  // handle logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from local storage
    localStorage.removeItem("username"); // Remove username from local storage
    setIsLoggedIn(false); // Set login state to false
    setUsername(""); // Clear username
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="container my-5">
      <h1 className="mb-5 text-danger">Welcome! Login</h1>

      {/* Greeting message
      {isLoggedIn && username && (
      //   // <h2>Hello, Welcome {username}!</h2> */}
   

      <Form onSubmit={handleSubmit}>
        {/* Email Address */}
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleFormDataChange}
            disabled={processing || isLoggedIn} // Disable input if logged in
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        {/* Password */}
        <Form.Group className="mb-3" controlId="password" style={{ position: "relative" }}>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type={show ? "text" : "password"}
            placeholder="Password"
            value={formData.password}
            onChange={handleFormDataChange}
            disabled={processing || isLoggedIn} // Disable input if logged in
          />
          <div style={styles.eyeIcon} onClick={toggleShow}>
            {/* Eye icon to show/hide password */}
            {show ? <FaEyeSlash /> : <FaEye />}
          </div>
        </Form.Group>

        {/* Remember Me */}
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Remember me" disabled={processing || isLoggedIn} />
        </Form.Group>

        {/* Spinner and Submit/Logout Button */}
        <div style={styles.spinnerContainer}>
          {processing ? (
            <Spinner animation="border" variant="primary" />
          ) : isLoggedIn ? (
            <Button variant="danger" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <Button variant="primary" type="submit" disabled={processing}>
              Login
            </Button>
          )}
        </div>
      </Form>
    </div>
  );
}

export default Login;
