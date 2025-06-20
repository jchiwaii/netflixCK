import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS, NOW_PLAYING_API } from "../utils/Constants";
import {
  addNowPlayingMovies,
  setLoading,
  setError,
} from "../utils/MoviesSlice";
import { useEffect } from "react";

const useNowPlayingMovies = () => {
  const dispatch = useDispatch();
  const nowPlayingMovies = useSelector(
    (store) => store.movies.nowPlayingMovies
  );

  const getNowPlayingMovies = async () => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      const response = await fetch(NOW_PLAYING_API, API_OPTIONS);
      const json = await response.json();

      dispatch(addNowPlayingMovies(json.results));
    } catch (error) {
      dispatch(setError(error.message));
      console.error("Error fetching now playing movies:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    // Only fetch if we don't already have the data
    if (!nowPlayingMovies) {
      getNowPlayingMovies();
    }
  }, []);
};

export default useNowPlayingMovies;
