import React, { useState } from 'react';
import AdminProfileForm from '../AdminProfileForm/AdminProfileForm';
import './AdminPanel.css';

const AdminPanel = ({ profiles, onAddProfile, onEditProfile, onDeleteProfile }) => {
  const [isAddingProfile, setIsAddingProfile] = useState(false);
  const [editProfile, setEditProfile] = useState(null);
  
  const handleAddClick = () => {
    setIsAddingProfile(true);
    setEditProfile(null);
  };
  
  const handleEditClick = (profile) => {
    setEditProfile(profile);
    setIsAddingProfile(false);
  };
  
  const handleFormCancel = () => {
    setIsAddingProfile(false);
    setEditProfile(null);
  };
  
  const handleFormSubmit = (profileData) => {
    if (editProfile) {
      onEditProfile({ ...profileData, id: editProfile.id });
    } else {
      onAddProfile(profileData);
    }
    
    setIsAddingProfile(false);
    setEditProfile(null);
  };
  
  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h2 className="admin-title">Admin Panel</h2>
        {!isAddingProfile && !editProfile && (
          <button className="add-profile-btn" onClick={handleAddClick}>
            Add New Profile
          </button>
        )}
      </div>
      
      {(isAddingProfile || editProfile) ? (
        <AdminProfileForm 
          profile={editProfile}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
        />
      ) : (
        <div className="admin-profile-list">
          <h3 className="admin-section-title">Manage Profiles</h3>
          <div className="admin-table">
            <div className="admin-table-header">
              <div className="admin-table-cell">Name</div>
              <div className="admin-table-cell">Address</div>
              <div className="admin-table-cell">Actions</div>
            </div>
            
            {profiles.length === 0 ? (
              <div className="admin-no-profiles">
                No profiles available. Add a new profile to get started.
              </div>
            ) : (
              profiles.map(profile => (
                <div key={profile.id} className="admin-table-row">
                  <div className="admin-table-cell">{profile.name}</div>
                  <div className="admin-table-cell admin-address-cell">{profile.address}</div>
                  <div className="admin-table-cell admin-actions-cell">
                    <button 
                      className="admin-edit-btn" 
                      onClick={() => handleEditClick(profile)}
                    >
                      Edit
                    </button>
                    <button 
                      className="admin-delete-btn" 
                      onClick={() => onDeleteProfile(profile.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;