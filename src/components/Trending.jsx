import React, { useRef, useState, useEffect } from "react";
import { FiTrendingUp } from "react-icons/fi";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { filterMoviesByGenre } from "../utils/MoviesSlice";

const Trending = () => {
  const dispatch = useDispatch();
  const { genres, selectedGenre } = useSelector((store) => store.movies);
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  React.useEffect(() => {
    if (genres && genres.length > 0 && !selectedGenre) {
      dispatch(filterMoviesByGenre(genres[0].id));
    }
  }, [genres, selectedGenre, dispatch]);

  // Check scroll position to show/hide buttons
  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(
        container.scrollLeft < container.scrollWidth - container.clientWidth
      );
    }
  };

  useEffect(() => {
    checkScrollPosition();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScrollPosition);
      return () => container.removeEventListener("scroll", checkScrollPosition);
    }
  }, [genres]);

  const handleGenreClick = (genreId) => {
    dispatch(filterMoviesByGenre(genreId));
  };

  const scrollLeft = () => {
    scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  if (!genres) return null;

  return (
    <section
      id="trending-section"
      className="relative z-20 px-6 sm:px-12 py-8 -mt-16"
    >
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 space-y-4 sm:space-y-0">
        {/* Title with Clean White Styling */}
        <div className="flex items-center space-x-3">
          <div className="relative">
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Trending
            </h2>
          </div>
          <div className="p-3 bg-gradient-to-r from-red-500/20 to-pink-500/20 backdrop-blur-sm rounded-full border border-red-300/30">
            <FiTrendingUp className="text-red-400" size={24} />
          </div>
        </div>
      </div>

      {/* Modern Separator */}
      <div className="relative mb-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/20"></div>
        </div>
        <div className="relative flex justify-center">
          <div className="bg-black/50 backdrop-blur-sm px-4 py-1 rounded-full border border-white/20">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse delay-100"></div>
              <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse delay-200"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Genre Selection with Enhanced Styling */}
      <div className="relative group">
        {/* Left Scroll Button - Only show when user can scroll left */}
        {canScrollLeft && (
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-lg"
          >
            <GrFormPrevious className="text-white" size={24} />
          </button>
        )}

        {/* Right Scroll Button - Always show initially if there's content to scroll */}
        {canScrollRight && (
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-lg"
          >
            <GrFormNext className="text-white" size={24} />
          </button>
        )}

        {/* Genre Pills Container */}
        <div
          ref={scrollContainerRef}
          className="flex space-x-4 overflow-x-auto scrollbar-hide scroll-smooth py-4"
        >
          {genres.map((genre, index) => (
            <button
              key={genre.id}
              onClick={() => handleGenreClick(genre.id)}
              className={`relative group/pill whitespace-nowrap px-6 py-3 rounded-full font-medium transition-all duration-500 transform hover:scale-105 ${
                selectedGenre === genre.id
                  ? "bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg shadow-red-500/30 border border-red-400/50"
                  : "bg-white/10 hover:bg-white/20 text-white/70 hover:text-white backdrop-blur-sm border border-white/20 hover:border-white/40"
              }`}
              style={{
                animationDelay: `${index * 50}ms`,
              }}
            >
              {/* Active indicator */}
              {selectedGenre === genre.id && (
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-full animate-pulse"></div>
              )}

              {/* Genre name */}
              <span className="relative z-10">{genre.name}</span>

              {/* Hover effect */}
              <div className="absolute inset-0 bg-white/5 rounded-full opacity-0 group-hover/pill:opacity-100 transition-opacity duration-300"></div>
            </button>
          ))}
        </div>

        {/* Gradient fade on the right */}
        <div className="absolute top-0 right-0 h-full w-16 bg-gradient-to-l from-black via-black/50 to-transparent pointer-events-none"></div>
      </div>

      {/* Subtitle */}
      <div className="mt-6 text-center">
        <p className="text-white/60 text-sm font-light">
          Choose a genre to explore trending movies
        </p>
      </div>
    </section>
  );
};

export default Trending;
