import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

function LandingPage() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSignUp = () => {
    navigate('/signup');
  };

  return (
    <div className='LandingPage-body'>
      <div className="LandingPage">
        <header className="LandingPage-header">
          <h1 className="LandingPage-title">MovieMe</h1>
          <h2 className="LandingPage-subtitle">Connect with your friends through cinema!</h2>
          <div>
            <button className="LandingPage-button" onClick={handleLogin}>Log In</button>
            <button className="LandingPage-button" onClick={handleSignUp}>Sign Up</button>
          </div>
        </header>
      </div>
    </div>
  );
}

export default LandingPage;