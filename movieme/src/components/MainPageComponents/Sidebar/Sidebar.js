import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import GenreButton from '../GenreButton/GenreButton';
import './Sidebar.css';

function Sidebar({ fetchMovies }) {
  const [genres, setGenres] = useState([]);
  const apiUrl = process.env.REACT_APP_API_BASE_URL || '';

  useEffect(() => {
    const fetchGenres = async () => {
      const email = Cookies.get('email');
      const password = Cookies.get('password');

      const headers = new Headers();
      headers.set('Authorization', 'Basic ' + btoa(email + ':' + password));

      try {
        const response = await fetch(`${apiUrl}/genre`, {
          method: 'GET',
          headers: headers,
          cache: 'no-store', // Ensure no caching
        });

        if (response.ok) {
          const data = await response.json();
          setGenres(data);
        } else {
          console.error('Failed to fetch genres', response.status);
        }
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchGenres();
  }, [apiUrl]);

  return (
    <div className="sidebar">
      {genres.map((genre, index) => (
        <GenreButton key={index} name={genre.name} onClick={() => fetchMovies(genre.name)} />
      ))}
    </div>
  );
}

export default Sidebar;