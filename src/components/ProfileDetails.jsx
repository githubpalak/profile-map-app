import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

const defaultProfileImage = '/default-avatar.png';

const ProfileDetails = () => {
  const { profileId } = useParams();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    axios
      .get('/profiles.json')
      .then((response) => {
        const profileData = response.data.find(
          (p) => p.id === parseInt(profileId)
        );
        setProfile(profileData);
      })
      .catch((error) => {
        console.error('Error fetching profile:', error);
      });
  }, [profileId]);

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="profile-details">
      <div className="profile-card">
        <div className="profile-card-left">
        <img src="/default-avatar.png" alt="Default Profile" />
        </div>
        <div className="profile-card-right">
          <h2>{profile.name}</h2>
          <p>{profile.description}</p>
          <h4>Address:</h4>
          <p>{profile.address}</p>

          <MapContainer
            center={[profile.latitude, profile.longitude]}
            zoom={13}
            style={{ height: '400px', width: '100%' }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker
              position={[profile.latitude, profile.longitude]}
              icon={new L.Icon({
                iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
                iconSize: [25, 41],
              })}
            >
              <Popup>{profile.address}</Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
