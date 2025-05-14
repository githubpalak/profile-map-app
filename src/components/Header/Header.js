import React from 'react';
import './Header.css';

const Header = ({ toggleAdminPanel, isAdminMode }) => {
  return (
    <header className="header">
      <div className="header-container">
        <h1 className="logo">Profile Map Explorer</h1>
        <nav className="nav">
          <button 
            className={`nav-button ${isAdminMode ? 'active' : ''}`} 
            onClick={toggleAdminPanel}
          >
            {isAdminMode ? 'Exit Admin Mode' : 'Admin Panel'}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;