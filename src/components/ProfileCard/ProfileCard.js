import React from 'react';
import './ProfileCard.css';

const ProfileCard = ({ profile, onViewProfile, onShowOnMap }) => {
  return (
    <div className="profile-card">
      <div className="profile-image">
        <img src={profile.photo} alt={`${profile.name}'s profile`} />
      </div>
      <div className="profile-content">
        <h3 className="profile-name">{profile.name}</h3>
        <p className="profile-description">{profile.description}</p>
        <p className="profile-address">
          <i className="location-icon">📍</i> {profile.address}
        </p>
      </div>
      <div className="profile-actions">
        <button 
          className="view-profile-btn" 
          onClick={onViewProfile}
        >
          View Profile
        </button>
        <button 
          className="show-on-map-btn" 
          onClick={onShowOnMap}
        >
          Show on Map
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;