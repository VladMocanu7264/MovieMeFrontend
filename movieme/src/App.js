import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage/code/LandingPage';
import LoginPage from './pages/LoginPage/code/LoginPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import MainPage from './pages/MainPage/MainPage';
import MoviePage from './pages/MoviePage/MoviePage';
import LibraryPage from './pages/LibraryPage/LibraryPage';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import './index.css';

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/movie/:id" element={<MoviePage />} />
          <Route path="/library" element={<LibraryPage />} />
        </Routes>
      </ErrorBoundary>
    </Router>
  );
}

export default App;