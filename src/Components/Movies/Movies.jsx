import React, { useEffect, useState } from "react";
import styles from "./Movies.module.css"; // Import styles as an object
import { fetchMoviesByGenre, fetchMovieTrailer } from "../../Services/GlobalApi";

const genres = [
  { id: 28, name: "Action" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 18, name: "Drama" },
  { id: 27, name: "Horror" },
];

const Movies = () => {
  const [featuredMovies, setFeaturedMovies] = useState([]);
  const [moviesByGenre, setMoviesByGenre] = useState({});
  const [trailerUrl, setTrailerUrl] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const genreData = {};
        for (let genre of genres) {
          const movies = await fetchMoviesByGenre(genre.id);
          genreData[genre.name] = movies;
        }
        setMoviesByGenre(genreData);
        setFeaturedMovies(genreData[genres[0].name]?.slice(0, 5) || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const handleTrailerClick = async (movieId) => {
    try {
      const trailer = await fetchMovieTrailer(movieId);
      setTrailerUrl(trailer);
    } catch (error) {
      console.error("Error fetching trailer:", error);
    }
  };

  const closeTrailer = () => {
    setTrailerUrl("");
  };

  if (loading) {
    return <div className={styles.loading}>Loading movies...</div>;
  }

  return (
    <div className={styles.moviesPage}>
      {trailerUrl && (
        <div className={styles.trailerModal}>
          <div className={styles.trailerContent}>
            <iframe
              width="100%"
              height="500"
              src={`https://www.youtube.com/embed/${trailerUrl}`}
              title="Movie Trailer"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <button className={styles.closeTrailer} onClick={closeTrailer}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* Featured Movies */}
      <div className={styles.featuredSection}>
        <h2 className={styles.sectionTitle}>Featured Movies</h2>
        <div className={styles.featuredSlider}>
          {featuredMovies.map((movie) => (
            <div
              className={styles.featuredCard}
              key={movie.id}
              onClick={() => handleTrailerClick(movie.id)}
            >
              <img
                src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                alt={movie.title}
                className={styles.featuredImage}
              />
              <div className={styles.featuredInfo}>
                <h3>{movie.title}</h3>
                <p>{movie.overview}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Movies by Genre */}
      {Object.keys(moviesByGenre).map((genre) => (
        <div className={styles.genreSection} key={genre}>
          <h2 className={styles.sectionTitle}>{genre}</h2>
          <div className={styles.genreGrid}>
            {moviesByGenre[genre]?.map((movie) => (
              <div
                className={styles.movieCard}
                key={movie.id}
                onClick={() => handleTrailerClick(movie.id)}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className={styles.movieImage}
                />
                <h3 className={styles.movieTitle}>{movie.title}</h3>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Movies;