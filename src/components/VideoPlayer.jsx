import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import YouTube from "react-youtube";

const VideoPlayer = ({ selectedMovieId = null }) => {
  const { nowPlayingMovies, popularMovies } = useSelector(
    (store) => store.movies
  );
  const [videoKey, setVideoKey] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currentMovie, setCurrentMovie] = useState(null);
  const [player, setPlayer] = useState(null);
  const [isMuted, setIsMuted] = useState(false);

  // Get movie to display
  useEffect(() => {
    const moviesArray = nowPlayingMovies || popularMovies;
    if (!moviesArray || moviesArray.length === 0) return;

    if (selectedMovieId) {
      // Find the selected movie from Now Playing first, then fallback to popular
      const selected = moviesArray.find(
        (movie) => movie.id === selectedMovieId
      );
      setCurrentMovie(selected || moviesArray[0]);
    } else {
      // Show random movie from Now Playing by default
      const randomIndex = Math.floor(
        Math.random() * Math.min(moviesArray.length, 20)
      );
      setCurrentMovie(moviesArray[randomIndex]);
    }
  }, [selectedMovieId, nowPlayingMovies, popularMovies]);

  // Fetch video trailer for current movie
  useEffect(() => {
    const fetchTrailer = async () => {
      if (!currentMovie?.id) return;

      setIsLoading(true);
      setError(false);

      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${currentMovie.id}/videos?language=en-US`,
          {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
            },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch video");

        const data = await response.json();

        // Find trailer or teaser
        const trailer =
          data.results?.find(
            (video) => video.type === "Trailer" && video.site === "YouTube"
          ) ||
          data.results?.find(
            (video) => video.type === "Teaser" && video.site === "YouTube"
          ) ||
          data.results?.[0];

        if (trailer) {
          setVideoKey(trailer.key);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Error fetching trailer:", err);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrailer();
  }, [currentMovie?.id]);

  const onReady = (event) => {
    setPlayer(event.target);
    if (isMuted) {
      event.target.mute();
    } else {
      event.target.unMute();
    }
  };

  const toggleMute = () => {
    if (!player) return;
    if (isMuted) {
      player.unMute();
      setIsMuted(false);
    } else {
      player.mute();
      setIsMuted(true);
    }
  };

  if (!currentMovie) {
    return (
      <div className="w-full h-[50vh] sm:h-[60vh] lg:h-[70vh] bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-white/30 border-t-red-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/60 text-lg">Loading movies...</p>
        </div>
      </div>
    );
  }

  const opts = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 1,
      controls: 1,
      modestbranding: 1,
      rel: 0,
      iv_load_policy: 3,
      fs: 0,
      disablekb: 1,
      cc_load_policy: 0,
      loop: 1,
      playlist: videoKey,
    },
  };

  return (
    <section className="w-full bg-black relative overflow-hidden">
      {/* Section Header */}
      <div className="px-6 sm:px-12 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              {selectedMovieId ? "Now Watching" : "Featured Trailer"}
            </h2>
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          </div>

          {/* Sound Toggle Button */}
          <button
            onClick={toggleMute}
            className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 transition-all duration-300"
          >
            {isMuted ? (
              <svg
                className="w-5 h-5 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
              </svg>
            ) : (
              <svg
                className="w-5 h-5 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
              </svg>
            )}
            <span className="text-white text-sm font-medium hidden sm:inline">
              {isMuted ? "Unmute" : "Mute"}
            </span>
          </button>
        </div>

        {/* Instruction Text */}
        {!selectedMovieId && (
          <p className="text-white/60 text-sm mb-4">Click any movie above</p>
        )}
      </div>

      {/* Video Container */}
      <div className="relative w-full h-[50vh] sm:h-[60vh] lg:h-[70vh]">
        {isLoading ? (
          // Loading State
          <div className="w-full h-full bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
            <div className="text-center">
              <div className="w-12 h-12 border-2 border-white/30 border-t-red-500 rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-white/60 text-lg">Loading trailer...</p>
            </div>
          </div>
        ) : error || !videoKey ? (
          // Error State - Show movie poster as fallback
          <div className="relative w-full h-full">
            <img
              src={`https://image.tmdb.org/t/p/original${currentMovie.backdrop_path}`}
              alt={currentMovie.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="text-center bg-black/60 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <svg
                  className="w-16 h-16 text-white/60 mx-auto mb-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
                <h3 className="text-white text-xl font-bold mb-2">
                  {currentMovie.title}
                </h3>
                <p className="text-white/70">Trailer not available</p>
              </div>
            </div>
          </div>
        ) : (
          // Video Player with Sound
          <div className="relative w-full h-full">
            <YouTube
              videoId={videoKey}
              opts={opts}
              onReady={onReady}
              className="w-full h-full"
            />

            {/* Video Overlay Info */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6 sm:p-8">
              <div className="max-w-6xl">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h2 className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold mb-3">
                      {currentMovie.title}
                    </h2>
                    <div className="flex flex-wrap items-center gap-4 text-white/80 text-sm sm:text-base mb-4">
                      <span className="flex items-center space-x-1">
                        <span className="text-yellow-400">★</span>
                        <span>{currentMovie.vote_average?.toFixed(1)}</span>
                      </span>
                      <span>•</span>
                      <span>
                        {new Date(currentMovie.release_date).getFullYear()}
                      </span>
                      <span>•</span>
                      <span className="bg-red-600/80 px-3 py-1 rounded-full text-xs font-medium">
                        {selectedMovieId
                          ? "Selected from Now Playing"
                          : "Random Pick"}
                      </span>
                    </div>
                    {currentMovie.overview && (
                      <p className="text-white/90 text-sm sm:text-base leading-relaxed max-w-3xl hidden md:block">
                        {currentMovie.overview.length > 200
                          ? `${currentMovie.overview.substring(0, 200)}...`
                          : currentMovie.overview}
                      </p>
                    )}
                  </div>

                  {/* Quick Action Buttons */}
                  <div className="flex items-center space-x-3 ml-6">
                    <button className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full border border-white/20 transition-all duration-300 group">
                      <svg
                        className="w-5 h-5 text-white group-hover:text-pink-400 transition-colors"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                    </button>
                    <button className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full border border-white/20 transition-all duration-300 group">
                      <svg
                        className="w-5 h-5 text-white group-hover:text-blue-400 transition-colors"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black to-transparent pointer-events-none"></div>
    </section>
  );
};

export default VideoPlayer;
