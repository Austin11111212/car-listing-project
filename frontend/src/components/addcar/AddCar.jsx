import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import "./AddCar.css"; // Ensure this file exists with styling

function AddCar() {
  const [carData, setCarData] = useState({
    make: "",
    model: "",
    year: "",
    pictures: "",
    price: "",
    mileage: "",
    description: "",
    condition: "Used",
    transmission: "Automatic",
    fuelType: "Gasoline",
    color: "",
  });

  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const apiUrl = import.meta.env.VITE_API_URL


  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form fields (basic check)
    if (!carData.make || !carData.model || !carData.year || !carData.price) {
      alert("Please fill in all required fields.");
      return;
    }

    // Process picture URLs as an array (if provided)
    const pictures = carData.pictures
      .split(",")
      .map((url) => url.trim())
      .filter((url) => url); // Remove any empty strings

    // Form data to submit
    const formData = { ...carData, pictures };

    try {
      const response = await fetch(`${apiUrl}/api/auth/login/api/cars`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Success:", data);

      alert("Car added successfully!");
      navigate("/listing"); // Redirect to listings page
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to add car. Please try again.");
    }
  };

  return (
    <div className="container-fluid add-car-form-container">
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8">
          <h2 className="form-title text-center mb-4">Add New Car</h2>

          {/* Back to Listings Button */}
          <div className="d-flex justify-content-end mb-3">
            <Button
              variant="secondary"
              onClick={() => navigate("/listing")}
              className="back-to-listings-btn"
            >
              Back to Listings
            </Button>
          </div>

          {/* Form */}
          <Form onSubmit={handleSubmit} className="add-car-form">
            <Form.Group className="mb-3" controlId="formCarMake">
              <Form.Label>Car Make</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter car make"
                name="make"
                value={carData.make}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formCarModel">
              <Form.Label>Car Model</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter car model"
                name="model"
                value={carData.model}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formCarYear">
              <Form.Label>Car Year</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter car year"
                name="year"
                value={carData.year}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formCarPictures">
              <Form.Label>Car Pictures (URLs, separated by commas)</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter car picture URLs"
                name="pictures"
                value={carData.pictures}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formCarPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter car price"
                name="price"
                value={carData.price}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formCarMileage">
              <Form.Label>Mileage</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter car mileage"
                name="mileage"
                value={carData.mileage}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formCarDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter car description"
                name="description"
                value={carData.description}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formCarCondition">
              <Form.Label>Condition</Form.Label>
              <Form.Control
                as="select"
                name="condition"
                value={carData.condition}
                onChange={handleChange}
              >
                <option value="Used">Used</option>
                <option value="New">New</option>
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formCarTransmission">
              <Form.Label>Transmission</Form.Label>
              <Form.Control
                as="select"
                name="transmission"
                value={carData.transmission}
                onChange={handleChange}
              >
                <option value="Automatic">Automatic</option>
                <option value="Manual">Manual</option>
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formCarFuelType">
              <Form.Label>Fuel Type</Form.Label>
              <Form.Control
                as="select"
                name="fuelType"
                value={carData.fuelType}
                onChange={handleChange}
              >
                <option value="Gasoline">Gasoline</option>
                <option value="Diesel">Diesel</option>
                <option value="Electric">Electric</option>
                <option value="Hybrid">Hybrid</option>
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formCarColor">
              <Form.Label>Color</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter car color"
                name="color"
                value={carData.color}
                onChange={handleChange}
              />
            </Form.Group>

            {/* Submit Button */}
            <div className="d-flex justify-content-center">
              <Button variant="primary" type="submit" className="submit-btn">
                Submit
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default AddCar;
