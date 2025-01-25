import React, { useState, useEffect } from "react";
import styles from "./Series.module.css";
import { fetchTrendingSeries, fetchSeriesByGenre } from "../../Services/GlobalApi";

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
  const [selectedSeries, setSelectedSeries] = useState(null);

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

  const handleCardClick = (series) => {
    setSelectedSeries(series);
  };

  const closeDetailsPanel = () => {
    setSelectedSeries(null);
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
              onClick={() => handleCardClick(series)}
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
                onClick={() => handleCardClick(series)}
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

      {/* Details Panel */}
      {selectedSeries && (
        <div className={styles.detailsPanel}>
          <div
            className={styles.detailsBackdrop}
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original${selectedSeries.backdrop_path})`,
            }}
          />
          <div className={styles.detailsContentWrapper}>
            <button className={styles.closeDetailsBtn} onClick={closeDetailsPanel}>
              ✖
            </button>
            <img
              className={styles.detailsPoster}
              src={`https://image.tmdb.org/t/p/w500${selectedSeries.poster_path}`}
              alt={selectedSeries.name}
            />
            <div className={styles.detailsContent}>
              <h2>{selectedSeries.name}</h2>
              <p>{selectedSeries.overview}</p>
              <p>
                <strong>Rating:</strong> {selectedSeries.vote_average}
              </p>
              <p>
                <strong>First Air Date:</strong> {selectedSeries.first_air_date}
              </p>
              {/* Placeholder for cast section */}
              <div className={styles.castSection}>
                <h3>Cast:</h3>
                <p>Fetching cast information...</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Series;
