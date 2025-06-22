import { useSelector } from "react-redux";
import MovieList from "./MovieList";
import Trending from "./Trending";

const SecondaryContainer = () => {
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
            isGenreList
          />
        )}
        <MovieList title={"Now Playing"} movies={nowPlayingMovies} />
        <MovieList title={"Top Rated Movies"} movies={topRatedMovies} />
        <MovieList title={"Popular"} movies={popularMovies} />
        <MovieList title={"Upcoming Movies"} movies={upcomingMovies} />
      </div>
    </div>
  );
};

export default SecondaryContainer;
