import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './MainHeader.css';
import Cookies from 'js-cookie';

function MainHeader() {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear cookies
    Cookies.remove('email');
    Cookies.remove('password');
    Cookies.remove('userId');
    navigate('/login');
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleSearchClick = () => {
    navigate('/main');
  };

  return (
    <header className="main-header">
      <div className="header-content">
        <h1 className="header-title">MovieMe</h1>
        <div className="header-buttons">
          <button className="header-button" onClick={handleSearchClick}>Search</button>
          <button className="header-button">Library</button>
          <div className="header-profile-container">
            <button className="header-profile-button" onClick={toggleDropdown}>
              <img src="/photos/profile_images/profile-image-0.png" alt="Profile" className="header-profile" />
            </button>
            {dropdownVisible && (
              <div className="header-dropdown">
                <Link to="/profile" className="header-dropdown-item">Profile</Link>
                <Link to="/friends" className="header-dropdown-item">Friends</Link>
                <button className="header-dropdown-item" onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default MainHeader;