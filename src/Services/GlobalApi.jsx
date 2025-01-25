import axios from "axios";

const movieBaseUrl = "https://api.themoviedb.org/3";
const api_key = "2ec0d66f5bdf1dd12eefa0723f1479cf";

/* MOVIE-SPECIFIC METHODS */
export const fetchMoviesByGenre = async (genreId) => {
  try {
    const url = `${movieBaseUrl}/discover/movie?api_key=${api_key}&with_genres=${genreId}`;
    const response = await axios.get(url);
    return response.data.results; // Array of movies
  } catch (error) {
    console.error("Error fetching movies by genre:", error);
    return [];
  }
};

export const searchMovies = async (query) => {
  try {
    const url = `${movieBaseUrl}/search/movie?api_key=${api_key}&query=${query}`;
    const response = await axios.get(url);
    return response.data.results; // Array of movies
  } catch (error) {
    console.error("Error searching movies:", error);
    return [];
  }
};

export const fetchSimilarMovies = async (movieId) => {
  try {
    const url = `${movieBaseUrl}/movie/${movieId}/similar?api_key=${api_key}`;
    const response = await axios.get(url);
    return response.data.results; // Array of similar movies
  } catch (error) {
    console.error("Error fetching similar movies:", error);
    return [];
  }
};

export const fetchMovieTrailer = async (movieId) => {
  try {
    const url = `${movieBaseUrl}/movie/${movieId}/videos?api_key=${api_key}`;
    const response = await axios.get(url);
    const trailers = response.data.results.filter(
      (video) => video.type === "Trailer" && video.site === "YouTube"
    );
    return trailers.length > 0 ? trailers[0].key : "";
  } catch (error) {
    console.error("Error fetching movie trailer:", error);
    throw error;
  }
};

/* SERIES-SPECIFIC METHODS */
export const fetchTrendingSeries = async () => {
  try {
    const url = `${movieBaseUrl}/trending/tv/week?api_key=${api_key}`;
    const response = await axios.get(url);
    return response.data.results; // Array of trending series
  } catch (error) {
    console.error("Error fetching trending series:", error);
    return [];
  }
};

export const fetchSeriesByGenre = async (genreId) => {
  try {
    const url = `${movieBaseUrl}/discover/tv?api_key=${api_key}&with_genres=${genreId}`;
    const response = await axios.get(url);
    return response.data.results; // Array of series by genre
  } catch (error) {
    console.error("Error fetching series by genre:", error);
    return [];
  }
};

export const fetchSeriesTrailer = async (seriesId) => {
  try {
    const url = `${movieBaseUrl}/tv/${seriesId}/videos?api_key=${api_key}`;
    const response = await axios.get(url);
    const trailers = response.data.results.filter(
      (video) => video.type === "Trailer" && video.site === "YouTube"
    );
    return trailers.length > 0 ? trailers[0].key : "";
  } catch (error) {
    console.error("Error fetching series trailer:", error);
    throw error;
  }
};

export const fetchSimilarSeries = async (seriesId) => {
  try {
    const url = `${movieBaseUrl}/tv/${seriesId}/similar?api_key=${api_key}`;
    const response = await axios.get(url);
    return response.data.results; // Array of similar series
  } catch (error) {
    console.error("Error fetching similar series:", error);
    return [];
  }
};
