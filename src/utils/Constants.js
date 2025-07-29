// API Configuration
export const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYTNkYjkwNGE3MjJhZDllZGI5OWEyMGIzZTAyODE3OCIsIm5iZiI6MTc1MDQxOTc0Mi41NjMsInN1YiI6IjY4NTU0OTFlNjg4YmU1NjVhYzVkOGQ2NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UD1MClQpB1nzZD0UKvULtsO2ytKLVxJ3G5UbpMWLWNI",
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
