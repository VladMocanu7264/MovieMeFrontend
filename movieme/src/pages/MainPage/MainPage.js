import React, { useState } from 'react';
import Cookies from 'js-cookie';
import MainHeader from '../../components/MainHeader/MainHeader';
import Sidebar from '../../components/MainPageComponents/Sidebar/Sidebar';
import MovieBox from '../../components/MainPageComponents/MovieBox/MovieBox';
import SearchBar from '../../components/MainPageComponents/SearchBar/SearchBar';
import './MainPage.css';

function MainPage() {
  const [movies, setMovies] = useState([]);
  const apiUrl = process.env.REACT_APP_API_BASE_URL || '';

  const fetchMovies = async (url) => {
    const email = Cookies.get('email');
    const password = Cookies.get('password');

    const headers = new Headers();
    headers.set('Authorization', 'Basic ' + btoa(email + ':' + password));

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: headers,
        cache: 'no-store', // Ensure no caching
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Fetched movies:', data); // Debugging log
        setMovies(data);
      } else {
        console.error('Failed to fetch movies', response.status);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  const fetchMoviesByGenre = (genreName) => {
    fetchMovies(`${apiUrl}/genre/${genreName}`);
  };

  const fetchMoviesByName = (name) => {
    fetchMovies(`${apiUrl}/movie/${name}`);
  };

  return (
    <div className="MainPage">
      <MainHeader />
      <div className="MainPage-body">
        <Sidebar fetchMovies={fetchMoviesByGenre} />
        <div className="MainPage-right">
          <SearchBar onSearch={fetchMoviesByName} />
          {movies.map((movie, index) => (
            <MovieBox key={index} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default MainPage;