import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";

function CarDetails() {
  const { id } = useParams(); // Extract the car ID from the URL
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    // Fetch car details from the API
    const fetchCarDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5001/api/cars/${id}`);
        if (!response.ok) {
          throw new Error("Car not found");
        }
        const data = await response.json();
        setCar(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCarDetails();
  }, [id]);

  if (loading) {
    return <div className="text-center mt-5">Loading car details...</div>;
  }

  if (error) {
    return (
      <div className="text-center mt-5 text-danger">
        <h3>Error</h3>
        <p>{error}</p>
      </div>
    );
  }

  if (!car) {
    return <div className="text-center mt-5">Car not found.</div>;
  }

  return (
    <div className="container mt-5">
      <h1>{`${car.make} ${car.model} (${car.year})`}</h1>
      <div className="row">
        {/* Car Image Section */}
        <div className="col-md-6">
          {car.pictures && car.pictures.length > 1 ? (
            <Carousel>
              {car.pictures.map((image, index) => (
                <Carousel.Item key={index}>
                  <img
                    className="d-block w-100"
                    src={image || "https://via.placeholder.com/300x200"}
                    alt={`${car.make} ${car.model}`}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          ) : (
            <img
              src={car.pictures[0] || "https://via.placeholder.com/300x200"}
              alt={`${car.make} ${car.model}`}
              className="img-fluid rounded"
            />
          )}
        </div>

        {/* Car Details Section */}
        <div className="col-md-6">
          <p>
            <strong>Price:</strong> {car.price}
          </p>
          <p>
            <strong>Description:</strong> {car.description}
          </p>
          <p>
            <strong>Mileage:</strong> {car.mileage}
          </p>
          <p>
            <strong>Color:</strong> {car.color}
          </p>
          <p>
            <strong>Transmission:</strong> {car.transmission}
          </p>
          <p>
            <strong>Fuel Type:</strong> {car.fuelType}
          </p>
        </div>
      </div>

      {/* Back Button */}
      <div className="mt-4">
        <button
          className="btn btn-secondary"
          onClick={() => navigate("/listing")} // Navigate back to the listings page
        >
          Back to Listing
        </button>
      </div>
    </div>
  );
}

export default CarDetails;
