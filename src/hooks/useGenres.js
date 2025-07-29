import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS, GENRE_API } from "../utils/Constants";
import { addGenres } from "../utils/MoviesSlice";
import { logger } from "../utils/logger";

const useGenres = () => {
  const dispatch = useDispatch();

  const getGenres = async () => {
    try {
      const data = await fetch(GENRE_API, API_OPTIONS);
      if (!data.ok) {
        throw new Error(`HTTP error! status: ${data.status}`);
      }
      const json = await data.json();
      dispatch(addGenres(json.genres));
    } catch (error) {
      logger.error("Error fetching genres:", error);
    }
  };

  useEffect(() => {
    getGenres();
  }, []);
};

export default useGenres;
