import React from 'react';

const Home = () => {
  return (
    <div style={containerStyle}>
      <header style={headerStyle}>
        <div style={textOverlayStyle}>
          <h1 style={headingStyle}>Welcome to Parking Assistance</h1>
          <p style={paragraphStyle}>Your ultimate parking solution at your fingertips!</p>
        </div>
      </header>
    </div>
  );
};

// Styles
const containerStyle = {
  fontFamily: 'Arial, sans-serif',
  margin: '0',
  padding: '0',
  boxSizing: 'border-box',
  height: '100vh', // Full viewport height
  backgroundColor: 'transparent', // Make the container background transparent
};

const headerStyle = {
  backgroundImage: 'url("/images/parking image1.jpg")', // Path from the public folder
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  color: 'white',
  textAlign: 'center',
  height: '100%', // Full height to cover the viewport
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
};

const textOverlayStyle = {
  zIndex: 1,
  textAlign: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0)', // Fully transparent background
  padding: '20px',
  borderRadius: '8px',
  position: 'absolute', // Absolute positioning to overlay text on the image
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)', // Centers the text vertically and horizontally
  width: '80%', // Optional: Control width of the overlay
  maxWidth: '600px', // Optional: Limit the maximum width of the overlay
};

const headingStyle = {
  color: 'white', // White color for heading to make it stand out on the image
  fontSize: '2.5rem', // You can adjust this size
  marginBottom: '10px', // Space between heading and paragraph
};

const paragraphStyle = {
  color: 'white', // White color for paragraph to maintain contrast
  fontSize: '1.2rem', // Adjust this size as per preference
};

export default Home;
