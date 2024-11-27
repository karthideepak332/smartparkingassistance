/* global google */
import React, { useEffect, useState } from 'react';

const Dashboard = () => {
    const [parkingSlots, setParkingSlots] = useState([]);
    const [mapCenter, setMapCenter] = useState({ lat: -34.397, lng: 150.644 }); // Default center
    const [locationEnabled, setLocationEnabled] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        // Fetch nearby parking slots
        fetch(`https://api.tomtom.com/search/2/poiSearch/parking.json?lat=${mapCenter.lat}&lon=${mapCenter.lng}&radius=5000&key=9jcGbCWjthN7jmjbA053FORqBjx1pGVQ`)
            .then((res) => res.json())
            .then((data) => {
                if (data.results) setParkingSlots(data.results);
            })
            .catch((error) => console.error("Error fetching parking data:", error));
    }, [mapCenter]);

    const enableLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setMapCenter({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
                setLocationEnabled(true);
            }, (error) => {
                console.error("Error obtaining location:", error);
                alert("Unable to retrieve your location.");
            });
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    };

    useEffect(() => {
        // Load Google Maps API
        const loadMapScript = document.createElement("script");
        loadMapScript.src = "https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&callback=initMap";
        loadMapScript.async = true;
        document.body.appendChild(loadMapScript);

        // Initialize the Google Map
        window.initMap = () => {
            const map = new google.maps.Map(document.getElementById("map"), {
                center: mapCenter,
                zoom: 12,
            });

            // Add a marker for the user's location if enabled
            if (locationEnabled) {
                new google.maps.Marker({
                    position: mapCenter,
                    map: map,
                    title: "Your Location",
                });
            }

            // Add markers for nearby parking slots
            parkingSlots.forEach(slot => {
                new google.maps.Marker({
                    position: { lat: slot.position.lat, lng: slot.position.lon },
                    map: map,
                    title: slot.poi.name,
                });
            });
        };

        return () => {
            document.body.removeChild(loadMapScript);
        };
    }, [mapCenter, locationEnabled, parkingSlots]);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <div className="dashboard" style={{ backgroundColor: "#f0f8ff", padding: "20px", minHeight: "100vh" }}>
            {/* Header with Account Dropdown */}
            <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <h1 style={{ fontSize: "24px", color: "#4b9cd3" }}>Dashboard</h1>
                <div className="navigation-bar" style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                    <button onClick={enableLocation} style={{ padding: "10px", backgroundColor: "#4b9cd3", color: "#fff", border: "none", borderRadius: "4px" }}>
                        Enable Location
                    </button>
                    <div className="dropdown" style={{ position: "relative" }}>
                        <button onClick={toggleDropdown} style={{ padding: "10px", backgroundColor: "#4b9cd3", color: "#fff", border: "none", borderRadius: "4px" }}>
                            Account
                        </button>
                        {dropdownOpen && (
                            <div style={{ position: "absolute", top: "100%", right: 0, backgroundColor: "#ffffff", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", borderRadius: "4px", overflow: "hidden" }}>
                                <button style={{ padding: "10px", width: "100%", backgroundColor: "#ffffff", border: "none" }}>Login</button>
                                <button style={{ padding: "10px", width: "100%", backgroundColor: "#ffffff", border: "none" }}>Signup</button>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {/* Google Map */}
            <div id="map" style={{ height: "300px", width: "100%", marginBottom: "20px", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)" }}></div>

            {/* Horizontal Scrollable Card Row */}
            <section>
                <h2 style={{ color: "#4b9cd3" }}>Nearby Parking Slots</h2>
                <div style={{ display: "flex", overflowX: "auto", gap: "15px", padding: "10px 0" }}>
                    {parkingSlots.map((slot, index) => (
                        <div key={index} className="parking-card" style={{ minWidth: "150px", backgroundColor: "#ffffff", padding: "15px", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
                            <h5 style={{ color: "#4b9cd3" }}>Parking Spot {index + 1}</h5>
                            <p>{slot.address.freeformAddress}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Dashboard;
