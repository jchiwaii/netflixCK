import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/Constants";
import { addTopRatedMovies } from "../utils/MoviesSlice";

const useTopRatedMovies = () => {
  const dispatch = useDispatch();

  const getTopRatedMovies = async () => {
    try {
      const data = await fetch(
        "https://api.themoviedb.org/3/movie/top_rated?page=1",
        API_OPTIONS
      );
      const json = await data.json();
      dispatch(addTopRatedMovies(json.results));
    } catch (error) {
      console.error("Failed to fetch top rated movies:", error);
    }
  };

  useEffect(() => {
    getTopRatedMovies();
  }, []);
};

export default useTopRatedMovies;
