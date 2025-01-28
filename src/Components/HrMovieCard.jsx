import React from 'react';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original';
import "./HrMovieCard.css";

function HrMovieCard({ movie }) {
  return (
    <div className="hr-movie-card">
      <div className="hr-card-image-wrapper">
        <img
          src={IMAGE_BASE_URL + movie.backdrop_path}
          alt={movie.title}
          className="hr-card-image"
        />
        <div className="hr-card-overlay">
          <div className="hr-card-title">{movie.title}</div>
        </div>
      </div>
    </div>
  );
}

export default HrMovieCard;