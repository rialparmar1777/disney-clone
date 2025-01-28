import React from 'react';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original';
import "./MovieCard.css";

function MovieCard({ movie }) {
  return (
    <div className="movie-card">
      <div className="movie-card-image-wrapper">
        <img
          src={IMAGE_BASE_URL + movie.poster_path}
          alt={movie.title}
          className="movie-card-image"
        />
        <div className="movie-card-overlay">
          <div className="movie-card-title">{movie.title}</div>
          <div className="movie-card-rating">{movie.vote_average} / 10</div>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;