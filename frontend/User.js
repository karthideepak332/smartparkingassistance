import React, { useState } from 'react';
import { FaUser, FaCog, FaPlus, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

const User = () => {
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [isLogin, setIsLogin] = useState(false); // Toggle between login and register form
    const [cards] = useState([
        { id: '1', content: 'Parking Slot 1' },
        { id: '2', content: 'Parking Slot 2' },
        { id: '3', content: 'Nearby Slot Finder' },
        { id: '4', content: 'Time to Reach Slot' }
    ]);

    // Toggle modal visibility
    const toggleModal = () => {
        setShowModal(!showModal);
    };

    // Toggle between Login and Register
    const toggleForm = () => {
        setIsLogin(!isLogin);
    };

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data Submitted:", formData);
        setShowModal(false); // Close modal after submission
    };

    return (
        <div style={{ display: 'flex', height: '100vh', fontFamily: 'Arial, sans-serif' }}>
            {/* Sidebar with Icons */}
            <div
                style={{
                    width: '250px',
                    backgroundColor: '#007BFF',
                    color: 'white',
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                }}
            >
                <div>
                    <h2>User Menu</h2>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        <li style={navItemStyle}>
                            <FaUser style={iconStyle} /> Profile
                        </li>
                        <li style={navItemStyle}>
                            <FaCog style={iconStyle} /> Settings
                        </li>
                        <li style={navItemStyle}>
                            <FaPlus style={iconStyle} /> Add Slots
                        </li>
                        <li style={navItemStyle}>
                            <FaMapMarkerAlt style={iconStyle} /> Nearby Slots
                        </li>
                        <li style={navItemStyle}>
                            <FaClock style={iconStyle} /> Time to Reach
                        </li>
                    </ul>
                </div>
            </div>

            {/* Main Content */}
            <div style={{ flex: 1, padding: '20px' }}>
                <h1>Welcome, User!</h1>
                <p>Manage your parking experience with ease.</p>

                {/* Register/Login Button */}
                <button
                    onClick={toggleModal}
                    style={{
                        padding: '10px',
                        backgroundColor: '#007BFF',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        marginBottom: '20px'
                    }}
                >
                    {isLogin ? 'Login' : 'Register'}
                </button>

                {/* Cards */}
                <div
                    style={{
                        display: 'flex',
                        gap: '20px',
                        flexWrap: 'wrap'
                    }}
                >
                    {cards.map((card) => (
                        <div key={card.id} style={cardStyle}>
                            <p>{card.content}</p>
                            <button style={buttonStyle}>Option</button>
                        </div>
                    ))}
                </div>

                {/* Modal */}
                {showModal && (
                    <div style={overlayStyle}>
                        <div style={modalStyle}>
                            <h2>{isLogin ? 'Login' : 'Register'}</h2>
                            <form onSubmit={handleSubmit}>
                                {!isLogin && (
                                    <label>
                                        Name:
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            style={inputStyle}
                                        />
                                    </label>
                                )}
                                <label>
                                    Email:
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        style={inputStyle}
                                    />
                                </label>
                                <label>
                                    Password:
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        style={inputStyle}
                                    />
                                </label>
                                <div style={{ marginTop: '15px' }}>
                                    <button type="submit" style={buttonStyle}>Submit</button>
                                    <button
                                        type="button"
                                        onClick={toggleModal}
                                        style={{ ...buttonStyle, backgroundColor: '#DC3545' }}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                            <div style={{ marginTop: '10px' }}>
                                <button onClick={toggleForm} style={buttonStyle}>
                                    {isLogin ? 'Create an Account' : 'Already have an account? Login'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

// Styles
const navItemStyle = {
    padding: '10px 0',
    borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center'
};

const iconStyle = {
    marginRight: '10px',
    fontSize: '20px'
};

const cardStyle = {
    backgroundColor: '#f9f9f9',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    width: '200px'
};

const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000
};

const modalStyle = {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    width: '300px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    textAlign: 'center'
};

const inputStyle = {
    display: 'block',
    width: '100%',
    padding: '8px',
    margin: '10px 0',
    borderRadius: '4px',
    border: '1px solid #ddd'
};

const buttonStyle = {
    padding: '10px',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    margin: '5px'
};

export default User;
