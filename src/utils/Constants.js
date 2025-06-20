// Check if API key exists
if (!import.meta.env.VITE_TMDB_API_KEY) {
  throw new Error("TMDB API key not found in environment variables");
}

export const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
  },
};

export const NOW_PLAYING_API =
  "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1";
export const POPULAR_MOVIES_API =
  "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc";
export const GENRE_API =
  "https://api.themoviedb.org/3/genre/movie/list?language=en";

// Function to get movie images API URL
export const getMovieImagesAPI = (movieId) =>
  `https://api.themoviedb.org/3/movie/${movieId}/images`;

// TMDB Image Base URLs
export const IMG_CDN_URL = "https://image.tmdb.org/t/p/w500";
export const IMG_CDN_URL_ORIGINAL = "https://image.tmdb.org/t/p/original";
