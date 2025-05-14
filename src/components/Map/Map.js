import React, { useEffect, useState, useRef } from 'react';
import './Map.css';

const Map = ({ profile, isLoading, onBack }) => {
  const [mapInitialized, setMapInitialized] = useState(false);
  const leafletMap = useRef(null);
  const mapContainer = useRef(null);
  const leafletScriptRef = useRef(null);
  const leafletCssRef = useRef(null);

  // Check if Leaflet is already loaded
  const isLeafletLoaded = () => {
    return typeof window.L !== 'undefined';
  };

  useEffect(() => {
    // Only proceed if we have a profile, we're not loading, and map isn't initialized yet
    if (!profile || isLoading) return;

    // Function to load Leaflet resources
    const loadLeaflet = () => {
      // If Leaflet is already loaded, initialize the map directly
      if (isLeafletLoaded()) {
        initializeMap();
        return;
      }

      // Add Leaflet CSS if not already added
      if (!document.querySelector('link[href*="leaflet.css"]')) {
        const linkElement = document.createElement('link');
        linkElement.rel = 'stylesheet';
        linkElement.href = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css';
        document.head.appendChild(linkElement);
        leafletCssRef.current = linkElement;
      }

      // Add Leaflet JS if not already added
      if (!document.querySelector('script[src*="leaflet.js"]')) {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.js';
        script.async = true;
        script.onload = initializeMap;
        document.body.appendChild(script);
        leafletScriptRef.current = script;
      }
    };

    // Function to initialize the map
    const initializeMap = () => {
      // Make sure Leaflet is loaded and we have a container
      if (!window.L || !mapContainer.current) return;

      // Get coordinates from profile
      const { lat, lng } = profile.coordinates;

      // If we already have a map instance, clean it up first
      if (leafletMap.current) {
        leafletMap.current.remove();
        leafletMap.current = null;
      }
      
      // Create new map instance
      const map = window.L.map(mapContainer.current).setView([lat, lng], 13);
      leafletMap.current = map;

      // Add OpenStreetMap tile layer
      window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      // Add marker for the location
      const marker = window.L.marker([lat, lng]).addTo(map);
      
      // Add popup with info
      marker.bindPopup(`<strong>${profile.name}</strong><br>${profile.address}`).openPopup();
      
      // Adjust map after container becomes visible
      setTimeout(() => {
        map.invalidateSize();
      }, 100);

      setMapInitialized(true);
    };

    // Start loading Leaflet
    loadLeaflet();
    
    // Cleanup function
    return () => {
      // Clean up map instance
      if (leafletMap.current) {
        leafletMap.current.remove();
        leafletMap.current = null;
      }
    };
  }, [profile, isLoading]);

  // Don't render anything if no profile
  if (!profile) return null;
  
  return (
    <div className="map-view">
      <div className="map-header">
        <button className="back-button" onClick={onBack}>
          ← Back to List
        </button>
        <h2 className="map-title">Location: {profile.name}</h2>
      </div>
      
      <div className="map-address">
        <p><strong>Address:</strong> {profile.address}</p>
      </div>
      
      {isLoading ? (
        <div className="loading-container">Loading map...</div>
      ) : (
        <div ref={mapContainer} className="map-container">
          {!mapInitialized && (
            <div className="map-placeholder">
              <p>Loading map for:</p>
              <p>Latitude: {profile.coordinates.lat}, Longitude: {profile.coordinates.lng}</p>
            </div>
          )}
        </div>
      )}
      
      <div className="coords-info">
        <p>Latitude: {profile.coordinates.lat}</p>
        <p>Longitude: {profile.coordinates.lng}</p>
      </div>
    </div>
  );
};

export default Map;