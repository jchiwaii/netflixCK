import React from "react";
import { useSelector } from "react-redux";
import { IMG_CDN_URL } from "../utils/Constants";

const NowPlayingMovies = ({ onMovieSelect }) => {
  const nowPlayingMovies = useSelector(
    (store) => store.movies.nowPlayingMovies
  );

  if (!nowPlayingMovies) return null;

  const handleMovieClick = (movie) => {
    if (onMovieSelect) {
      onMovieSelect(movie.id);
    }
  };

  return (
    <section className="relative z-20 px-6 sm:px-12 py-8">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-white">
          Now Playing
        </h2>
        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
      </div>

      {/* Movies Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
        {nowPlayingMovies.map((movie) => (
          <div
            key={movie.id}
            onClick={() => handleMovieClick(movie)}
            className="group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:z-10"
          >
            <div className="relative overflow-hidden rounded-xl bg-gray-800">
              {/* Movie Poster */}
              <img
                src={IMG_CDN_URL + movie.poster_path}
                alt={movie.title}
                className="w-full h-auto aspect-[2/3] object-cover transition-transform duration-300 group-hover:scale-110"
                loading="lazy"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-center p-4">
                  <svg
                    className="w-12 h-12 text-white mx-auto mb-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  <p className="text-white text-sm font-medium">
                    Watch Trailer
                  </p>
                </div>
              </div>

              {/* Rating Badge */}
              <div className="absolute top-2 right-2 bg-black/80 backdrop-blur-sm px-2 py-1 rounded-full">
                <span className="text-yellow-400 text-xs font-bold">
                  ★ {movie.vote_average?.toFixed(1)}
                </span>
              </div>
            </div>

            {/* Movie Info */}
            <div className="mt-3">
              <h3 className="text-white text-sm font-medium line-clamp-2 group-hover:text-red-400 transition-colors">
                {movie.title}
              </h3>
              <p className="text-white/60 text-xs mt-1">
                {new Date(movie.release_date).getFullYear()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NowPlayingMovies;
