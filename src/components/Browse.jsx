import React, { useState } from "react";
import Header from "./Header";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import usePopularMovies from "../hooks/usePopularMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import useGenres from "../hooks/useGenres";
import { useSelector } from "react-redux";

const Browse = () => {
  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();
  useGenres();

  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
  const popularMovies = useSelector((store) => store.movies.popularMovies);

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
        <MainContainer
          currentMovieIndex={currentMovieIndex}
          setCurrentMovieIndex={setCurrentMovieIndex}
        />
        <SecondaryContainer />
      </div>
    </div>
  );
};

export default Browse;
