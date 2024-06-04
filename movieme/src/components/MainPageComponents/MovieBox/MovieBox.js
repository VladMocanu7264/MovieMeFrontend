import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MovieBox.css';

function MovieBox({ movie }) {
  const navigate = useNavigate();

  if (!movie) {
    console.error('MovieBox received invalid movie:', movie);
    return null;
  }

  const handleDetailsClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  return (
    <div className="movie-box">
      <h3 className="movie-title">{movie.title}</h3>
      <button onClick={handleDetailsClick} className="details-button">Details</button>
    </div>
  );
}

export default MovieBox;