import React, { useState, useEffect } from "react";
import styles from "./Series.module.css";
import { fetchTrendingSeries, fetchSeriesByGenre, fetchSeriesTrailer } from "../../Services/GlobalApi";

const genres = [
  { id: 18, name: "Drama" },
  { id: 35, name: "Comedy" },
  { id: 10759, name: "Action" },
  { id: 16, name: "Animation" },
];

const Series = () => {
  const [featuredSeries, setFeaturedSeries] = useState(null);
  const [trendingSeries, setTrendingSeries] = useState([]);
  const [seriesByGenre, setSeriesByGenre] = useState({});
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const trending = await fetchTrendingSeries();
        setTrendingSeries(trending.slice(0, 10));
        setFeaturedSeries(trending[0]);

        const genreData = {};
        for (let genre of genres) {
          const series = await fetchSeriesByGenre(genre.id);
          genreData[genre.name] = series.slice(0, 10);
        }
        setSeriesByGenre(genreData);
      } catch (error) {
        console.error("Error fetching series:", error);
      }
    };
    fetchData();
  }, []);

  const handleTrailerClick = async (seriesId) => {
    try {
      const trailer = await fetchSeriesTrailer(seriesId);
      setTrailerUrl(trailer);
    } catch (error) {
      console.error("Error fetching trailer:", error);
    }
  };

  const closeTrailer = () => {
    setTrailerUrl("");
  };

  return (
    <div className={styles.seriesPage}>
      {/* Hero Section */}
      {featuredSeries && (
        <div
          className={styles.hero}
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${featuredSeries.backdrop_path})`,
          }}
        >
          <div className={styles.heroContent}>
            <h1>{featuredSeries.name}</h1>
            <p>{featuredSeries.overview}</p>
            <button
              className={styles.watchNowBtn}
              onClick={() => handleTrailerClick(featuredSeries.id)}
            >
              Watch Now
            </button>
          </div>
        </div>
      )}

      {/* Trending Series */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Trending Series</h2>
        <div className={styles.trendingCarousel}>
          {trendingSeries.map((series) => (
            <div
              className={styles.card}
              key={series.id}
              onClick={() => handleTrailerClick(series.id)}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${series.poster_path}`}
                alt={series.name}
              />
              <h3>{series.name}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* Series by Genre */}
      {Object.keys(seriesByGenre).map((genre) => (
        <div className={styles.section} key={genre}>
          <h2 className={styles.sectionTitle}>{genre}</h2>
          <div className={styles.genreGrid}>
            {seriesByGenre[genre].map((series) => (
              <div
                className={styles.card}
                key={series.id}
                onClick={() => handleTrailerClick(series.id)}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${series.poster_path}`}
                  alt={series.name}
                />
                <h3>{series.name}</h3>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Trailer Modal */}
      {trailerUrl && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <iframe
              width="100%"
              height="500"
              src={`https://www.youtube.com/embed/${trailerUrl}`}
              title="Series Trailer"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <button className={styles.closeModal} onClick={closeTrailer}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Series;
