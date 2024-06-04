import React from 'react';
import './GenreButton.css';

function GenreButton({ name, onClick }) {
  return (
    <button className="genre-button" onClick={onClick}>
      {name}
    </button>
  );
}

export default GenreButton;