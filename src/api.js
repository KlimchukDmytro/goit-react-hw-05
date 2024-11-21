import axios from "axios";

const API_KEY = "70bce8241a1bf40d2b56194953e7084c";
const BASE_URL = "https://api.themoviedb.org/3";

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MGJjZTgyNDFhMWJmNDBkMmI1NjE5NDk1M2U3MDg0YyIsIm5iZiI6MTczMjEzMjQ3NC40NzE4NzM4LCJzdWIiOiI2NzNkOTA3MDA0YzZiMjBjNzQ2ZWZhNDYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.JA50dBBBga4HkC78RfbBDstRiJuu8tzEoLSgAa4SGho",
  },
});

export const fetchTrendingMovies = async () => {
  try {
    const { data } = await instance.get("/trending/movie/day");
    return data.results;
  } catch (error) {
    console.error("Error fetching trending movies:", error);
  }
};

export const fetchMoviesByQuery = async (query) => {
  try {
    const { data } = await instance.get("/search/movie", {
      params: { query, include_adult: false, language: "en-US", page: 1 },
    });
    return data.results;
  } catch (error) {
    console.error("Error fetching movies by query:", error);
  }
};

export const fetchMovieDetails = async (movieId) => {
  try {
    const { data } = await instance.get(`/movie/${movieId}`);
    return data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
  }
};

export const fetchMovieCredits = async (movieId) => {
  try {
    const { data } = await instance.get(`/movie/${movieId}/credits`);
    return data.cast;
  } catch (error) {
    console.error("Error fetching movie credits:", error);
  }
};

export const fetchMovieReviews = async (movieId) => {
  try {
    const { data } = await instance.get(`/movie/${movieId}/reviews`);
    return data.results;
  } catch (error) {
    console.error("Error fetching movie reviews:", error);
  }
};
