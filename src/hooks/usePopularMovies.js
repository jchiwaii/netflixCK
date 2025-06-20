import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/Constants";
import { addPopularMovies } from "../utils/MoviesSlice";

const usePopularMovies = () => {
  const dispatch = useDispatch();

  const getPopularMovies = async () => {
    try {
      const data = await fetch(
        "https://api.themoviedb.org/3/movie/popular?page=1",
        API_OPTIONS
      );
      const json = await data.json();
      dispatch(addPopularMovies(json.results));
    } catch (error) {
      console.error("Failed to fetch popular movies:", error);
    }
  };

  useEffect(() => {
    getPopularMovies();
  }, []);
};

export default usePopularMovies;
