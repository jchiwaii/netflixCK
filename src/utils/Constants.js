export const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzODE1NjcxYzQ5NTJhNDIzNTRiNmQ1Y2Y5MTY0MDA2YSIsIm5iZiI6MTc1MDQxOTc0Mi41NjMsInN1YiI6IjY4NTU0OTFlNjg4YmU1NjVhYzVkOGQ2NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.U19mc6Em-1hGcn72U4UssD6s4ron2BFusuSPYRPOdaA",
  },
};

export const NOW_PLAYING_API =
  "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1";

// TMDB Image Base URLs
export const IMG_CDN_URL = "https://image.tmdb.org/t/p/w500";
