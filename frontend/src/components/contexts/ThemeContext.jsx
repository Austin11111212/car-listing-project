import React, { createContext, useContext, useState, useEffect } from 'react';
// import { FaSun, FaMoon } from 'react-icons/fa'; // Import icons

// Create the ThemeContext
const ThemeContext = createContext();

// ThemeProvider component to wrap your app
export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark');
      const style = document.createElement('style');
      style.innerHTML = `
        /* Dark Mode Styles */
        body.dark {
          background-color: #121212;
          color: white;
        }
        .dark .container {
          background-color: #181818;
          color: white;
        }
        .dark .navbar {
          background-color: #333;
        }
        .dark .btn-primary {
          background-color: #444;
          border-color: #444;
        }
      `;
      document.head.appendChild(style);
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    const savedTheme = localStorage.getItem('isDarkMode');
    if (savedTheme === 'true') {
      setIsDarkMode(true);
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem('isDarkMode', newMode);
      return newMode;
    });
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to access the theme context
export const useTheme = () => useContext(ThemeContext);
