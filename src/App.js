import React, { useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import ProfileList from './components/ProfileList/ProfileList';
import ProfileDetail from './components/ProfileDetail/ProfileDetail';
import Map from './components/Map/Map';
import SearchFilter from './components/SearchFilter/SearchFilter';
import AdminPanel from './components/AdminPanel/AdminPanel';
import profiles from './data/profiles';

function App() {
  const [profileData, setProfileData] = useState(profiles);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [showMap, setShowMap] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [filteredProfiles, setFilteredProfiles] = useState(profiles);
  const [isLoading, setIsLoading] = useState(false);
  
  // Function to handle viewing profile details
  const handleViewProfile = (profile) => {
    setSelectedProfile(profile);
    setShowMap(false);
  };
  
  // Function to handle showing profile location on map
  const handleShowOnMap = (profile) => {
    setSelectedProfile(profile);
    setShowMap(true);
    // Simulate loading
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };
  
  // Function to go back to list view
  const handleBackToList = () => {
    setSelectedProfile(null);
    setShowMap(false);
  };
  
  // Function to toggle admin panel
  const toggleAdminPanel = () => {
    setShowAdminPanel(!showAdminPanel);
    setSelectedProfile(null);
    setShowMap(false);
  };
  
  // Function to add a new profile
  const handleAddProfile = (newProfile) => {
    const updatedProfiles = [...profileData, {
      ...newProfile,
      id: profileData.length + 1
    }];
    setProfileData(updatedProfiles);
    setFilteredProfiles(updatedProfiles);
  };
  
  // Function to edit a profile
  const handleEditProfile = (updatedProfile) => {
    const updatedProfiles = profileData.map(profile => 
      profile.id === updatedProfile.id ? updatedProfile : profile
    );
    setProfileData(updatedProfiles);
    setFilteredProfiles(updatedProfiles);
    setSelectedProfile(null);
  };
  
  // Function to delete a profile
  const handleDeleteProfile = (profileId) => {
    const updatedProfiles = profileData.filter(profile => profile.id !== profileId);
    setProfileData(updatedProfiles);
    setFilteredProfiles(updatedProfiles);
    setSelectedProfile(null);
  };
  
  // Function to handle search and filtering
  const handleSearch = (searchTerm, filterCriteria) => {
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      let filtered = [...profileData];
      
      // Filter by search term if provided
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        filtered = filtered.filter(profile => 
          profile.name.toLowerCase().includes(term) || 
          profile.description.toLowerCase().includes(term) ||
          profile.address.toLowerCase().includes(term)
        );
      }
      
      // Apply additional filters if provided
      if (filterCriteria) {
        // Example filter by location
        if (filterCriteria.location) {
          filtered = filtered.filter(profile => 
            profile.address.toLowerCase().includes(filterCriteria.location.toLowerCase())
          );
        }
      }
      
      setFilteredProfiles(filtered);
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="app">
      <Header toggleAdminPanel={toggleAdminPanel} isAdminMode={showAdminPanel} />
      
      <div className="main-content">
        {showAdminPanel ? (
          <AdminPanel 
            profiles={profileData}
            onAddProfile={handleAddProfile}
            onEditProfile={handleEditProfile}
            onDeleteProfile={handleDeleteProfile}
          />
        ) : selectedProfile ? (
          <div className="profile-view">
            {showMap ? (
              <Map 
                profile={selectedProfile} 
                isLoading={isLoading} 
                onBack={handleBackToList} 
              />
            ) : (
              <ProfileDetail 
                profile={selectedProfile} 
                onShowOnMap={handleShowOnMap} 
                onBack={handleBackToList} 
              />
            )}
          </div>
        ) : (
          <div className="list-view">
            <SearchFilter onSearch={handleSearch} />
            <ProfileList 
              profiles={filteredProfiles} 
              onViewProfile={handleViewProfile} 
              onShowOnMap={handleShowOnMap} 
              isLoading={isLoading}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;