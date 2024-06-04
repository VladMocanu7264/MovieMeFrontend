import React from 'react';
import './MovieBox.css';

function MovieBox({ movie }) {
  if (!movie) {
    console.error('MovieBox received invalid movie:', movie);
    return null;
  }

  return (
    <div className="movie-box">
      <h3 className="movie-title">{movie.title}</h3>
    </div>
  );
}

export default MovieBox;