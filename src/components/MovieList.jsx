// filepath: /Users/user/Desktop/projects/netflixCK/src/components/MovieList.jsx
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  if (!movies) return null;

  return (
    <div className="px-6 sm:px-12 mb-12">
      <h1 className="text-2xl sm:text-3xl py-6 text-white font-medium">
        {title}
      </h1>
      <div className="flex overflow-x-scroll scrollbar-hide space-x-4 pb-4">
        <div className="flex space-x-4">
          {movies.map((movie) => (
            <MovieCard 
              key={movie.id} 
              posterPath={movie.poster_path} 
              title={movie.title} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
