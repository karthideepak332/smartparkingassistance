import React, { useState, useEffect } from 'react';

const Admin = () => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [slots, setSlots] = useState([]);
    const [slotLat, setSlotLat] = useState('');
    const [slotLng, setSlotLng] = useState('');
    const [isPublic, setIsPublic] = useState(false);

    // Update time every second
    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    // Add slot details to the list
    const addSlot = () => {
        if (slotLat && slotLng) {
            setSlots([...slots, { latitude: slotLat, longitude: slotLng }]);
            setSlotLat('');
            setSlotLng('');
        } else {
            alert('Please enter both latitude and longitude for the slot.');
        }
    };

    // Enable location capture
    const enableLocation = () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setSlotLat(position.coords.latitude.toFixed(6));
                setSlotLng(position.coords.longitude.toFixed(6));
            },
            (error) => alert('Unable to retrieve location.')
        );
    };

    return (
        <div className="admin" style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1 style={{ textAlign: 'center' }}>Admin Page</h1>

            {/* Real-Time Date and Time */}
            <div style={{ textAlign: 'center', marginBottom: '20px', fontSize: '1.2em' }}>
                <strong>Current Date & Time:</strong> {currentTime.toLocaleString()}
            </div>

            {/* Form Section */}
            <div
                style={{
                    backgroundColor: '#f9f9f9',
                    padding: '20px',
                    borderRadius: '8px',
                    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px'
                }}
            >
                <h2>Parking Management Form</h2>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                    {/* Left Column: Company Details */}
                    <div style={{ flex: 1 }}>
                        <h3>Company Details</h3>
                        <label>Company Name:</label>
                        <input type="text" placeholder="Enter company name" style={inputStyle} />

                        <label>Door No:</label>
                        <input type="text" placeholder="Enter door no" style={inputStyle} />

                        <label>Address Line 1:</label>
                        <input type="text" placeholder="Enter address line 1" style={inputStyle} />

                        <label>Address Line 2:</label>
                        <input type="text" placeholder="Enter address line 2" style={inputStyle} />

                        <label>District:</label>
                        <input type="text" placeholder="Enter district" style={inputStyle} />

                        <label>State:</label>
                        <input type="text" placeholder="Enter state" style={inputStyle} />

                        <label>Country:</label>
                        <input type="text" placeholder="Enter country" style={inputStyle} />

                        <label>Mobile No:</label>
                        <input type="text" placeholder="Enter mobile number" style={inputStyle} />
                    </div>

                    {/* Right Column: Parking Details */}
                    <div style={{ flex: 1 }}>
                        <h3>Parking Area Details</h3>
                        <label>Parking Area Size:</label>
                        <input type="text" placeholder="Enter size (sq. meters)" style={inputStyle} />

                        <label>Number of Slots:</label>
                        <input type="number" placeholder="Enter total slots" style={inputStyle} />

                        <label>Public View:</label>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <input
                                type="checkbox"
                                checked={isPublic}
                                onChange={() => setIsPublic(!isPublic)}
                            />
                            <span>Allow public to view parking status</span>
                        </div>

                        <h3>Slot Details</h3>
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                            <input
                                type="text"
                                value={slotLat}
                                onChange={(e) => setSlotLat(e.target.value)}
                                placeholder="Latitude"
                                style={{ flex: 1, ...inputStyle }}
                            />
                            <input
                                type="text"
                                value={slotLng}
                                onChange={(e) => setSlotLng(e.target.value)}
                                placeholder="Longitude"
                                style={{ flex: 1, ...inputStyle }}
                            />
                            <button onClick={enableLocation} style={buttonStyle}>
                                Enable Location
                            </button>
                            <button onClick={addSlot} style={buttonStyle}>
                                + Add Slot
                            </button>
                        </div>

                        {/* Display added slots */}
                        <div style={{ marginTop: '10px' }}>
                            <strong>Added Slots:</strong>
                            <ul>
                                {slots.map((slot, index) => (
                                    <li key={index}>
                                        Lat: {slot.latitude}, Lng: {slot.longitude}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const inputStyle = {
    width: '100%',
    padding: '10px',
    margin: '5px 0',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxSizing: 'border-box'
};

const buttonStyle = {
    padding: '10px 15px',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
};

export default Admin;
