import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import MainHeader from '../../components/MainHeader/MainHeader';
import './MoviePage.css';

function MoviePage() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const apiUrl = process.env.REACT_APP_API_BASE_URL || '';

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const email = Cookies.get('email');
      const password = Cookies.get('password');

      const headers = new Headers();
      headers.set('Authorization', 'Basic ' + btoa(email + ':' + password));

      try {
        const response = await fetch(`${apiUrl}/movie/id/${id}`, {
          method: 'GET',
          headers: headers,
          cache: 'no-store', // Ensure no caching
        });

        if (response.ok) {
          const data = await response.json();
          setMovie(data);
        } else {
          console.error('Failed to fetch movie details', response.status);
        }
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchMovieDetails();
  }, [apiUrl, id]);

  const handleAddToList = async (listType) => {
    const email = Cookies.get('email');
    const password = Cookies.get('password');

    const headers = new Headers();
    headers.set('Authorization', 'Basic ' + btoa(email + ':' + password));

    try {
      const response = await fetch(`${apiUrl}/library/${id}/${listType}`, {
        method: 'PUT',
        headers: headers,
        cache: 'no-store', // Ensure no caching
      });

      if (response.ok) {
        alert('Added to library');
      } else {
        console.error('Failed to add to list', response.status);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  if (!movie) {
    return <div>Loading...</div>;
  }

    return (
        <div className='MoviePage-with-header'>
            <MainHeader />
            <div className="MoviePage">
                <div className="MoviePage-content">
                    <h1 className="MoviePage-title">{movie.title}</h1>
                    <div className="MoviePage-details">
                        <p>Year: {movie.year}</p>
                        <p>IMDB Rating: {movie.imdbRating}</p>
                        <p>Runtime: {movie.runtime} mins</p>
                        <p>Genre: {movie.genre1}, {movie.genre2}</p>
                    </div>
                </div>
                <div className="MoviePage-buttons">
                    <button className="MoviePage-button" onClick={() => handleAddToList(1)}>I have watched this</button>
                    <button className="MoviePage-button" onClick={() => handleAddToList(2)}>Add to watch list</button>
                </div>
            </div>
        </div>
    );
}

export default MoviePage;