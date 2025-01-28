import React, { useState } from "react";
import { searchMovies, fetchSimilarMovies } from "../../Services/GlobalApi";
import "./Search.css";

const Search = () => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (query.trim() === "") return;

    setLoading(true);

    // Fetch search results
    const results = await searchMovies(query);
    setSearchResults(results);

    // Fetch similar movies for the first result
    if (results.length > 0) {
      const movieId = results[0].id;
      const similarResults = await fetchSimilarMovies(movieId);
      setSimilarMovies(similarResults);
    }

    setLoading(false);
  };

  const handleClearSearch = () => {
    setQuery("");
    setSearchResults([]);
    setSimilarMovies([]);
  };

  const handleTrendingClick = async (tag) => {
    setQuery(tag);
    setLoading(true);

    // Fetch search results
    const results = await searchMovies(tag);
    setSearchResults(results);

    // Fetch similar movies for the first result
    if (results.length > 0) {
      const movieId = results[0].id;
      const similarResults = await fetchSimilarMovies(movieId);
      setSimilarMovies(similarResults);
    }

    setLoading(false);
  };

  return (
    <div className="search-page">
      <div className="search-container">
        <h1>Search for Your Favorite Movies and Shows</h1>
        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Type to search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit">Search</button>
          <button type="button" onClick={handleClearSearch} className="clear-button">
            Clear
          </button>
        </form>
        <div className="trending">
          <h2>Trending Searches</h2>
          <div className="trending-tags">
            {["Frozen", "Avengers", "Star Wars", "The Mandalorian", "Encanto"].map((tag) => (
              <span key={tag} onClick={() => handleTrendingClick(tag)}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
      {loading && <div className="loading-spinner"></div>}
      {searchResults.length > 0 && (
        <div className="results-container">
          <h2>Search Results</h2>
          <div className="results-grid">
            {searchResults.map((result) => (
              <div key={result.id} className="result-card">
                <img
                  src={`https://image.tmdb.org/t/p/w300${result.poster_path}`}
                  alt={result.title}
                />
                <div className="result-details">
                  <p>{result.title}</p>
                  <p>Release Date: {result.release_date}</p>
                  <p>Rating: {result.vote_average}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {similarMovies.length > 0 && (
        <div className="results-container">
          <h2>Similar Movies</h2>
          <div className="results-grid">
            {similarMovies.map((movie) => (
              <div key={movie.id} className="result-card">
                <img
                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  alt={movie.title}
                />
                <div className="result-details">
                  <p>{movie.title}</p>
                  <p>Release Date: {movie.release_date}</p>
                  <p>Rating: {movie.vote_average}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;