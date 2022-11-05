import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  AiOutlineClose,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
} from "react-icons/ai";
import Poster from "../../main/poster";
import FilmFinder from "./filmFinder";

function FilmFavorites() {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const [movieFormData, setMovieData] = useState({
    movie:
      user.Settings.favorite_movies.length > 0
        ? user.Settings.favorite_movies
        : null,
    counter:
      user.Settings.favorite_movies.length - 4 >= 0
        ? user.Settings.favorite_movies.length - 4
        : 0,
  });

  const { movie, counter } = movieFormData;

  const onSubmit = (e) => {
    e.preventDefault();
    // const reqData = {
    //   film: { id, tmdb_id},
    //   token: user.Token,
    // };
    // dispatch(ManageFavoriteMovies(reqData));
  };

  // const updateMovie = (e) => {
  //   const temp = movieFormData.movie.map((obj) => {
  //     if (obj.tmdb_id === e) {
  //       return { ...obj, tmdb_id: null };
  //     }
  //     return obj;
  //   });
  //   setMovieData((prevState) => ({
  //     ...prevState,
  //     movie: temp,
  //   }));
  // };

  const removeMovie = (id) => {
    setMovieData({
      movie: movie
        .filter(function (movie) {
          return movie.tmdb_id !== id;
        })
        .map((obj, index) => {
          return { ...obj, order: index + 1 };
        }),
    });
  };

  const changeOrder = (id, index, ascend) => {
    //if ascend true, subtract from obj.order
    //if ascend false, index to obj.order
    if (ascend) {
      setMovieData({
        movie: movie
          .map((obj, i) => {
            if (i === index) {
              return { ...obj, order: obj.order - 1 };
            } else if (i === index - 1) {
              return { ...obj, order: obj.order + 1 };
            } else {
              return obj;
            }
          })
          .sort((a, b) => (a.order > b.order ? 1 : -1)),
      });
    } else {
      setMovieData({
        movie: movie
          .map((obj, i) => {
            if (i === index) {
              return { ...obj, order: obj.order + 1 };
            } else if (i === index + 1) {
              return { ...obj, order: obj.order - 1 };
            } else {
              return obj;
            }
          })
          .sort((a, b) => (a.order > b.order ? 1 : -1)),
      });
    }
  };

  useEffect(() => {
    setMovieData((prevState) => ({
      ...prevState,
      counter: 4 - movie.length,
    }));
  }, [movie, dispatch]);

  return (
    <>
      <ul>
        {movie ? (
          <>
            {movie.map((movie, index) => (
              <li key={movie.tmdb_id}>
                {movie.tmdb_id ? (
                  <>
                    {/* <h6>{movie.order}</h6> */}
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
                    {movie.order > 1 ? (
                      <button
                        className="sort-button left"
                        type="button"
                        onClick={(e) => {
                          changeOrder(movie.tmdb_id, index, true);
                        }}
                      >
                        <AiOutlineArrowLeft />
                      </button>
                    ) : (
                      ""
                    )}
                    {movie.order < 4 &&
                    movieFormData.movie.length - movie.order !== 0 ? (
                      <button
                        className="sort-button right"
                        type="button"
                        onClick={(e) => {
                          changeOrder(movie.tmdb_id, index, false);
                        }}
                      >
                        <AiOutlineArrowRight />
                      </button>
                    ) : (
                      ""
                    )}
                  </>
                ) : (
                  <FilmFinder />
                )}
              </li>
            ))}
            {[...Array(counter)].map((counter, index) => (
              <li key={index}>
                <FilmFinder />
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
