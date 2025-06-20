import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/Constants";
import { addUpcomingMovies } from "../utils/MoviesSlice";

const useUpcomingMovies = () => {
  const dispatch = useDispatch();

  const getUpcomingMovies = async () => {
    try {
      const data = await fetch(
        "https://api.themoviedb.org/3/movie/upcoming?page=1",
        API_OPTIONS
      );
      const json = await data.json();
      dispatch(addUpcomingMovies(json.results));
    } catch (error) {
      console.error("Failed to fetch upcoming movies:", error);
    }
  };

  useEffect(() => {
    getUpcomingMovies();
  }, []);
};

export default useUpcomingMovies;
