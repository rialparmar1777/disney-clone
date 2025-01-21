import axios from "axios";

const movieBaseUrl = "https://api.themoviedb.org/3";
const api_key = "2ec0d66f5bdf1dd12eefa0723f1479cf";

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