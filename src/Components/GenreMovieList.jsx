import React from 'react';
import GenresList from '../Constant/GenresList';
import MovieList from './MovieList';
import "./GenreMovieList.css";

function GenreMovieList() {
  return (
    <div className="genre-movie-list">
      {GenresList.genere.map(
        (item, index) =>
          index <= 4 && (
            <div key={item.id} className="genre-section">
              <h2 className="genre-title">{item.name}</h2>
              <MovieList genreId={item.id} index_={index} />
            </div>
          )
      )}
    </div>
  );
}

export default GenreMovieList;