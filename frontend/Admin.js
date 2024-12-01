import React, { useState, useEffect } from 'react';

const Admin = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [slots, setSlots] = useState([]);
  const [slotLat, setSlotLat] = useState('');
  const [slotLng, setSlotLng] = useState('');
  const [isCompanyModalOpen, setCompanyModalOpen] = useState(false);
  const [isParkingModalOpen, setParkingModalOpen] = useState(false);
  const [companyDetails, setCompanyDetails] = useState({
    companyName: '',
    addressLine1: '',
    addressLine2: '',
    district: '',
    state: '',
    country: '',
    mobileNo: '',
  });
  const [parkingDetails, setParkingDetails] = useState({
    areaSize: '',
    numSlots: '',
  });
  const [errors, setErrors] = useState({
    companyDetails: {},
    parkingDetails: {},
  });

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCompanyChange = (e) => {
    const { name, value } = e.target;
    setCompanyDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleParkingChange = (e) => {
    const { name, value } = e.target;
    setParkingDetails((prev) => ({ ...prev, [name]: value }));
  };

  const validateCompanyDetails = () => {
    const errors = {};
    for (const [key, value] of Object.entries(companyDetails)) {
      if (!value) errors[key] = `${key} is required.`;
    }

    // Mobile number validation
    const phoneRegex = /^[0-9]{10}$/;
    if (companyDetails.mobileNo && !phoneRegex.test(companyDetails.mobileNo)) {
      errors.mobileNo = 'Mobile number must be a 10-digit number.';
    }

    setErrors((prev) => ({ ...prev, companyDetails: errors }));
    return Object.keys(errors).length === 0;
  };

  const validateParkingDetails = () => {
    const errors = {};
    if (!parkingDetails.areaSize) {
      errors.areaSize = 'Parking area size is required.';
    } else if (isNaN(parkingDetails.areaSize) || parkingDetails.areaSize <= 0) {
      errors.areaSize = 'Parking area size must be a positive number.';
    }
    if (!parkingDetails.numSlots) {
      errors.numSlots = 'Number of slots is required.';
    } else if (isNaN(parkingDetails.numSlots) || parkingDetails.numSlots <= 0) {
      errors.numSlots = 'Number of slots must be a positive integer.';
    }
    setErrors((prev) => ({ ...prev, parkingDetails: errors }));
    return Object.keys(errors).length === 0;
  };

  const handleCompanySubmit = (e) => {
    e.preventDefault();
    if (validateCompanyDetails()) {
      alert('Company details saved successfully!');
      saveToFile('companyDetails', companyDetails);
      setCompanyModalOpen(false);
    }
  };

  const handleParkingSubmit = (e) => {
    e.preventDefault();
    if (validateParkingDetails()) {
      alert('Parking details saved successfully!');
      saveToFile('parkingDetails', parkingDetails);
      setParkingModalOpen(false);
    }
  };

  const enableLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setSlotLat(position.coords.latitude.toFixed(6));
        setSlotLng(position.coords.longitude.toFixed(6));
      },
      (error) => alert('Unable to retrieve location.')
    );
  };

  const addSlot = () => {
    if (!slotLat || !slotLng) {
      alert('Please provide valid latitude and longitude.');
      return;
    }

    // Add the new slot to the slots array
    setSlots((prevSlots) => [
      ...prevSlots,
      { latitude: slotLat, longitude: slotLng },
    ]);

    // Clear the input fields after adding the slot
    setSlotLat('');
    setSlotLng('');
  };

  const saveToFile = (type, details) => {
    const data = JSON.stringify(details, null, 2);
    const blob = new Blob([data], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${type}.txt`;
    link.click();
  };

  return (
    <div className="admin" style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center' }}>Admin Page</h1>

      <div style={{ textAlign: 'center', marginBottom: '20px', fontSize: '1.2em' }}>
        <strong>Current Date & Time:</strong> {currentTime.toLocaleString()}
      </div>

      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '20px' }}>
        <button style={buttonStyle} onClick={() => setCompanyModalOpen(true)}>
          Add Company Details
        </button>
        <button style={buttonStyle} onClick={() => setParkingModalOpen(true)}>
          Add Parking Slots
        </button>
      </div>

      {isCompanyModalOpen && (
        <Modal onClose={() => setCompanyModalOpen(false)}>
          <h2>Company Details</h2>
          <form onSubmit={handleCompanySubmit} style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
            <div style={inputGroupStyle}>
              <label>Company Name:</label>
              <input
                type="text"
                name="companyName"
                value={companyDetails.companyName}
                onChange={handleCompanyChange}
                style={inputStyle}
              />
              {errors.companyDetails.companyName && (
                <p style={{ color: 'red' }}>{errors.companyDetails.companyName}</p>
              )}
            </div>

            <div style={inputGroupStyle}>
              <label>Address Line 1:</label>
              <input
                type="text"
                name="addressLine1"
                value={companyDetails.addressLine1}
                onChange={handleCompanyChange}
                style={inputStyle}
              />
              {errors.companyDetails.addressLine1 && (
                <p style={{ color: 'red' }}>{errors.companyDetails.addressLine1}</p>
              )}
            </div>

            <div style={inputGroupStyle}>
              <label>Address Line 2:</label>
              <input
                type="text"
                name="addressLine2"
                value={companyDetails.addressLine2}
                onChange={handleCompanyChange}
                style={inputStyle}
              />
              {errors.companyDetails.addressLine2 && (
                <p style={{ color: 'red' }}>{errors.companyDetails.addressLine2}</p>
              )}
            </div>

            <div style={inputGroupStyle}>
              <label>District:</label>
              <input
                type="text"
                name="district"
                value={companyDetails.district}
                onChange={handleCompanyChange}
                style={inputStyle}
              />
              {errors.companyDetails.district && (
                <p style={{ color: 'red' }}>{errors.companyDetails.district}</p>
              )}
            </div>

            <div style={inputGroupStyle}>
              <label>State:</label>
              <input
                type="text"
                name="state"
                value={companyDetails.state}
                onChange={handleCompanyChange}
                style={inputStyle}
              />
              {errors.companyDetails.state && (
                <p style={{ color: 'red' }}>{errors.companyDetails.state}</p>
              )}
            </div>

            <div style={inputGroupStyle}>
              <label>Country:</label>
              <input
                type="text"
                name="country"
                value={companyDetails.country}
                onChange={handleCompanyChange}
                style={inputStyle}
              />
              {errors.companyDetails.country && (
                <p style={{ color: 'red' }}>{errors.companyDetails.country}</p>
              )}
            </div>

            <div style={inputGroupStyle}>
              <label>Mobile Number:</label>
              <input
                type="text"
                name="mobileNo"
                value={companyDetails.mobileNo}
                onChange={handleCompanyChange}
                style={inputStyle}
              />
              {errors.companyDetails.mobileNo && (
                <p style={{ color: 'red' }}>{errors.companyDetails.mobileNo}</p>
              )}
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button style={buttonStyle} type="submit">
                Save
              </button>
              <button style={buttonStyle} type="button" onClick={() => setCompanyModalOpen(false)}>
                Close
              </button>
            </div>
          </form>
        </Modal>
      )}

      {isParkingModalOpen && (
        <Modal onClose={() => setParkingModalOpen(false)}>
          <h2>Parking Area Details</h2>
          <form onSubmit={handleParkingSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div style={inputGroupStyle}>
              <label>Area Size:</label>
              <input
                type="text"
                name="areaSize"
                value={parkingDetails.areaSize}
                onChange={handleParkingChange}
                style={inputStyle}
              />
              {errors.parkingDetails.areaSize && (
                <p style={{ color: 'red' }}>{errors.parkingDetails.areaSize}</p>
              )}
            </div>

            <div style={inputGroupStyle}>
              <label>Number of Slots:</label>
              <input
                type="text"
                name="numSlots"
                value={parkingDetails.numSlots}
                onChange={handleParkingChange}
                style={inputStyle}
              />
              {errors.parkingDetails.numSlots && (
                <p style={{ color: 'red' }}>{errors.parkingDetails.numSlots}</p>
              )}
            </div>

            <button style={buttonStyle} type="submit">
              Save Parking Details
            </button>

            <div style={{ marginTop: '20px' }}>
              <button style={buttonStyle} onClick={enableLocation}>
                Use Current Location
              </button>
            </div>

            <div style={{ marginTop: '10px' }}>
              <button style={buttonStyle} onClick={addSlot}>
                Add Slot
              </button>
            </div>

            <div style={{ marginTop: '10px' }}>
              <h3>Added Parking Slots</h3>
              {slots.length > 0 ? (
                <ul>
                  {slots.map((slot, index) => (
                    <li key={index}>
                      Slot {index + 1}: Lat: {slot.latitude}, Lng: {slot.longitude}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No slots added yet.</p>
              )}
            </div>

            <button style={buttonStyle} type="button" onClick={() => setParkingModalOpen(false)}>
              Close
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
};

const buttonStyle = {
  padding: '10px 20px',
  fontSize: '1rem',
  cursor: 'pointer',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
};

const inputStyle = {
  padding: '10px',
  fontSize: '1rem',
  width: '100%',
  borderRadius: '5px',
  border: '1px solid #ccc',
};

const inputGroupStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '5px',
};

const Modal = ({ children, onClose }) => (
  <div
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <div
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.9)',  // transparent white background
        padding: '20px',
        borderRadius: '5px',
        maxWidth: '600px',
        width: '100%',
        position: 'relative', // to place the close button
      }}
    >
      <button
        onClick={onClose}
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          background: 'none',
          border: 'none',
          fontSize: '1.5rem',
          cursor: 'pointer',
        }}
      >
        &times;
      </button>
      {children}
    </div>
  </div>
);

export default Admin;
