import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { IMG_CDN_URL_ORIGINAL } from "../utils/Constants";
import { getGenreNames } from "../utils/GenreUtils";
import { formatReleaseDate, getYear } from "../utils/DateUtils";

const MainContainer = ({ currentMovieIndex, setCurrentMovieIndex }) => {
  // Select state individually to prevent unnecessary re-renders
  const popularMovies = useSelector((store) => store.movies.popularMovies);
  const genres = useSelector((store) => store.movies.genres);

  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Early return if no data
  if (!popularMovies || popularMovies.length === 0) {
    return (
      <div className="relative w-full h-screen bg-black flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
      </div>
    );
  }

  // Get first 3 popular movies
  const featuredMovies = popularMovies.slice(0, 3);
  const currentMovie = featuredMovies[currentMovieIndex];

  if (!currentMovie) {
    return (
      <div className="relative w-full h-screen bg-black flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
      </div>
    );
  }

  const {
    title,
    overview,
    backdrop_path,
    vote_average,
    vote_count,
    genre_ids,
    release_date,
    popularity,
    original_language,
  } = currentMovie;

  // Get dynamic genre names
  const genreNames = getGenreNames(genre_ids, genres);

  // Handle initial load animation - only start after image loads
  useEffect(() => {
    if (imageLoaded && isInitialLoad) {
      const timer = setTimeout(() => {
        setIsInitialLoad(false);
      }, 300); // Delay to ensure smooth entrance

      return () => clearTimeout(timer);
    }
  }, [imageLoaded, isInitialLoad]);

  // Reset image loaded state when movie changes
  useEffect(() => {
    setImageLoaded(false);
  }, [currentMovieIndex]);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const goToMovie = (index) => {
    if (index === currentMovieIndex || isTransitioning) return;

    setIsTransitioning(true);
    setImageLoaded(false); // Reset for new image

    // Synchronized transition
    setTimeout(() => {
      setCurrentMovieIndex(index);
      setIsTransitioning(false);
    }, 1200);
  };

  // Auto-scroll effect
  useEffect(() => {
    if (isInitialLoad || !imageLoaded) return;

    const interval = setInterval(() => {
      const nextIndex = (currentMovieIndex + 1) % 3;
      goToMovie(nextIndex);
    }, 8000); // Increased interval

    return () => clearInterval(interval);
  }, [currentMovieIndex, isInitialLoad, imageLoaded]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black pt-16 sm:pt-20">
      {/* Background Images with entrance and transition animations */}
      <div className="absolute inset-0 z-0">
        <img
          key={currentMovieIndex}
          src={IMG_CDN_URL_ORIGINAL + backdrop_path}
          alt={title}
          onLoad={handleImageLoad}
          className={`w-full h-full object-cover transform transition-all duration-1500 ease-out ${
            !imageLoaded || isInitialLoad
              ? "scale-125 opacity-0 blur-xl"
              : isTransitioning
              ? "scale-120 opacity-0 blur-lg"
              : "scale-105 opacity-100 blur-0"
          }`}
        />

        {/* Responsive Overlays */}
        <div
          className={`absolute inset-0 bg-gradient-to-r from-black/95 via-black/60 to-transparent transition-all duration-1500 ease-out ${
            !imageLoaded || isInitialLoad
              ? "opacity-100"
              : isTransitioning
              ? "opacity-70"
              : "opacity-85"
          }`}
        ></div>
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/95 via-transparent to-black/50 transition-all duration-1500 ease-out ${
            !imageLoaded || isInitialLoad
              ? "opacity-100"
              : isTransitioning
              ? "opacity-70"
              : "opacity-100"
          }`}
        ></div>
        <div
          className={`absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-purple-900/30 transition-all duration-1800 ease-out ${
            !imageLoaded || isInitialLoad ? "opacity-0" : "opacity-100"
          }`}
        ></div>
      </div>

      {/* Responsive Content Container */}
      <div className="relative z-10 h-full flex items-center">
        <div
          className={`px-4 sm:px-6 lg:px-12 max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl transition-all duration-1400 ease-out transform ${
            !imageLoaded || isInitialLoad
              ? "translate-x-20 opacity-0 blur-md scale-90"
              : isTransitioning
              ? "translate-x-16 opacity-0 blur-sm scale-95"
              : "translate-x-0 opacity-100 blur-0 scale-100"
          }`}
        >
          {/* Movie Metadata */}
          <div
            className={`mb-4 sm:mb-6 transition-all duration-1600 ease-out delay-300 transform ${
              !imageLoaded || isInitialLoad
                ? "translate-y-12 opacity-0"
                : "translate-y-0 opacity-100"
            }`}
          >
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-white/80 text-xs sm:text-sm font-medium">
              <div className="flex items-center space-x-1 sm:space-x-2 bg-white/10 backdrop-blur-sm px-2 sm:px-3 py-1 rounded-full border border-white/20">
                <span>{getYear(release_date)}</span>
              </div>
              <div className="flex items-center space-x-1 sm:space-x-2 bg-white/10 backdrop-blur-sm px-2 sm:px-3 py-1 rounded-full border border-white/20">
                <span>{original_language?.toUpperCase()}</span>
              </div>
              <div className="flex items-center space-x-1 sm:space-x-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm px-2 sm:px-3 py-1 rounded-full border border-purple-300/30">
                <span className="text-xs sm:text-sm">
                  🔥 {Math.round(popularity)}
                </span>
              </div>
            </div>
          </div>

          {/* Rating and Genres */}
          <div
            className={`flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 lg:space-x-6 mb-6 sm:mb-8 transition-all duration-1600 ease-out delay-500 transform ${
              !imageLoaded || isInitialLoad
                ? "translate-y-12 opacity-0"
                : "translate-y-0 opacity-100"
            }`}
          >
            <div className="flex items-center space-x-2 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-full border border-yellow-300/30">
              <span className="text-yellow-400 text-lg sm:text-xl animate-pulse">
                ★
              </span>
              <span className="text-white font-bold text-sm sm:text-lg">
                {vote_average?.toFixed(1)}
              </span>
              <span className="text-white/70 text-xs sm:text-sm">
                ({vote_count?.toLocaleString()})
              </span>
            </div>
            <div className="text-white/70 text-xs sm:text-sm bg-white/5 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-full border border-white/10">
              {genreNames}
            </div>
          </div>

          {/* Title */}
          <h1
            className={`text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white mb-4 sm:mb-6 leading-[0.9] transition-all duration-1700 ease-out delay-700 transform ${
              !imageLoaded || isInitialLoad
                ? "translate-y-16 opacity-0 scale-90"
                : "translate-y-0 opacity-100 scale-100"
            }`}
          >
            <span className="bg-gradient-to-r from-white via-white to-gray-300 text-transparent bg-clip-text drop-shadow-2xl">
              {title}
            </span>
          </h1>

          {/* Overview */}
          {overview && (
            <p
              className={`text-white/90 text-sm sm:text-base lg:text-lg mb-6 sm:mb-8 leading-relaxed max-w-full font-light transition-all duration-1600 ease-out delay-900 transform ${
                !imageLoaded || isInitialLoad
                  ? "translate-y-12 opacity-0"
                  : "translate-y-0 opacity-100"
              }`}
            >
              <span className="block sm:hidden">
                {overview.length > 120
                  ? `${overview.substring(0, 120)}...`
                  : overview}
              </span>
              <span className="hidden sm:block md:hidden">
                {overview.length > 200
                  ? `${overview.substring(0, 200)}...`
                  : overview}
              </span>
              <span className="hidden md:block">{overview}</span>
            </p>
          )}

          {/* Release Date */}
          <div
            className={`mb-6 sm:mb-10 transition-all duration-1600 ease-out delay-1100 transform ${
              !imageLoaded || isInitialLoad
                ? "translate-y-12 opacity-0"
                : "translate-y-0 opacity-100"
            }`}
          >
            <p className="text-white/60 text-xs sm:text-sm lg:text-base bg-white/5 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-full border border-white/10 inline-block">
              🗓️ Released: {formatReleaseDate(release_date)}
            </p>
          </div>

          {/* Action Buttons */}
          <div
            className={`flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-3 lg:space-x-5 transition-all duration-1700 ease-out delay-1300 transform ${
              !imageLoaded || isInitialLoad
                ? "translate-y-16 opacity-0 scale-85"
                : "translate-y-0 opacity-100 scale-100"
            }`}
          >
            {/* Watch Button */}
            <button className="group flex items-center justify-center px-6 sm:px-8 lg:px-10 py-3 sm:py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white rounded-full transition-all duration-500 transform hover:scale-105 sm:hover:scale-110 hover:shadow-2xl hover:shadow-red-500/30 active:scale-95 w-full sm:w-auto">
              <svg
                className="w-4 h-4 sm:w-5 lg:w-6 mr-2 sm:mr-3 transition-transform duration-300 group-hover:scale-110"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
              <span className="font-semibold text-sm sm:text-base lg:text-lg">
                Watch Trailer
              </span>
            </button>

            {/* Secondary Buttons */}
            <div className="flex space-x-3 w-full sm:w-auto">
              <button className="group flex items-center justify-center px-4 sm:px-6 lg:px-8 py-3 sm:py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 hover:border-white/40 text-white rounded-full transition-all duration-500 transform hover:scale-105 hover:shadow-xl flex-1 sm:flex-none">
                <svg
                  className="w-4 h-4 sm:w-5 lg:w-6 mr-2 sm:mr-3 transition-transform duration-300 group-hover:rotate-12"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="font-medium text-sm sm:text-base hidden sm:inline">
                  More Info
                </span>
                <span className="font-medium text-sm sm:hidden">Info</span>
              </button>

              <button className="group p-3 sm:p-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 hover:border-pink-300/50 text-white rounded-full transition-all duration-500 transform hover:scale-110 hover:shadow-lg">
                <svg
                  className="w-4 h-4 sm:w-5 lg:w-6 transition-all duration-300 group-hover:fill-pink-400 group-hover:scale-110"
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
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Dots */}
      <div
        className={`absolute bottom-8 sm:bottom-12 lg:bottom-16 left-1/2 transform -translate-x-1/2 flex space-x-2 sm:space-x-4 z-20 transition-all duration-1800 ease-out delay-1500 ${
          !imageLoaded || isInitialLoad
            ? "translate-y-12 opacity-0"
            : "translate-y-0 opacity-100"
        }`}
      >
        {[0, 1, 2].map((index) => (
          <button
            key={index}
            onClick={() => goToMovie(index)}
            disabled={isTransitioning || isInitialLoad || !imageLoaded}
            className={`relative transition-all duration-700 ease-out transform ${
              index === currentMovieIndex
                ? "w-12 sm:w-16 h-2 sm:h-3 bg-gradient-to-r from-red-500 to-red-600 shadow-lg shadow-red-500/50 scale-100"
                : "w-8 sm:w-10 h-2 sm:h-3 bg-white/30 hover:bg-white/50 hover:scale-110 active:scale-95"
            } rounded-full overflow-hidden`}
          >
            {index === currentMovieIndex && (
              <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent animate-pulse rounded-full"></div>
            )}
          </button>
        ))}
      </div>

      {/* Floating particles */}
      <div
        className={`absolute inset-0 pointer-events-none z-5 transition-opacity duration-2500 delay-2000 hidden sm:block ${
          !imageLoaded || isInitialLoad ? "opacity-0" : "opacity-100"
        }`}
      >
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/10 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default MainContainer;
