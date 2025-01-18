import axios from "axios";

const movieBaseUrl = "https://api.themoviedb.org/3";
const api_key = "2ec0d66f5bdf1dd12eefa0723f1479cf";
const movieByGenreBaseURL = `${movieBaseUrl}/discover/movie?api_key=${api_key}`;

export const fetchMoviesByGenre = async (genreId) => {
  try {
    const url = `${movieByGenreBaseURL}&with_genres=${genreId}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.results; // Array of movies
  } catch (error) {
    console.error("Error fetching movies by genre:", error);
    return [];
  }
};