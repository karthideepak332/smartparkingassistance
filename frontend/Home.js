import React from 'react';

const Home = () => {
  return (
    <div style={containerStyle}>
      <header style={headerStyle}>
        <h1>Welcome to Parking Assistance</h1>
        <p>Your ultimate parking solution at your fingertips!</p>
      </header>

      <section style={sectionStyle}>
        <h2>Concept</h2>
        <p>
          Parking Assistance is a modern application designed to make parking easier and stress-free. Our app provides real-time updates on available parking slots, nearby parking spaces, and the time it takes to reach them. It also helps in managing your parking slots efficiently, allowing you to reserve spaces when needed.
        </p>
      </section>

      <section style={sectionStyle}>
        <h2>Advantages</h2>
        <ul style={listStyle}>
          <li><strong>Real-Time Parking Updates:</strong> Get live data on available parking spots near you.</li>
          <li><strong>Seamless Slot Management:</strong> Reserve and manage your parking slots from anywhere, at any time.</li>
          <li><strong>Nearby Slot Finder:</strong> Find available parking spaces nearby with just a tap.</li>
          <li><strong>Time to Reach:</strong> Get the estimated time it will take to reach a parking spot based on your current location.</li>
          <li><strong>User-Friendly Interface:</strong> A simple and easy-to-navigate interface to manage parking slots and reservations.</li>
        </ul>
      </section>

      <section style={sectionStyle}>
        <h2>How to Use This Application</h2>
        <ol style={listStyle}>
          <li><strong>Step 1:</strong> Sign up or log in to your account.</li>
          <li><strong>Step 2:</strong> Check for available parking spots near you.</li>
          <li><strong>Step 3:</strong> Reserve your parking spot or view the time it takes to reach a nearby slot.</li>
          <li><strong>Step 4:</strong> Use the app to manage your parking reservations or add new slots for others to use.</li>
        </ol>
      </section>

      <footer style={footerStyle}>
        {/* Copyright removed */}
      </footer>
    </div>
  );
};

// Styles
const containerStyle = {
  fontFamily: 'Arial, sans-serif',
  margin: '0',
  padding: '0',
  boxSizing: 'border-box',
};

const headerStyle = {
  backgroundColor: '#007BFF',
  color: 'white',
  padding: '40px 20px',
  textAlign: 'center',
};

const sectionStyle = {
  padding: '20px',
  margin: '20px',
  backgroundColor: '#f9f9f9',
  borderRadius: '8px',
  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
};

const listStyle = {
  listStyleType: 'disc',
  paddingLeft: '20px',
};

const footerStyle = {
  backgroundColor: '#007BFF',
  color: 'white',
  textAlign: 'center',
  padding: '20px 0',
  position: 'fixed',
  width: '100%',
  bottom: 0,
};

export default Home;
