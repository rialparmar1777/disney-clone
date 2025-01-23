import React, { useEffect, useState } from "react";
import { fetchMoviesByGenre, searchMovies } from "../../Services/GlobalApi";
import "./Watchlist.css";
import axios from "axios";

const movieBaseUrl = "https://api.themoviedb.org/3";
const api_key = "2ec0d66f5bdf1dd12eefa0723f1479cf";

const Watchlist = () => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [genreId, setGenreId] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      const movieData = genreId
        ? await fetchMoviesByGenre(genreId)
        : await fetchMoviesByGenre(28);
      setMovies(movieData);
    };

    fetchMovies();
  }, [genreId]);

  const handleSearch = async () => {
    if (searchQuery) {
      const searchResults = await searchMovies(searchQuery);
      setMovies(searchResults);
    }
  };

  const fetchMovieDetails = async (movieId) => {
    try {
      const response = await axios.get(
        `${movieBaseUrl}/movie/${movieId}?api_key=${api_key}`
      );
      setSelectedMovie(response.data);
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  };

  const closeModal = () => {
    setSelectedMovie(null);
  };

  return (
    <div className="watchlist-container">
      <h1 className="watchlist-title">My Watchlist</h1>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search movies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {/* Genre Filter */}
      <div className="genre-filter">
        <button onClick={() => setGenreId(null)}>All</button>
        <button onClick={() => setGenreId(28)}>Action</button>
        <button onClick={() => setGenreId(35)}>Comedy</button>
        <button onClick={() => setGenreId(18)}>Drama</button>
      </div>

      {/* Movie Grid */}
      <div className="movie-grid">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
              className="movie-poster"
            />
            <div className="movie-info">
              <h3 className="movie-title">{movie.title}</h3>
              <button
                className="details-btn"
                onClick={() => fetchMovieDetails(movie.id)}
              >
                View Details
              </button>
              <button className="remove-btn">Remove</button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Movie Details */}
      {selectedMovie && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedMovie.title}</h2>
            <p className="movie-overview">{selectedMovie.overview}</p>
            <p>
              <strong>IMDB Rating:</strong>{" "}
              <span className="rating-badge">
                {selectedMovie.vote_average} / 10
              </span>
            </p>
            <button onClick={closeModal} className="close-modal-btn">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Watchlist;
