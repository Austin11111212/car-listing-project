// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Button from "react-bootstrap/Button";
// import Card from "react-bootstrap/Card";
// import Carousel from "react-bootstrap/Carousel";

// function Listing() {
//   const [cars, setCars] = useState([]);
//   const navigate = useNavigate();

//   // Fetch cars from the API
//   useEffect(() => {
//     const fetchCars = async () => {
//       try {
//         const response = await fetch("http://localhost:5001/api/cars");
//         if (!response.ok) {
//           throw new Error("Failed to fetch car data");
//         }
//         const data = await response.json();
//         setCars(data); // Update state with the fetched cars
//       } catch (error) {
//         console.error("Error fetching cars:", error);
//       }
//     };

//     fetchCars();
//   }, []); // Runs only on initial render

//   // Handle View Details button
//   const handleViewDetails = (id) => {
//     navigate(`/car-details/${id}`); // Navigate to CarDetails page
//   };

//   return (
//     <div className="container mt-5">
//       <h1 className="text-center mb-4">Car Listings</h1>
//       <div className="row">
//         {cars.map((car) => (
//           <div key={car.id} className="col-12 col-sm-6 col-md-4 mb-4">
//             <Card className="h-100 shadow-sm">
//               {/* Display images using Carousel if multiple */}
//               {car.pictures && car.pictures.length > 1 ? (
//                 <Carousel>
//                   {car.pictures.map((image, index) => (
//                     <Carousel.Item key={`${car.id}-image-${index}`}>
//                       <img
//                         className="d-block w-100"
//                         src={image || "https://via.placeholder.com/150"}
//                         alt={`${car.make} ${car.model}`}
//                       />
//                     </Carousel.Item>
//                   ))}
//                 </Carousel>
//               ) : (
//                 <Card.Img
//                   variant="top"
//                   src={car.pictures[0] || "https://via.placeholder.com/150"}
//                   alt={`${car.make} ${car.model}`}
//                 />
//               )}
//               <Card.Body>
//                 <Card.Title>{`${car.make} ${car.model} (${car.year})`}</Card.Title>
//                 <Card.Text>
//                   <strong>Price:</strong> {car.price} <br />
//                   <strong>Description:</strong> {car.description}
//                 </Card.Text>
//                 <Button
//                   variant="primary"
//                   onClick={() => handleViewDetails(car.id)}
//                 >
//                   View Details
//                 </Button>
//               </Card.Body>
//             </Card>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Listing;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CarCard from "./CarCard";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Carousel from "react-bootstrap/Carousel";

const Listing = () => {
  const styles = {
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
      gap: "20px",
    },
  };

  // navigate to other pages
  const navigate = useNavigate();

  const apiUrl = import.meta.env.VITE_API_URL

  // state
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  // handle fetch cars from api
  const fetchCars = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/cars`);
      const data = await response.json();

      setCars(data);
      setLoading(false);

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  // handle open single car details
  const openCarDetails = (id) => {

    navigate(`/car-details/${id}`);
  };

  return (
    <div className="container mt-5">
      <h1>Welcome to Listing page</h1>

      {loading && <Spinner animation="border" variant="danger" />}

      <div style={styles.grid}>
        {cars.map((car) => (
          <CarCard
            key={car._id}
            carImg={car.pictures[0]}
            model={car.model}
            postedBy={car.postedBy}
            openFunc={() => openCarDetails(car._id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Listing;
