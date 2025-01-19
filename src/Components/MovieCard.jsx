import React from 'react';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original';

function MovieCard({ movie }) {
  return (
    <div className="movie-card">
      <img
        src={IMAGE_BASE_URL + movie.poster_path}
        alt={movie.title}
        className="movie-card-image"
      />
    </div>
  );
}

export default MovieCard;
