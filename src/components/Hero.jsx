import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { IMG_CDN_URL } from "../utils/Constants";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";

const Hero = () => {
  useNowPlayingMovies();

  const movies = useSelector((store) => store.movies?.nowPlayingMovies);
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);

  useEffect(() => {
    if (!movies) return;
    const timer = setInterval(() => {
      setCurrentMovieIndex((prevIndex) => (prevIndex + 1) % movies.length);
    }, 7000); // Change movie every 7 seconds

    return () => clearInterval(timer);
  }, [movies]);

  if (!movies || movies.length === 0) {
    return (
      <div className="w-full h-screen bg-black flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-myflix-red"></div>
      </div>
    );
  }

  const currentMovie = movies[currentMovieIndex];
  const { title, overview, vote_average, release_date } = currentMovie;

  return (
    <div
      className="relative w-full h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.8) 20%, transparent 80%), url(${IMG_CDN_URL}${currentMovie.backdrop_path})`,
      }}
    >
      <div className="absolute inset-0 flex flex-col justify-center px-4 sm:px-8 lg:px-16 text-white">
        <div className="w-full md:w-1/2 lg:w-1/3 space-y-6">
          <div className="flex items-center space-x-4 text-sm text-gray-300">
            <span>1h 45m</span>
            <div className="flex items-center space-x-2">
              <svg
                className="w-4 h-4 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.368 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.368-2.448a1 1 0 00-1.176 0l-3.368 2.448c-.784.57-1.838-.197-1.54-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.301 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z" />
              </svg>
              <span>{vote_average?.toFixed(1)}</span>
            </div>
            <span>Action | Drama | Romance</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            {title}
          </h1>

          <div className="flex items-center space-x-4">
            <button
              className="flex items-center justify-center px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105"
              style={{
                background: "#FF1313",
                boxShadow: "0 0 25px rgba(255, 19, 19, 0.5)",
              }}
            >
              <svg
                className="w-6 h-6 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm3.5 3.5a.5.5 0 01.5.5v7a.5.5 0 01-.832.374l-4.5-3.5a.5.5 0 010-.748l4.5-3.5A.5.5 0 017.5 6.5z" />
              </svg>
              Watch Now
            </button>
            <button className="p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333V17a1 1 0 001 1h6.333a2 2 0 001.942-1.516l1.29-4.839A2 2 0 0014.667 8H12V5.5a1.5 1.5 0 00-3 0V8H8a2 2 0 00-2 2.333z" />
              </svg>
            </button>
            <button className="p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M18 9.5a1.5 1.5 0 11-3 0v-6a1.5 1.5 0 013 0v6zM14 9.667V3a1 1 0 00-1-1H6.667a2 2 0 00-1.942 1.516l-1.29 4.839A2 2 0 005.333 12H8v2.5a1.5 1.5 0 003 0V12h1a2 2 0 002-2.333z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex space-x-2">
        {movies.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentMovieIndex(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              currentMovieIndex === index
                ? "w-8 bg-myflix-red"
                : "w-4 bg-gray-500"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Hero;
