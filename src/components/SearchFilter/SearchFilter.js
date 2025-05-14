import React, { useState } from 'react';
import './SearchFilter.css';

const SearchFilter = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm, { location: locationFilter });
  };
  
  const handleClear = () => {
    setSearchTerm('');
    setLocationFilter('');
    onSearch('', {});
  };

  return (
    <div className="search-filter">
      <h2 className="search-filter-title">Search Profiles</h2>
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            className="search-input"
            placeholder="Search by name, description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="form-group">
          <input
            type="text"
            className="location-input"
            placeholder="Filter by location..."
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
          />
        </div>
        
        <div className="search-buttons">
          <button type="submit" className="search-button">
            Search
          </button>
          <button 
            type="button" 
            className="clear-button"
            onClick={handleClear}
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchFilter;