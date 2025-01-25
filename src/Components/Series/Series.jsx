import React, { useEffect, useState } from "react";
import "./Series.css";
import { fetchSeriesByGenre, fetchTrendingSeries } from "../../Services/GlobalApi";

const genres = [
  { id: 10759, name: "Action & Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 18, name: "Drama" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
];

const Series = () => {
  const [trendingSeries, setTrendingSeries] = useState([]);
  const [seriesByGenre, setSeriesByGenre] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const trending = await fetchTrendingSeries();
        setTrendingSeries(trending);

        const genreData = {};
        for (let genre of genres) {
          const series = await fetchSeriesByGenre(genre.id);
          genreData[genre.name] = series;
        }
        setSeriesByGenre(genreData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching series:", error);
        setLoading(false);
      }
    };

    fetchSeries();
  }, []);

  if (loading) {
    return <div className="loading">Loading series...</div>;
  }

  return (
    <div className="series-page">
      {/* Hero Section */}
      <div className="hero-banner">
        <h1>Discover the Best TV Series</h1>
        <p>Stream now and explore your favorites.</p>
        <button className="cta-button">Watch Now</button>
      </div>

      {/* Trending Series */}
      <div className="trending-section">
        <h2 className="section-title">Trending Series</h2>
        <div className="trending-slider">
          {trendingSeries.map((series) => (
            <div className="trending-card" key={series.id}>
              <img
                src={`https://image.tmdb.org/t/p/original${series.backdrop_path}`}
                alt={series.name}
                className="trending-image"
              />
              <h3>{series.name}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* Series by Genre */}
      {Object.keys(seriesByGenre).map((genre) => (
        <div className="genre-section" key={genre}>
          <h2 className="section-title">{genre}</h2>
          <div className="genre-grid">
            {seriesByGenre[genre]?.map((series) => (
              <div className="series-card" key={series.id}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${series.poster_path}`}
                  alt={series.name}
                  className="series-image"
                />
                <div className="series-info">
                  <h3>{series.name}</h3>
                  <p>{series.overview.slice(0, 100)}...</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Series;
