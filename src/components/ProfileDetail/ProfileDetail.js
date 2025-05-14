import React from 'react';
import './ProfileDetail.css';

const ProfileDetail = ({ profile, onShowOnMap, onBack }) => {
  if (!profile) return null;

  return (
    <div className="profile-detail">
      <div className="profile-detail-header">
        <button className="back-button" onClick={onBack}>
          ← Back to List
        </button>
        <button className="map-button" onClick={() => onShowOnMap(profile)}>
          View on Map
        </button>
      </div>
      
      <div className="profile-detail-content">
        <div className="profile-detail-image">
          <img src={profile.photo} alt={`${profile.name}'s profile`} />
        </div>
        
        <div className="profile-detail-info">
          <h2 className="profile-detail-name">{profile.name}</h2>
          <p className="profile-detail-description">{profile.description}</p>
          
          <div className="profile-detail-contact">
            <h3>Contact Information</h3>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Phone:</strong> {profile.phone}</p>
            <p><strong>Address:</strong> {profile.address}</p>
          </div>
          
          <div className="profile-detail-skills">
            <h3>Skills</h3>
            <div className="skills-list">
              {profile.skills.map((skill, index) => (
                <span key={index} className="skill-tag">{skill}</span>
              ))}
            </div>
          </div>
          
          <div className="profile-detail-interests">
            <h3>Interests</h3>
            <div className="interests-list">
              {profile.interests.map((interest, index) => (
                <span key={index} className="interest-tag">{interest}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetail;