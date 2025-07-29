import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS, NOW_PLAYING_API } from "../utils/Constants";
import { addNowPlayingMovies } from "../utils/MoviesSlice";
import { logger } from "../utils/logger";

const useNowPlayingMovies = () => {
  const dispatch = useDispatch();

  const getNowPlayingMovies = async () => {
    try {
      const data = await fetch(NOW_PLAYING_API, API_OPTIONS);
      if (!data.ok) {
        throw new Error(`HTTP error! status: ${data.status}`);
      }
      const json = await data.json();
      dispatch(addNowPlayingMovies(json.results));
    } catch (error) {
      logger.error("Error fetching now playing movies:", error);
    }
  };

  useEffect(() => {
    getNowPlayingMovies();
  }, []);
};

export default useNowPlayingMovies;
