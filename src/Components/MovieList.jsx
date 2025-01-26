import React, { useEffect, useRef, useState } from 'react';
import { fetchMoviesByGenre } from '../Services/GlobalApi';
import MovieCard from './MovieCard';
import HrMovieCard from './HrMovieCard';
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';
import "./MovieList.css";

function MovieList({ genreId, index_ }) {
  const [movieList, setMovieList] = useState([]);
  const elementRef = useRef(null);

  useEffect(() => {
    getMoviesByGenre();
  }, []);

  const getMoviesByGenre = () => {
    fetchMoviesByGenre(genreId).then((results) => {
      setMovieList(results);
    });
  };

  const slideRight = () => {
    elementRef.current.scrollLeft += 500;
  };

  const slideLeft = () => {
    elementRef.current.scrollLeft -= 500;
  };

  return (
    <div className="movie-list-container">
      <IoChevronBackOutline
        onClick={slideLeft}
        className={`slider-arrow left ${
          index_ % 3 === 0 ? 'arrow-low' : 'arrow-high'
        }`}
      />
      <div ref={elementRef} className="movie-list">
        {movieList.map((item, index) => (
          <React.Fragment key={item.id}>
            {index_ % 3 === 0 ? (
              <HrMovieCard movie={item} />
            ) : (
              <MovieCard movie={item} />
            )}
          </React.Fragment>
        ))}
      </div>
      <IoChevronForwardOutline
        onClick={slideRight}
        className={`slider-arrow right ${
          index_ % 3 === 0 ? 'arrow-low' : 'arrow-high'
        }`}
      />
    </div>
  );
}

export default MovieList;