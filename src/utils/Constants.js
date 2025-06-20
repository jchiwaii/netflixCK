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

// TMDB Image Base URLs
export const IMG_CDN_URL = "https://image.tmdb.org/t/p/w500";
