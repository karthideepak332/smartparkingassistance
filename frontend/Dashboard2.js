import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
    const [parkingData, setParkingData] = useState(null);

    // Function to fetch parking data from Flask API
    const fetchParkingData = async () => {
        try {
            const response = await fetch("http://127.0.0.1:5000/api/parking-data");
            const data = await response.json();
            setParkingData(data);
        } catch (error) {
            console.error("Error fetching parking data:", error);
        }
    };

    // Fetch data every 2 seconds
    useEffect(() => {
        fetchParkingData();
        const interval = setInterval(fetchParkingData, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <h1>Parking Space Monitor</h1>
                <div className="video-container">
                    {/* Display video stream from Flask */}
                    <img
                        src="http://127.0.0.1:5000/api/video_feed"
                        alt="Parking lot video stream"
                        className="video-stream"
                    />
                </div>
                {parkingData ? (
                    <div>
                        <h2>Free Spaces: {parkingData.free_spaces} / {parkingData.total_spaces}</h2>
                        <div className="parking-grid">
                            {parkingData.spaces.map((space, index) => (
                                <div
                                    key={index}
                                    className={`parking-space ${space.is_free ? "free" : "occupied"}`}
                                    style={{
                                        left: space.position[0],
                                        top: space.position[1],
                                    }}
                                >
                                    {space.is_free ? "Free" : "Occupied"}
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <p>Loading parking data...</p>
                )}
            </header>
        </div>
    );
}

export default App;
