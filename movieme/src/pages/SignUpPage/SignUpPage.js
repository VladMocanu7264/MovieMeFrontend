import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUpPage.css';
import Header from '../../components/Header/Header';

function SignUpPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const apiUrl = process.env.REACT_APP_API_BASE_URL || '';

    const handleSignUp = async (e) => {
        e.preventDefault();

        const userRequestBody = {
            email: email,
            password: password,
            userName: userName,
        };

        try {
            const response = await fetch(`${apiUrl}/user/add`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': null,
                },
                body: JSON.stringify(userRequestBody),
            });

            if (response.ok) {
                console.log('User created successfully');
                navigate('/login');
            } else {
                console.log('Response not OK', response.status);
                setErrorMessage('Failed to create user. Please try again.');
            }
        } catch (error) {
            console.error('Fetch error:', error);
            setErrorMessage('Failed to create user. Please try again.');
        }
    };

    return (
        <div className="SignUpPage">
            <Header />
            <div className="SignUpPage-body">
                <div className="SignUpPage-left">
                    <img src="/photos/CameraWithStand.png" alt="Sign Up Side" className="SignUpPage-image" />
                    <h2 className="SignUpPage-title">Sign Up for MovieMe!</h2>
                </div>
                <div className="SignUpPage-right">
                    <form className="SignUpPage-form" onSubmit={handleSignUp}>
                        <label htmlFor="userName" className="SignUpPage-label">Username</label>
                        <input
                            type="text"
                            id="userName"
                            className="SignUpPage-input"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                        <label htmlFor="email" className="SignUpPage-label">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="SignUpPage-input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label htmlFor="password" className="SignUpPage-label">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="SignUpPage-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button type="submit" className="SignUpPage-button">Sign Up</button>
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignUpPage;