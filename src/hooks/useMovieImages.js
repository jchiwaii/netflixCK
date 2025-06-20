import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS, getMovieImagesAPI } from "../utils/Constants";
import { addMovieImages, setLoading, setError } from "../utils/MoviesSlice";
import { useEffect } from "react";

const useMovieImages = (movieId) => {
  const dispatch = useDispatch();
  const movieImages = useSelector((store) => store.movies.movieImages);

  const getMovieImages = async () => {
    if (!movieId) return;

    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      const response = await fetch(getMovieImagesAPI(movieId), API_OPTIONS);
      const json = await response.json();

      dispatch(addMovieImages(json));
    } catch (error) {
      dispatch(setError(error.message));
      console.error("Error fetching movie images:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    // Only fetch if we don't already have the data and movieId exists
    if (!movieImages && movieId) {
      getMovieImages();
    }
  }, [movieId]);

  return movieImages;
};

export default useMovieImages;
