/**
 * mapUtils.js - Utility functions for map operations
 * This file contains helper functions for geocoding, map initialization,
 * and marker management for the Profile Map application.
 */

// Default map center coordinates (fallback if no profiles are available)
const DEFAULT_CENTER = { lat: 40.7128, lng: -74.0060 }; // New York City
const DEFAULT_ZOOM = 13;

/**
 * Initialize a map using the Google Maps JavaScript API
 * 
 * @param {string} elementId - DOM element ID where the map should be rendered
 * @param {Object} center - Object containing lat and lng coordinates for the map center
 * @param {number} zoom - Initial zoom level for the map
 * @returns {Object} - Google Maps map instance
 */
export const initializeMap = (elementId, center = DEFAULT_CENTER, zoom = DEFAULT_ZOOM) => {
  // Make sure the Google Maps API is loaded
  if (!window.google || !window.google.maps) {
    console.error('Google Maps API not loaded');
    return null;
  }

  // Create a new map instance
  const map = new window.google.maps.Map(document.getElementById(elementId), {
    center,
    zoom,
    mapTypeControl: true,
    streetViewControl: true,
    fullscreenControl: true,
    zoomControl: true,
  });

  return map;
};

/**
 * Create a marker on the map for a specific location
 * 
 * @param {Object} map - Google Maps map instance
 * @param {Object} position - Object containing lat and lng coordinates
 * @param {string} title - Tooltip text for the marker
 * @param {Object} options - Additional marker options
 * @returns {Object} - Google Maps marker instance
 */
export const createMarker = (map, position, title, options = {}) => {
  if (!map || !position) {
    console.error('Map or position not provided');
    return null;
  }

  const marker = new window.google.maps.Marker({
    position,
    map,
    title,
    animation: window.google.maps.Animation.DROP,
    ...options
  });

  return marker;
};

/**
 * Create an info window with content for a marker
 * 
 * @param {Object} content - HTML content for the info window
 * @returns {Object} - Google Maps InfoWindow instance
 */
export const createInfoWindow = (content) => {
  return new window.google.maps.InfoWindow({
    content,
    maxWidth: 300
  });
};

/**
 * Geocode an address to get latitude and longitude
 * 
 * @param {string} address - The address to geocode
 * @returns {Promise} - Promise that resolves with the coordinates or rejects with an error
 */
export const geocodeAddress = (address) => {
  return new Promise((resolve, reject) => {
    if (!window.google || !window.google.maps || !window.google.maps.Geocoder) {
      reject(new Error('Google Maps Geocoding API not loaded'));
      return;
    }

    const geocoder = new window.google.maps.Geocoder();
    
    geocoder.geocode({ address }, (results, status) => {
      if (status === 'OK' && results && results.length > 0) {
        const location = results[0].geometry.location;
        resolve({
          lat: location.lat(),
          lng: location.lng(),
          formattedAddress: results[0].formatted_address
        });
      } else {
        reject(new Error(`Geocoding failed with status: ${status}`));
      }
    });
  });
};

/**
 * Calculate the center point for a group of profiles
 * 
 * @param {Array} profiles - Array of profile objects with lat and lng properties
 * @returns {Object} - Object with lat and lng properties representing the center
 */
export const calculateMapCenter = (profiles) => {
  if (!profiles || profiles.length === 0) {
    return DEFAULT_CENTER;
  }

  // Filter profiles that have valid coordinates
  const validProfiles = profiles.filter(
    profile => profile.lat && profile.lng && !isNaN(profile.lat) && !isNaN(profile.lng)
  );

  if (validProfiles.length === 0) {
    return DEFAULT_CENTER;
  }

  // If there's only one profile, use its coordinates
  if (validProfiles.length === 1) {
    return {
      lat: parseFloat(validProfiles[0].lat),
      lng: parseFloat(validProfiles[0].lng)
    };
  }

  // Calculate the average of all coordinates
  const sum = validProfiles.reduce(
    (acc, profile) => {
      return {
        lat: acc.lat + parseFloat(profile.lat),
        lng: acc.lng + parseFloat(profile.lng)
      };
    },
    { lat: 0, lng: 0 }
  );

  return {
    lat: sum.lat / validProfiles.length,
    lng: sum.lng / validProfiles.length
  };
};

/**
 * Determine appropriate zoom level based on the distance between points
 * 
 * @param {Array} profiles - Array of profile objects with lat and lng properties
 * @returns {number} - Recommended zoom level
 */
