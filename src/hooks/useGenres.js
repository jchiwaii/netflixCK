import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS, GENRE_API } from "../utils/Constants";
import { addGenres, setLoading, setError } from "../utils/MoviesSlice";
import { useEffect } from "react";

const useGenres = () => {
  const dispatch = useDispatch();
  const genres = useSelector((store) => store.movies.genres);

  const getGenres = async () => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      const response = await fetch(GENRE_API, API_OPTIONS);
      const json = await response.json();

      dispatch(addGenres(json.genres));
    } catch (error) {
      dispatch(setError(error.message));
      console.error("Error fetching genres:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    // Only fetch if we don't already have the data
    if (!genres) {
      getGenres();
    }
  }, []);

  return genres;
};

export default useGenres;
