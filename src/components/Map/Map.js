import React, { useEffect, useRef } from 'react';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';
import './Map.css';

const Map = ({ profile, isLoading, onBack }) => {
  const mapRef = useRef(null);
  
  useEffect(() => {
    if (!profile || isLoading) return;
    
    // This is where we would typically initialize the map using a library like Google Maps
    // Since we're not actually using an external map service in this example, we'll simulate it
    const initMap = () => {
      const mapElement = mapRef.current;
      if (!mapElement) return;
      
      // Create a simple map visualization
      mapElement.innerHTML = '';
      
      const mapContainer = document.createElement('div');
      mapContainer.className = 'map-container';
      
      const marker = document.createElement('div');
      marker.className = 'map-marker';
      marker.style.left = '50%';
      marker.style.top = '50%';
      
      const markerInfo = document.createElement('div');
      markerInfo.className = 'marker-info';
      markerInfo.innerHTML = `
        <strong>${profile.name}</strong>
        <p>${profile.address}</p>
      `;
      
      mapContainer.appendChild(marker);
      mapContainer.appendChild(markerInfo);
      mapElement.appendChild(mapContainer);
      
      // Display coordinates
      const coordsInfo = document.createElement('div');
      coordsInfo.className = 'coords-info';
      coordsInfo.innerHTML = `
        <p>Latitude: ${profile.coordinates.lat}</p>
        <p>Longitude: ${profile.coordinates.lng}</p>
      `;
      mapElement.appendChild(coordsInfo);
    };
    
    // Simulate map loading
    const timer = setTimeout(initMap, 500);
    
    return () => clearTimeout(timer);
  }, [profile, isLoading]);
  
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
        <LoadingIndicator />
      ) : (
        <div ref={mapRef} className="map-container">
          {/* Map will be rendered here */}
          <div className="map-placeholder">
            <p>Map would be displayed here with the following coordinates:</p>
            <p>Latitude: {profile.coordinates.lat}, Longitude: {profile.coordinates.lng}</p>
            <p className="map-note">
              Note: In a real application, this would be replaced with a map service like Google Maps or Mapbox.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Map;