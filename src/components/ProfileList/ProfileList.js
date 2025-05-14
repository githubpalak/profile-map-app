import React from 'react';
import ProfileCard from '../ProfileCard/ProfileCard';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';
import './ProfileList.css';

const ProfileList = ({ profiles, onViewProfile, onShowOnMap, isLoading }) => {
  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (profiles.length === 0) {
    return (
      <div className="no-profiles">
        <h2>No profiles found</h2>
        <p>Try adjusting your search criteria or check back later.</p>
      </div>
    );
  }

  return (
    <div className="profile-list">
      {profiles.map(profile => (
        <ProfileCard 
          key={profile.id} 
          profile={profile} 
          onViewProfile={() => onViewProfile(profile)}
          onShowOnMap={() => onShowOnMap(profile)}
        />
      ))}
    </div>
  );
};

export default ProfileList;