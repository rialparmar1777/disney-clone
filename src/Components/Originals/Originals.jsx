import React, { useEffect, useState } from "react";
import { fetchMoviesByGenre } from "../../Services/GlobalApi";
import "./Originals.css";

const Originals = () => {
  const [originalMovies, setOriginalMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch Originals on Component Mount
  useEffect(() => {
    const fetchOriginals = async () => {
      // Disney Genre ID: 10751 (Family), adjust as necessary
      const movies = await fetchMoviesByGenre(10751);
      setOriginalMovies(movies);
      setFilteredMovies(movies);
    };
    fetchOriginals();
  }, []);

  // Filter Movies by Search Term
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = originalMovies.filter((movie) =>
      movie.title.toLowerCase().includes(value)
    );
    setFilteredMovies(filtered);
  };

  return (
    <div className="originals-page">
      {/* Header */}
      <div className="originals-header">
        <h1 className="originals-title">Disney Originals</h1>
        <input
          type="text"
          className="originals-search"
          placeholder="Search Originals..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      {/* Movie Grid */}
      <div className="originals-grid">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <div key={movie.id} className="originals-card">
              <img
                className="originals-image"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <div className="originals-info">
                <h2 className="originals-name">{movie.title}</h2>
                <p className="originals-overview">
                  {movie.overview
                    ? movie.overview.length > 120
                      ? `${movie.overview.slice(0, 120)}...`
                      : movie.overview
                    : "No description available."}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="loading-text">
            {searchTerm ? "No results found." : "Loading Disney Originals..."}
          </p>
        )}
      </div>
    </div>
  );
};

export default Originals;
