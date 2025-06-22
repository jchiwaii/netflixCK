import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlayingMovies: null,
    popularMovies: null,
    topRatedMovies: null,
    upcomingMovies: null,
    movieImages: null,
    genres: null,
    filteredMovies: null,
    selectedGenre: null,
    loading: false,
    error: null,
  },
  reducers: {
    addNowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },
    addPopularMovies: (state, action) => {
      state.popularMovies = action.payload;
    },
    addTopRatedMovies: (state, action) => {
      state.topRatedMovies = action.payload;
    },
    addUpcomingMovies: (state, action) => {
      state.upcomingMovies = action.payload;
    },
    addMovieImages: (state, action) => {
      state.movieImages = action.payload;
    },
    addGenres: (state, action) => {
      state.genres = action.payload;
    },
    filterMoviesByGenre: (state, action) => {
      const genreId = action.payload;
      state.selectedGenre = genreId;
      const allMovies = [
        ...(state.nowPlayingMovies || []),
        ...(state.popularMovies || []),
        ...(state.topRatedMovies || []),
        ...(state.upcomingMovies || []),
      ];
      const uniqueMovies = Array.from(
        new Map(allMovies.map((movie) => [movie.id, movie])).values()
      );
      state.filteredMovies = uniqueMovies.filter((movie) =>
        movie.genre_ids.includes(genreId)
      );
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  addNowPlayingMovies,
  addPopularMovies,
  addTopRatedMovies,
  addUpcomingMovies,
  addMovieImages,
  addGenres,
  filterMoviesByGenre,
  setLoading,
  setError,
} = moviesSlice.actions;
export default moviesSlice.reducer;
