import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import MainHeader from '../../components/MainHeader/MainHeader';
import MovieBox from '../../components/MainPageComponents/MovieBox/MovieBox';
import './LibraryPage.css';

function LibraryPage() {
  const [watchedMovies, setWatchedMovies] = useState([]);
  const [watchListMovies, setWatchListMovies] = useState([]);
  const apiUrl = process.env.REACT_APP_API_BASE_URL || '';
  const userId = Cookies.get('userId');

  useEffect(() => {
    const fetchLibrary = async (listType) => {
      const email = Cookies.get('email');
      const password = Cookies.get('password');

      const headers = new Headers();
      headers.set('Authorization', 'Basic ' + btoa(email + ':' + password));

      try {
        const response = await fetch(`${apiUrl}/library/${userId}/${listType}`, {
          method: 'GET',
          headers: headers,
          cache: 'no-store', // Ensure no caching
        });

        if (response.ok) {
          const data = await response.json();
          return data.movies.map(entry => entry.element);
        } else {
          console.error('Failed to fetch library', response.status);
          return [];
        }
      } catch (error) {
        console.error('Fetch error:', error);
        return [];
      }
    };

    const fetchLibraries = async () => {
      const watched = await fetchLibrary(1);
      const watchList = await fetchLibrary(2);
      setWatchedMovies(watched);
      setWatchListMovies(watchList);
    };

    fetchLibraries();
  }, [apiUrl, userId]);

  return (
    <div className="LibraryPage">
      <MainHeader />
      <div className="LibraryPage-content">
        <h1 className="LibraryPage-title">My Library</h1>
        <div className="LibraryPage-lists">
          <div className="LibraryPage-list">
            <h2 className="LibraryPage-listTitle">I have watched this</h2>
            {watchedMovies.map((movie, index) => (
              <MovieBox key={index} movie={movie} />
            ))}
          </div>
          <div className="LibraryPage-list">
            <h2 className="LibraryPage-listTitle">I want to watch this</h2>
            {watchListMovies.map((movie, index) => (
              <MovieBox key={index} movie={movie} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LibraryPage;