import React from "react";
import { useSelector } from "react-redux";
import Header from "./Header";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import usePopularMovies from "../hooks/usePopularMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import useGenres from "../hooks/useGenres";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";

const Browse = () => {
  // Fetch all data which will be stored in the Redux store
  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();
  useGenres();

  // Get the most critical movie list for the initial render
  const popularMovies = useSelector((store) => store.movies.popularMovies);

  // Show a loading screen until the critical data is available
  if (!popularMovies) {
    return (
      <div className="absolute inset-0 bg-black flex items-center justify-center z-[200]">
        <div className="w-12 h-12 border-4 border-white/20 border-t-myflix-red rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="relative bg-black">
      <Header />
      <div className="relative">
        <MainContainer />
        <SecondaryContainer />
      </div>
    </div>
  );
};

export default Browse;
