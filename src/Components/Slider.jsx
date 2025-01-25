import React, { useState, useEffect } from "react";
import "./Slider.css";
import { fetchMoviesByGenre } from "../Services/GlobalApi";

const Slider = ({ genreId }) => {
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === movies.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? movies.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const getMovies = async () => {
      const data = await fetchMoviesByGenre(genreId); // Fetch movies for the selected genre
      setMovies(data);
    };
    getMovies();
  }, [genreId]);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000); // Auto-slide every 5 seconds
    return () => clearInterval(interval);
  }, [currentIndex]);

  if (movies.length === 0) return <p>Loading...</p>;

  return (
    <div className="slider">
      <button className="slider-btn prev" onClick={prevSlide}>
        &#10094;
      </button>
      <div
        className="slider-wrapper"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {movies.map((movie) => (
          <div className="slider-item" key={movie.id}>
            <div
              className="slider-background"
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
              }}
            >
              <div className="gradient-overlay"></div>
              <div className="slider-content">
                <h2 className="movie-title">{movie.title || movie.name}</h2>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className="slider-btn next" onClick={nextSlide}>
        &#10095;
      </button>
      <div className="dots">
        {movies.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentIndex ? "active" : ""}`}
            onClick={() => setCurrentIndex(index)}
          ></span>
        ))}
      </div>
      <div className="progress-bar"></div>
    </div>
  );
};

export default Slider;