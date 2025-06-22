import React from "react";
import { FiTrendingUp } from "react-icons/fi";
import { BiLike } from "react-icons/bi";
import { FaRegStar } from "react-icons/fa";
import { CgAdd } from "react-icons/cg";
import { GrFormNext } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { filterMoviesByGenre } from "../utils/MoviesSlice";

const Trending = () => {
  const dispatch = useDispatch();
  const { genres, selectedGenre } = useSelector((store) => store.movies);

  React.useEffect(() => {
    if (genres && genres.length > 0 && !selectedGenre) {
      dispatch(filterMoviesByGenre(genres[0].id));
    }
  }, [genres, selectedGenre, dispatch]);

  const handleGenreClick = (genreId) => {
    dispatch(filterMoviesByGenre(genreId));
  };

  if (!genres) return null;

  return (
    <div className="p-4 md:p-8">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <h2 className="text-2xl font-bold text-white">Trending</h2>
          <FiTrendingUp className="text-white ml-2" size={24} />
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center text-gray-400 hover:text-white cursor-pointer">
            <BiLike className="mr-1" />
            <span>Popular</span>
          </div>
          <div className="flex items-center text-gray-400 hover:text-white cursor-pointer">
            <FaRegStar className="mr-1" />
            <span>Trailers</span>
          </div>
          <div className="flex items-center text-gray-400 hover:text-white cursor-pointer">
            <CgAdd className="mr-1" />
            <span>Recently Added</span>
          </div>
        </div>
      </div>
      <div className="border-b border-gray-600 mb-4"></div>
      <div className="relative">
        <div className="flex space-x-2 overflow-x-auto scrollbar-hide">
          {genres.map((genre) => (
            <button
              key={genre.id}
              onClick={() => handleGenreClick(genre.id)}
              className={`${
                selectedGenre === genre.id
                  ? "bg-red-600 text-white"
                  : "bg-gray-800 text-gray-400"
              } px-4 py-2 rounded-full hover:bg-gray-700 whitespace-nowrap`}
            >
              {genre.name}
            </button>
          ))}
        </div>
        <div className="absolute top-0 right-0 h-full flex items-center bg-gradient-to-l from-black to-transparent px-4">
          <GrFormNext size={24} className="text-white cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default Trending;
