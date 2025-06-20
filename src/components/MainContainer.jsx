import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { IMG_CDN_URL_ORIGINAL } from "../utils/Constants";
import { getGenreNames } from "../utils/GenreUtils";
import { formatReleaseDate, getYear } from "../utils/DateUtils";

const MainContainer = () => {
  // Combine all selectors into one to reduce hooks
  const { popularMovies, genres } = useSelector((store) => ({
    popularMovies: store.movies?.popularMovies,
    genres: store.movies?.genres
  }));
  
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
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
    original_language
  } = currentMovie;

  // Get dynamic genre names
  const genreNames = getGenreNames(genre_ids, genres);

  const goToMovie = (index) => {
    if (index === currentMovieIndex || isTransitioning) return;
    
    setIsTransitioning(true);
    
    // Synchronized transition - both image and text change together
    setTimeout(() => {
      setCurrentMovieIndex(index);
      setIsTransitioning(false);
    }, 1000); // Match this with CSS transition duration
  };

  // Auto-scroll effect with synchronized transitions
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentMovieIndex + 1) % 3;
      goToMovie(nextIndex);
    }, 7000);

    return () => clearInterval(interval);
  }, [currentMovieIndex]);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Images with synchronized crossfade */}
      <div className="absolute inset-0 z-0">
        <img
          key={currentMovieIndex} // This ensures image changes with content
          src={IMG_CDN_URL_ORIGINAL + backdrop_path}
          alt={title}
          className={`w-full h-full object-cover transform transition-all duration-1000 ease-in-out ${
            isTransitioning 
              ? 'scale-110 opacity-0 blur-sm' 
              : 'scale-105 opacity-100 blur-0'
          }`}
        />
        
        {/* Synchronized overlays */}
        <div className={`absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent transition-opacity duration-1000 ${
          isTransitioning ? 'opacity-60' : 'opacity-80'
        }`}></div>
        <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/40 transition-opacity duration-1000 ${
          isTransitioning ? 'opacity-60' : 'opacity-100'
        }`}></div>
        <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-transparent to-purple-900/20 transition-opacity duration-1000"></div>
      </div>

      {/* Synchronized Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className={`px-6 sm:px-12 max-w-4xl transition-all duration-1000 ease-in-out transform ${
          isTransitioning 
            ? 'translate-x-12 opacity-0 blur-sm scale-95' 
            : 'translate-x-0 opacity-100 blur-0 scale-100'
        }`}>
          
          {/* Movie Metadata */}
          <div className="mb-6">
            <div className="flex flex-wrap items-center gap-4 text-white/80 text-sm font-medium">
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full border border-white/20">
                <span>{getYear(release_date)}</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full border border-white/20">
                <span>{original_language?.toUpperCase()}</span>
              </div>
              <div className="flex items-center space-x-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm px-3 py-1 rounded-full border border-purple-300/30">
                <span>🔥 {Math.round(popularity)}</span>
              </div>
            </div>
          </div>

          {/* Rating and Genres */}
          <div className="flex items-center space-x-6 mb-8">
            <div className="flex items-center space-x-2 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 backdrop-blur-sm px-4 py-2 rounded-full border border-yellow-300/30">
              <span className="text-yellow-400 text-xl animate-pulse">★</span>
              <span className="text-white font-bold text-lg">
                {vote_average?.toFixed(1)}
              </span>
              <span className="text-white/70 text-sm">
                ({vote_count?.toLocaleString()})
              </span>
            </div>
            <div className="text-white/70 text-sm bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
              {genreNames}
            </div>
          </div>

          {/* Title */}
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-white mb-8 leading-[0.9]">
            <span className="bg-gradient-to-r from-white via-white to-gray-300 text-transparent bg-clip-text drop-shadow-2xl">
              {title}
            </span>
          </h1>

          {/* Overview */}
          {overview && (
            <p className="text-white/90 text-lg sm:text-xl mb-10 leading-relaxed max-w-3xl font-light">
              {overview.length > 180 ? `${overview.substring(0, 180)}...` : overview}
            </p>
          )}

          {/* Release Date */}
          <div className="mb-10">
            <p className="text-white/60 text-base bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10 inline-block">
              🗓️ Released: {formatReleaseDate(release_date)}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-5">
            <button className="group flex items-center px-10 py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white rounded-full transition-all duration-500 transform hover:scale-110 hover:shadow-2xl hover:shadow-red-500/30 active:scale-95">
              <svg className="w-6 h-6 mr-3 transition-transform duration-300 group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              <span className="font-semibold text-lg">Watch Now</span>
            </button>
            
            <button className="group flex items-center px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 hover:border-white/40 text-white rounded-full transition-all duration-500 transform hover:scale-105 hover:shadow-xl">
              <svg className="w-6 h-6 mr-3 transition-transform duration-300 group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-medium">More Info</span>
            </button>
            
            <button className="group p-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 hover:border-pink-300/50 text-white rounded-full transition-all duration-500 transform hover:scale-110 hover:shadow-lg">
              <svg className="w-6 h-6 transition-all duration-300 group-hover:fill-pink-400 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Dots Only */}
      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex space-x-4 z-20">
        {[0, 1, 2].map((index) => (
          <button
            key={index}
            onClick={() => goToMovie(index)}
            disabled={isTransitioning}
            className={`relative transition-all duration-700 ease-out transform ${
              index === currentMovieIndex
                ? "w-16 h-3 bg-gradient-to-r from-red-500 to-red-600 shadow-lg shadow-red-500/50 scale-100"
                : "w-10 h-3 bg-white/30 hover:bg-white/50 hover:scale-110 active:scale-95"
            } rounded-full overflow-hidden`}
          >
            {/* Active dot progress animation */}
            {index === currentMovieIndex && (
              <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent animate-pulse rounded-full"></div>
            )}
          </button>
        ))}
      </div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 pointer-events-none z-5">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/10 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default MainContainer;
