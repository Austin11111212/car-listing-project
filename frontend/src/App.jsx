import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

// Components
import Footer from "./components/footer/Footer";
import Navigationbar from "./components/header/Navigationbar";
import Home from "./components/home/Home";
import About from "./components/about/About";
import Listing from "./components/listing/Listing";
import Blog from "./components/blog/Blog";
import Contact from "./components/contact/Contact";
import AddCar from "./components/addcar/AddCar";
import PageNotFound from "./components/notfound/PageNotFound";
import Login from "./components/authentication/Login";
import Register from "./components/authentication/Register";
import CarDetails from "./components/cardetails/CarDetails"; // Assuming CarDetails exists
import "bootstrap/dist/css/bootstrap.min.css";

// Theme Context
import { useTheme } from "./components/contexts/ThemeContext";

const App = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [authToken, setAuthToken] = useState(null); // Reserved for authentication
  const [loginUser, setLoginUser] = useState(null); // Reserved for tracking user login state

  // Apply dark mode class to the body on theme toggle
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  return (
    <div className={isDarkMode ? "dark-mode" : ""}>
      {/* Navigation Bar */}
      <Navigationbar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />

      {/* App Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/listing" element={<Listing />} />
        <Route path="/add-car" element={<AddCar />} />
        <Route path="/car-details/:id" element={<CarDetails />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
