import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './LoginPage.css';
import Header from '../../../components/Header/Header';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_BASE_URL || '';
  const handleLogin = async (e) => {
    e.preventDefault();

    const headers = new Headers();
    headers.set('Authorization', 'Basic ' + btoa(email + ':' + password));

    try {
      const response = await fetch(`${apiUrl}/user`, {
        method: 'GET',
        headers: headers,
        cache: 'no-store', 
      });

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        console.error('Expected JSON, got text:', text);
        throw new Error('Invalid response format');
      }

      if (response.ok) {
        const data = await response.json();
        console.log('Login successful, User ID:', data.id);

        Cookies.set('email', email, { expires: 1, sameSite: 'Strict', secure: true });
        Cookies.set('password', password, { expires: 1, sameSite: 'Strict', secure: true });
        Cookies.set('userId', data.id, { expires: 1, sameSite: 'Strict', secure: true });

        console.log('Navigating to main page');
        navigate('/main');
      } else {
        console.log('Response not OK', response.status);
        setErrorMessage('Email or password are incorrect');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setErrorMessage('Email or password are incorrect');
    }
  };

  return (
    <div className="LoginPage">
      <Header />
      <div className="LoginPage-body">
        <div className="LoginPage-left">
          <img src="/photos/CameraWithStand.png" alt="Login Side" className="LoginPage-image" />
          <h2 className="LoginPage-title">Log In to MovieMe!</h2>
        </div>
        <div className="LoginPage-right">
          <form className="LoginPage-form" onSubmit={handleLogin}>
            <label htmlFor="email" className="LoginPage-label">Email</label>
            <input
              type="email"
              id="email"
              className="LoginPage-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="password" className="LoginPage-label">Password</label>
            <input
              type="password"
              id="password"
              className="LoginPage-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="LoginPage-button">Log In</button>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
