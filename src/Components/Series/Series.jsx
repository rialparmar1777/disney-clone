import React, { useEffect, useState } from "react";
import styles from "./Series.module.css"; // Import styles as an object
import { fetchMoviesByGenre, fetchMovieTrailer } from "../../Services/GlobalApi";

const genres = [
  { id: 10759, name: "Action & Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 18, name: "Drama" },
  { id: 10765, name: "Sci-Fi & Fantasy" },
];

const Series = () => {
  const [featuredSeries, setFeaturedSeries] = useState([]);
  const [seriesByGenre, setSeriesByGenre] = useState({});
  const [trailerUrl, setTrailerUrl] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const genreData = {};
        for (let genre of genres) {
          const series = await fetchMoviesByGenre(genre.id);
          genreData[genre.name] = series;
        }
        setSeriesByGenre(genreData);
        setFeaturedSeries(genreData[genres[0].name]?.slice(0, 5) || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching series:", error);
        setLoading(false);
      }
    };

    fetchSeries();
  }, []);

  const handleTrailerClick = async (seriesId) => {
    try {
      const trailer = await fetchMovieTrailer(seriesId);
      setTrailerUrl(trailer);
    } catch (error) {
      console.error("Error fetching trailer:", error);
    }
  };

  const closeTrailer = () => {
    setTrailerUrl("");
  };

  if (loading) {
    return <div className={styles.loading}>Loading series...</div>;
  }

  return (
    <div className={styles.seriesPage}>
      {trailerUrl && (
        <div className={styles.trailerModal}>
          <div className={styles.trailerContent}>
            <iframe
              width="100%"
              height="500"
              src={`https://www.youtube.com/embed/${trailerUrl}`}
              title="Series Trailer"
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

      {/* Featured Series */}
      <div className={styles.featuredSection}>
        <h2 className={styles.sectionTitle}>Featured Series</h2>
        <div className={styles.featuredSlider}>
          {featuredSeries.map((series) => (
            <div
              className={styles.featuredCard}
              key={series.id}
              onClick={() => handleTrailerClick(series.id)}
            >
              <img
                src={`https://image.tmdb.org/t/p/original${series.backdrop_path}`}
                alt={series.title}
                className={styles.featuredImage}
              />
              <div className={styles.featuredInfo}>
                <h3>{series.title}</h3>
                <p>{series.overview}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Series by Genre */}
      {Object.keys(seriesByGenre).map((genre) => (
        <div className={styles.genreSection} key={genre}>
          <h2 className={styles.sectionTitle}>{genre}</h2>
          <div className={styles.genreGrid}>
            {seriesByGenre[genre]?.map((series) => (
              <div
                className={styles.seriesCard}
                key={series.id}
                onClick={() => handleTrailerClick(series.id)}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${series.poster_path}`}
                  alt={series.title}
                  className={styles.seriesImage}
                />
                <h3 className={styles.seriesTitle}>{series.title}</h3>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Series;