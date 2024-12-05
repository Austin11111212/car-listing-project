import { useState } from "react";

const ImageGallery = () => {
    const imgUrls = [
        "https://ng.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/87/6363651/2.jpg?0570",
        "https://ng.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/87/6363651/3.jpg?8258",
        "https://ng.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/87/6363651/4.jpg?8258",
        "https://ng.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/87/6363651/5.jpg?8258",
        "https://ng.jumia.is/unsafe/fit-in/680x680/filters:fill(white)/product/87/6363651/6.jpg?8258",
    ];

    // State for the currently selected image URL
    const [selectedImage, setSelectedImage] = useState(imgUrls[0]);

    // Function to handle image click
    const handleImageClick = (index) => {
        setSelectedImage(imgUrls[index]);  // Update the selected image based on the clicked index
    };

    const styles = {
        img: {
            width: '100px',
            height: '100px',
            margin: '10px',
            objectFit: 'cover',
            cursor: 'pointer',  // Add a pointer cursor for better UX
        },
        mainImg: {
            width: '400px',
            height: '400px',
            marginBottom: '20px',
            objectFit: 'cover',
            display: 'block',
            margin: '0 auto',  // Center the main image
        },
        imgContainer: {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
        },
        galleryContainer: {
            textAlign: 'center',
            padding: '20px',
        }
    };

    return (
        <div style={styles.galleryContainer}>
            <h2>Image Gallery</h2>

            {/* Main image */}
            <img src={selectedImage} alt="Selected" style={styles.mainImg} />

            {/* Thumbnail images */}
            <div style={styles.imgContainer}>
                {imgUrls.map((url, index) => (
                    <img 
                        key={index} 
                        src={url} 
                        alt={`Thumbnail ${index + 1}`} 
                        style={styles.img} 
                        onClick={() => handleImageClick(index)}  // Handle click to change the main image
                    />
                ))}
            </div>
        </div>
    );
};

export default ImageGallery;
