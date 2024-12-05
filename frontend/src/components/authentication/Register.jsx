import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./Register.css";

function Register() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const toggleShow = () => {
    setShow(!show);
  };

  const handleFormDataChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const apiUrl = import.meta.env.VITE_API_URL

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await fetch(`${apiUrl}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.message || "Registration failed. Please try again.");
        return;
      }

      setSuccess("Registration successful! Redirecting to login...");
      setFormData({
        name: "",
        username: "",
        email: "",
        password: "",
      });

      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-5">
      <h1 className="mb-5 text-danger">New User Registration</h1>

      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Your Fullname</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter fullname"
            value={formData.name}
            onChange={handleFormDataChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={formData.username}
            onChange={handleFormDataChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleFormDataChange}
            required
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <div className="password-container">
            <Form.Control
              type={show ? "text" : "password"}
              placeholder="Password"
              value={formData.password}
              onChange={handleFormDataChange}
              required
            />
            <div className="password-eye" onClick={toggleShow}>
              {show ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
        </Form.Group>

        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </Button>
      </Form>
    </div>
  );
}

export default Register;
