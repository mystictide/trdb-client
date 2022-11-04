import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AiFillPlusSquare } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import Poster from "../../main/poster";
import FilmFinder from "./filmFinder";

function FilmFavorites() {
  const dispatch = useDispatch();

  useEffect(() => {}, [dispatch]);

  const { user } = useSelector((state) => state.auth);
  const [movieFormData, setMovieData] = useState({
    movie:
      user.Settings.favorite_movies.length > 0
        ? user.Settings.favorite_movies
        : null,
  });

  const { movie } = movieFormData;

  const onSubmit = (e) => {
    e.preventDefault();
    // const reqData = {
    //   film: { id, tmdb_id},
    //   token: user.Token,
    // };
    // dispatch(ManageFavoriteMovies(reqData));
  };

  const updateMovie = (e) => {
    const temp = movieFormData.movie.map((obj) => {
      if (obj.tmdb_id === e) {
        return { ...obj, tmdb_id: null };
      }
      return obj;
    });
    setMovieData((prevState) => ({
      ...prevState,
      movie: temp,
    }));
  };

  const removeMovie = (e) => {
    const temp = movieFormData.movie.map((obj) => {
      if (obj.tmdb_id === e) {
        return { ...obj, tmdb_id: null };
      }
      return obj;
    });
    setMovieData((prevState) => ({
      ...prevState,
      movie: temp,
    }));
  };

  return (
    <>
      <ul>
        {movie ? (
          <>
            {movie.map((movie, index) => (
              <li key={movie.id} draggable>
                {movie.tmdb_id ? (
                  <>
                    <Poster movie={movie} />
                    <button
                      className="remove-button"
                      type="button"
                      onClick={(e) => {
                        removeMovie(movie.tmdb_id);
                      }}
                    >
                      <AiOutlineClose />
                    </button>
                  </>
                ) : (
                  <FilmFinder />
                )}
              </li>
            ))}
          </>
        ) : (
          <>
            <li>
              <FilmFinder />
            </li>
            <li>
              <FilmFinder />
            </li>
            <li>
              <FilmFinder />
            </li>
            <li>
              <FilmFinder />
            </li>
          </>
        )}
      </ul>
    </>
  );
}

export default FilmFavorites;
