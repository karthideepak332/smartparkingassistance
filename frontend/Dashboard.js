import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix marker icons for Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const Dashboard = () => {
    const [parkingSlots, setParkingSlots] = useState([]);
    const [mapCenter, setMapCenter] = useState({ lat: 20.5937, lng: 78.9629 }); // Center of India
    const [locationEnabled, setLocationEnabled] = useState(false);

    // Enable location and update map center
    const enableLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setMapCenter({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    });
                    setLocationEnabled(true);
                },
                (error) => {
                    console.error("Error obtaining location:", error);
                    alert("Unable to retrieve your location.");
                }
            );
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    };

    // Fetch parking data from TomTom API
    useEffect(() => {
        if (locationEnabled) {
            fetch(
                `https://api.tomtom.com/search/2/poiSearch/parking.json?lat=${mapCenter.lat}&lon=${mapCenter.lng}&radius=5000&key=9jcGbCWjthN7jmjbA053FORqBjx1pGVQ`
            )
                .then((response) => response.json())
                .then((data) => {
                    if (data.results) setParkingSlots(data.results);
                })
                .catch((error) => console.error("Error fetching parking data:", error));
        }
    }, [mapCenter, locationEnabled]);

    // Focus on a specific location
    const focusOnLocation = (lat, lng) => {
        setMapCenter({ lat, lng });
    };

    return (
        <div
            className="dashboard"
            style={{
                backgroundColor: "#f0f8ff",
                padding: "20px",
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
            }}
        >
            {/* Header */}
            <header
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <h1 style={{ fontSize: "24px", color: "#4b9cd3" }}>Dashboard</h1>
                <button
                    onClick={enableLocation}
                    style={{
                        padding: "10px",
                        backgroundColor: "#4b9cd3",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                    }}
                >
                    Enable Location
                </button>
            </header>

            {/* Map Container */}
            <MapContainer
                center={[mapCenter.lat, mapCenter.lng]}
                zoom={12}
                style={{
                    height: "400px",
                    width: "100%",
                    borderRadius: "8px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {parkingSlots.map((slot, index) => (
                    <Marker
                        key={index}
                        position={[slot.position.lat, slot.position.lon]}
                    >
                        <Popup>
                            <strong>{slot.poi.name}</strong>
                            <br />
                            {slot.address.freeformAddress}
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>

            {/* Parking Slots List */}
            <section>
                <h2 style={{ color: "#4b9cd3" }}>Nearby Parking Slots</h2>
                <div
                    style={{
                        display: "flex",
                        overflowX: "auto",
                        gap: "15px",
                        padding: "10px 0",
                    }}
                >
                    {parkingSlots.length > 0 ? (
                        parkingSlots.map((slot, index) => (
                            <div
                                key={index}
                                className="parking-card"
                                onClick={() =>
                                    focusOnLocation(slot.position.lat, slot.position.lon)
                                }
                                style={{
                                    minWidth: "150px",
                                    backgroundColor: "#ffffff",
                                    padding: "15px",
                                    borderRadius: "8px",
                                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                                    cursor: "pointer",
                                }}
                            >
                                <h5 style={{ color: "#4b9cd3" }}>
                                    {slot.poi.name || `Parking Spot ${index + 1}`}
                                </h5>
                                <p>{slot.address.freeformAddress}</p>
                            </div>
                        ))
                    ) : (
                        <p>No parking slots available. Enable location to find nearby slots.</p>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Dashboard;