export const calculateZoomLevel = (profiles) => {
  if (!profiles || profiles.length <= 1) {
    return DEFAULT_ZOOM;
  }

  // Filter profiles that have valid coordinates
  const validProfiles = profiles.filter(
    profile => profile.lat && profile.lng && !isNaN(profile.lat) && !isNaN(profile.lng)
  );

  if (validProfiles.length <= 1) {
    return DEFAULT_ZOOM;
  }

  // Find the bounds of all coordinates
  const bounds = new window.google.maps.LatLngBounds();
  
  validProfiles.forEach(profile => {
    bounds.extend({
      lat: parseFloat(profile.lat),
      lng: parseFloat(profile.lng)
    });
  });

  // Calculate the diagonal distance of the bounding box in kilometers
  const ne = bounds.getNorthEast();
  const sw = bounds.getSouthWest();
  
  const distance = calculateDistance(
    { lat: ne.lat(), lng: ne.lng() },
    { lat: sw.lat(), lng: sw.lng() }
  );

  // Apply heuristic for zoom level based on distance
  if (distance > 1000) return 4;
  if (distance > 500) return 5;
  if (distance > 250) return 6;
  if (distance > 100) return 7;
  if (distance > 50) return 8;
  if (distance > 25) return 9;
  if (distance > 10) return 10;
  if (distance > 5) return 11;
  if (distance > 2) return 12;
  if (distance > 1) return 13;
  if (distance > 0.5) return 14;
  if (distance > 0.25) return 15;
  return 16;
};

/**
 * Calculate distance between two points using the Haversine formula
 * 
 * @param {Object} point1 - Object with lat and lng properties
 * @param {Object} point2 - Object with lat and lng properties
 * @returns {number} - Distance in kilometers
 */
export const calculateDistance = (point1, point2) => {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = degreesToRadians(point2.lat - point1.lat);
  const dLng = degreesToRadians(point2.lng - point1.lng);
  
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(degreesToRadians(point1.lat)) * Math.cos(degreesToRadians(point2.lat)) * 
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  
  return distance;
};

/**
 * Convert degrees to radians
 * 
 * @param {number} degrees - Angle in degrees
 * @returns {number} - Angle in radians
 */
export const degreesToRadians = (degrees) => {
  return degrees * (Math.PI / 180);
};

/**
 * Create a profile content string for InfoWindow
 * 
 * @param {Object} profile - Profile object
 * @returns {string} - HTML content string
 */
export const createProfileContent = (profile) => {
  return `
    <div class="info-window-content">
      <h3>${profile.name}</h3>
      ${profile.photo ? `<img src="${profile.photo}" alt="${profile.name}" style="max-width:100px; max-height:100px; margin:5px 0;">` : ''}
      <p>${profile.description}</p>
      <p><strong>Address:</strong> ${profile.address}</p>
      ${profile.email ? `<p><strong>Email:</strong> ${profile.email}</p>` : ''}
      ${profile.phone ? `<p><strong>Phone:</strong> ${profile.phone}</p>` : ''}
    </div>
  `;
};

/**
 * Load the Google Maps JavaScript API dynamically
 * 
 * @param {string} apiKey - Google Maps API key
 * @returns {Promise} - Promise that resolves when the API is loaded
 */
export const loadGoogleMapsAPI = (apiKey) => {
  return new Promise((resolve, reject) => {
    // If API is already loaded, resolve immediately
    if (window.google && window.google.maps) {
      resolve();
      return;
    }

    // Create a script element
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    
    // Set up callbacks
    window.initGoogleMapsCallback = () => {
      resolve();
      delete window.initGoogleMapsCallback;
    };
    
    script.src += '&callback=initGoogleMapsCallback';
    
    // Handle errors
    script.onerror = () => {
      reject(new Error('Failed to load Google Maps API'));
    };
    
    // Append to document
    document.head.appendChild(script);
  });
};

/**
 * Handle errors related to maps and provide user-friendly messages
 * 
 * @param {Error} error - The error object
 * @returns {string} - User-friendly error message
 */
export const handleMapError = (error) => {
  console.error('Map error:', error);
  
  // Provide specific error messages based on common issues
  if (error.message.includes('API not loaded')) {
    return 'The map service could not be loaded. Please check your internet connection and try again.';
  } else if (error.message.includes('Geocoding failed')) {
    return 'We could not find the location on the map. Please check the address and try again.';
  } else if (error.message.includes('OVER_QUERY_LIMIT')) {
    return 'We\'ve reached the map service request limit. Please try again later.';
  } else if (error.message.includes('REQUEST_DENIED')) {
    return 'The map service denied the request. Please check your API key configuration.';
  } else if (error.message.includes('INVALID_REQUEST')) {
    return 'Invalid map request. Please check the address format and try again.';
  } else if (error.message.includes('UNKNOWN_ERROR')) {
    return 'An unknown error occurred with the map service. Please try again later.';
  }
  
  return 'There was an issue with the map. Please try again later.';
};

export default {
  initializeMap,
  createMarker,
  createInfoWindow,
  geocodeAddress,
  calculateMapCenter,
  calculateZoomLevel,
  calculateDistance,
  createProfileContent,
  loadGoogleMapsAPI,
  handleMapError,
  DEFAULT_CENTER,
  DEFAULT_ZOOM
};