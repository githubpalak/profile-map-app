import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const defaultProfileImage = '/default-avatar.png';

const ProfileList = () => {
  const [profiles, setProfiles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    axios
      .get('/profiles.json')
      .then((response) => {
        setProfiles(response.data);
      })
      .catch((error) => {
        console.error('Error fetching profiles:', error);
      });
  }, []);

  const filteredProfiles = profiles.filter(
    (profile) =>
      profile.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      profile.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="profile-list">
      <h1>Profiles</h1>
      <input
        type="text"
        placeholder="Search by name or address"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className="profile-cards">
        {filteredProfiles.length === 0 ? (
          <p>No profiles found</p>
        ) : (
          filteredProfiles.map((profile) => (
            <div className="profile-card" key={profile.id}>
              <div className="profile-card-left">
              <img src="/default-avatar.png" alt="Default Profile" />
              </div>
              <div className="profile-card-right">
                <h3>{profile.name}</h3>
                <p>{profile.description}</p>
                <Link to={`/profile/${profile.id}`} className="btn">
                  View Profile
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProfileList;
