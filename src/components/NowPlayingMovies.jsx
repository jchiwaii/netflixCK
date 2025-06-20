import React from "react";
import { useSelector } from "react-redux";
import { IMG_CDN_URL } from "../utils/Constants";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";

const NowPlayingMovies = () => {
  useNowPlayingMovies();

  const movies = useSelector((store) => store.movies);
  const { nowPlayingMovies, loading, error } = movies;

  if (loading) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-4">
        <p className="text-red-400">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-white text-xl mb-4">Now Playing Movies</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
        {nowPlayingMovies?.slice(0, 12).map((movie) => (
          <div key={movie.id} className="text-white">
            <img
              src={IMG_CDN_URL + movie.poster_path}
              alt={movie.title}
              className="rounded-lg w-full h-auto"
            />
            <p className="text-sm mt-2 truncate">{movie.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NowPlayingMovies;
