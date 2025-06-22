import { IMG_CDN_URL } from "../utils/Constants";

const MovieCard = ({ posterPath, title, movieId, onClick }) => {
  if (!posterPath) return null;

  const handleClick = () => {
    if (onClick) {
      onClick(movieId);
    }
  };

  return (
    <div
      className="flex-shrink-0 w-40 sm:w-48 transform hover:scale-105 transition-all duration-300 cursor-pointer"
      onClick={handleClick}
    >
      <img
        alt={title}
        src={IMG_CDN_URL + posterPath}
        className="rounded-lg shadow-lg hover:shadow-2xl"
      />
    </div>
  );
};

export default MovieCard;
