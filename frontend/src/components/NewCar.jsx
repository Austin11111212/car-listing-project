import { useState, useEffect } from "react";
import './NewCar.css'; // Importing the CSS file

const NewCar = () => {
    const [cars, setCars] = useState([]);  // State for storing fetched cars
    const [loading, setLoading] = useState(false);  // State for loading indicator
    const [error, setError] = useState('');  // State for handling errors

    // Function to fetch cars from the backend API
    const fetchCar = async () => {
        setLoading(true);  // Start loading
        setError('');  // Reset any previous error

        const url = "http://localhost:5001/api/cars";

        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            console.log('Fetched cars:', data);
            setCars(data); // Update the cars state with the fetched data
        } catch (error) {
            console.error('Failed to fetch cars:', error.message);
            setError('Failed to load cars. Please try again later.');
        } finally {
            setLoading(false); // Stop loading
        }
    };

    // Fetch cars when the component mounts
    useEffect(() => {
        fetchCar();
    }, []);  // Empty dependency array to run only once when the component mounts

    return (
        <div>
            <h1 className="text-center mt-5">Cars List</h1>

            {/* Show loading indicator */}
            {loading && <p className="loading">Loading...</p>}

            {/* Show error message */}
            {error && <p className="error">{error}</p>}

            {/* Cars list */}
            <div className="car-list">
                {cars.length > 0 ? (
                    cars.map((car) => (
                        <div key={car._id} className="car-card">
                            <h2>{car.make} {car.model}</h2>
                            <p>{car.description || 'No description available.'}</p>
                            <p><strong>Price:</strong> ${car.price || 'Not specified'}</p>
                            <p><strong>Year:</strong> {car.year || 'Not specified'}</p>
                            <p><strong>Mileage:</strong> {car.mileage || 'Not specified'}</p>
                            <p><strong>Color:</strong> {car.color || 'Not specified'}</p>
                            <p><strong>Transmission:</strong> {car.transmission || 'Not specified'}</p>
                            <p><strong>Fuel Type:</strong> {car.fuelType || 'N/A'}</p>

                            {/* Image with a fallback */}
                            <img
                                src={car.pictures || 'https://via.placeholder.com/300x200?text=No+Image+Available'}
                                alt={`${car.make} ${car.model}`}
                                className="car-image"
                            />
                        </div>
                    ))
                ) : (
                    !loading && !error && <p>No cars available at the moment.</p>
                )}
            </div>
        </div>
    );
};

export default NewCar;
