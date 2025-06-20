import { useSelector } from "react-redux";
import { IMG_CDN_URL_ORIGINAL } from "../utils/Constants";
import useMovieImages from "../hooks/useMovieImages";
import React, { useState, useEffect } from "react";
import { getGenreNames } from "../utils/GenreUtils";
import { formatReleaseDate, getYear } from "../utils/DateUtils";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);

  // Ensure hooks are called unconditionally at the top level
  const movieToDisplay = movies?.[currentMovieIndex];
  const movieImages = useMovieImages(movieToDisplay?.id);

  useEffect(() => {
    if (!movies || movies.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentMovieIndex((prevIndex) => (prevIndex + 1) % movies.length);
    }, 7000);

    return () => clearInterval(timer);
  }, [movies]);

  if (!movieToDisplay) return null; // Guard clause after hooks

  const { original_title, overview, vote_average } = movieToDisplay;
  const backgroundImage =
    movieImages?.backdrops?.[0]?.file_path || movieToDisplay.backdrop_path;

  return (
    <div className="relative w-full h-screen font-outfit">
      {/* Background Image and Gradients */}
      <div className="absolute inset-0 z-0">
        <img
          src={IMG_CDN_URL_ORIGINAL + backgroundImage}
          alt={original_title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center px-6 sm:px-12 max-w-2xl">
        <div className="space-y-6">
          <div className="flex items-center space-x-4 text-sm text-gray-300">
            <span>1h 45m</span>
            <div className="flex items-center space-x-2">
              <span className="text-yellow-400 text-lg">★</span>
              <span className="font-medium">{vote_average.toFixed(1)}</span>
            </div>
            <span>Action | Drama | Romance</span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight">
            {original_title}
          </h1>

          <div className="flex items-center space-x-4">
            <button
              className="flex items-center px-8 py-3 bg-myflix-red text-white rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105"
              style={{ boxShadow: "0 0 25px rgba(255, 19, 19, 0.6)" }}
            >
              <svg
                className="w-5 h-5 mr-3"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
              Watch Now
            </button>
            <button className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white rounded-full transition-all duration-300">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2H9a2 2 0 00-2 2v15a2 2 0 002 2h2a2 2 0 002-2v-5l-3 2v-3l3-2z" />
              </svg>
            </button>
            <button className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white rounded-full transition-all duration-300">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M10 18.5a1.5 1.5 0 11-3 0v-6a1.5 1.5 0 013 0v6zM6 6.5V3a1 1 0 011-1h6.333a2 2 0 011.942 1.516l1.29 4.839A2 2 0 0114.667 12H12v2.5a1.5 1.5 0 01-3 0V12H8a2 2 0 01-2-2.333z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Centered Pagination */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
        {movies.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentMovieIndex(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              currentMovieIndex === index
                ? "w-8 bg-myflix-red shadow-red-glow"
                : "w-4 bg-white/40 hover:bg-white/60"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default MainContainer;
