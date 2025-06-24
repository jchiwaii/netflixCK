import React, { useState } from "react";
import { useSelector } from "react-redux";
import MovieList from "./MovieList";
import Trending from "./Trending";
import VideoPlayer from "./VideoPlayer";

const SecondaryContainer = () => {
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const movies = useSelector((store) => store.movies);

  const {
    nowPlayingMovies,
    popularMovies,
    topRatedMovies,
    upcomingMovies,
    filteredMovies,
    selectedGenre,
    genres,
  } = movies;

  const handleMovieClick = (movieId) => {
    setSelectedMovieId(movieId);
    const videoSection = document.getElementById("video-player-section");
    if (videoSection) {
      videoSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const selectedGenreName =
    genres && selectedGenre
      ? genres.find((g) => g.id === selectedGenre)?.name
      : null;

  return (
    <div className="w-full bg-black">
      <Trending />
      <div className="pt-12 pb-24 space-y-12">
        {selectedGenreName && filteredMovies && (
          <MovieList
            title={selectedGenreName}
            movies={filteredMovies}
            onMovieClick={handleMovieClick}
          />
        )}
        <MovieList
          title={"Now Playing"}
          movies={nowPlayingMovies}
          onMovieClick={handleMovieClick}
        />
        <div id="video-player-section">
          <VideoPlayer selectedMovieId={selectedMovieId} />
        </div>
        <div id="top-rated-section">
          <MovieList
            title={"Top Rated Movies"}
            movies={topRatedMovies}
            onMovieClick={handleMovieClick}
          />
        </div>
        <MovieList
          title={"Popular"}
          movies={popularMovies}
          onMovieClick={handleMovieClick}
        />
        <MovieList
          title={"Upcoming Movies"}
          movies={upcomingMovies}
          onMovieClick={handleMovieClick}
        />
      </div>
    </div>
  );
};

export default SecondaryContainer;
