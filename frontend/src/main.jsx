import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css'; // Make sure to include your CSS file for default styles
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './components/contexts/ThemeContext.jsx'; // Import your ThemeProvider from context

// Create a root element and render the application
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      {/* Wrap your app with ThemeProvider to provide theme context */}
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
