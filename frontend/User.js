import React, { useState } from 'react';

const User = () => {
  // Example data for the parking slots
  const [slots, setSlots] = useState([
    { id: 1, name: 'Slot A', location: 'Downtown', available: true },
    { id: 2, name: 'Slot B', location: 'Uptown', available: false },
    { id: 3, name: 'Slot C', location: 'City Center', available: true },
  ]);
  const [searchQuery, setSearchQuery] = useState('');

  // Add a new slot
  const addNewSlot = () => {
    const newSlot = {
      id: slots.length + 1,
      name: `Slot ${String.fromCharCode(65 + slots.length)}`, // Slot A, Slot B, etc.
      location: 'New Location',
      available: true,
    };
    setSlots([...slots, newSlot]);
  };

  // Remove the last slot
  const removeLastSlot = () => {
    if (slots.length > 0) {
      const updatedSlots = [...slots];
      updatedSlots.pop();
      setSlots(updatedSlots);
    }
  };

  // Update slot name
  const handleTitleChange = (e, slotId) => {
    const updatedSlots = slots.map((slot) =>
      slot.id === slotId ? { ...slot, name: e.target.value } : slot
    );
    setSlots(updatedSlots);
  };

  // Filter slots based on search query
  const filteredSlots = slots.filter((slot) =>
    slot.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={containerStyle}>
      {/* Main Content */}
      <div style={contentStyle}>
        <h1>Welcome, User!</h1>
        <p>Manage your parking experience with ease.</p>

        {/* Search Bar */}
        <div style={searchContainerStyle}>
          <input
            type="text"
            placeholder="Search Parking Slots"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={searchInputStyle}
          />
        </div>

        {/* Parking Slot Cards Section */}
        <h2>Available Parking Slots</h2>
        <div style={cardsContainerStyle}>
          {filteredSlots.map((slot) => (
            <div key={slot.id} style={cardStyle}>
              {/* Editable Title */}
              <input
                type="text"
                value={slot.name}
                onChange={(e) => handleTitleChange(e, slot.id)}
                style={cardTitleStyle}
              />
              <p>{slot.location}</p>
              <p style={{ color: slot.available ? 'green' : 'red' }}>
                {slot.available ? 'Available' : 'Occupied'}
              </p>
              <button
                style={cardButtonStyle}
                disabled={!slot.available}
              >
                {slot.available ? 'Book Slot' : 'Slot Occupied'}
              </button>
            </div>
          ))}

          {/* Add and Remove Slot Buttons */}
          <div style={cardStyle}>
            <button onClick={addNewSlot} style={fabStyle}>Add Slot</button>
            <button onClick={removeLastSlot} style={fabStyle}>Remove Slot</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Styles
const containerStyle = {
  fontFamily: 'Arial, sans-serif',
};

const contentStyle = {
  padding: '20px',
};

const searchContainerStyle = {
  marginBottom: '20px',
};

const searchInputStyle = {
  width: '100%',
  padding: '10px',
  borderRadius: '5px',
  border: '1px solid #ccc',
  fontSize: '16px',
};

const cardsContainerStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '20px',
  marginBottom: '20px',
};

const cardStyle = {
  width: '200px',
  padding: '15px',
  borderRadius: '8px',
  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  backgroundColor: '#fff',
  textAlign: 'center',
  transition: 'transform 0.3s ease',
  cursor: 'pointer',
};

const cardTitleStyle = {
  fontSize: '18px',
  fontWeight: 'bold',
  border: 'none',
  borderBottom: '1px solid #ddd',
  backgroundColor: 'transparent',
  textAlign: 'center',
  marginBottom: '10px',
  width: '100%',
  padding: '5px 0',
};

const cardButtonStyle = {
  padding: '8px 16px',
  backgroundColor: '#007BFF',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  marginTop: '10px',
  transition: 'background-color 0.3s',
  width: '100%',
};

cardButtonStyle[':hover'] = {
  backgroundColor: '#0056b3',
};

// Floating Action Button Styles (FAB) for Add and Remove
const fabStyle = {
  position: 'relative',
  backgroundColor: '#007BFF',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  width: '100%',
  height: '40px',
  fontSize: '16px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
  transition: 'background-color 0.3s ease',
  margin: '10px 0',
};

fabStyle[':hover'] = {
  backgroundColor: '#0056b3',
};

export default User;
