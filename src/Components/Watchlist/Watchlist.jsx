import React, { useEffect, useState } from "react";
import { fetchMoviesByGenre, searchMovies } from "../../Services/GlobalApi";
import styles from "./Watchlist.module.css";
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

  const removeMovie = (movieId) => {
    if (window.confirm("Are you sure you want to remove this movie?")) {
      const updatedMovies = movies.filter((movie) => movie.id !== movieId);
      setMovies(updatedMovies);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>My Watchlist</h1>

      {/* Search Bar */}
      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Search movies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={styles.searchInput}
        />
        <button onClick={handleSearch} className={styles.searchButton}>
          Search
        </button>
      </div>

      {/* Genre Filter */}
      <div className={styles.genreFilter}>
        <button onClick={() => setGenreId(null)}>All</button>
        <button onClick={() => setGenreId(28)}>Action</button>
        <button onClick={() => setGenreId(35)}>Comedy</button>
        <button onClick={() => setGenreId(18)}>Drama</button>
      </div>

      {/* Movie Grid */}
      <div className={styles.movieGrid}>
        {movies.map((movie) => (
          <div key={movie.id} className={styles.movieCard}>
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
              className={styles.moviePoster}
            />
            <div className={styles.movieInfo}>
              <h3 className={styles.movieTitle}>{movie.title}</h3>
              <button
                className={styles.detailsButton}
                onClick={() => fetchMovieDetails(movie.id)}
              >
                View Details
              </button>
              <button
                className={styles.removeButton}
                onClick={() => removeMovie(movie.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Movie Details */}
      {selectedMovie && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h2>{selectedMovie.title}</h2>
            <p className={styles.movieOverview}>{selectedMovie.overview}</p>
            <p>
              <strong>IMDB Rating:</strong>{" "}
              <span className={styles.ratingBadge}>
                {selectedMovie.vote_average} / 10
              </span>
            </p>
            <button onClick={closeModal} className={styles.closeModalButton}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Watchlist;