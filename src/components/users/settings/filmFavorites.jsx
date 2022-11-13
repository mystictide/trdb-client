import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Poster from "../../main/poster";
import FilmFinder from "./filmFinder";
import { modalSlice } from "../../../features/helpers/modalSlice";
import { clearSearch } from "../../../features/main/mainSlice";
import { ManageFavoriteMovies } from "../../../features/users/settings/settingsSlice";
import {
  AiOutlineClose,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineCheck,
} from "react-icons/ai";

function FilmFavorites() {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const [movieFormData, setMovieData] = useState({
    movie:
      user.Settings.favorite_movies.length > 0
        ? user.Settings.favorite_movies
        : [],
    counter:
      user.Settings.favorite_movies.length - 4 >= 0
        ? user.Settings.favorite_movies.length - 4
        : 0,
  });
  const [updateState, setUpdateState] = useState(false);

  const { movie, counter } = movieFormData;

  const submitFavorites = (e) => {
    const reqData = {
      movies: movie,
      token: user.Token,
    };
    dispatch(ManageFavoriteMovies(reqData));
  };

  const removeMovie = (id, order) => {
    setMovieData({
      movie: movie
        .filter(function (movie) {
          return movie.order !== order;
        })
        .map((obj, index) => {
          return { ...obj, order: index + 1 };
        }),
    });
    setUpdateState(true);
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
    setUpdateState(true);
  };

  const handleSelection = (selection) => {
    const simpleMovie = {
      id: 0,
      tmdb_id: selection.id,
      order: movie.length > 0 ? movie.length + 1 : 1,
      title: selection.title,
      backdrop_path: selection.backdrop_path,
      poster_path: selection.poster_path,
    };
    setMovieData((prevState) => ({
      movie: [...prevState.movie, simpleMovie],
    }));
    setUpdateState(true);
    dispatch(modalSlice.actions.updateFilmSearchState());
    dispatch(clearSearch());
  };

  useEffect(() => {
    if (movie) {
      setMovieData((prevState) => ({
        ...prevState,
        counter: 4 - movie.length,
      }));
    }
  }, [movie, dispatch]);

  return (
    <>
      <div className="fav-nav">
        <h4>FAVORITE FILMS</h4>
      </div>

      <ul className="favorite-list">
        {movie ? (
          <>
            {movie.map((movie, index) => (
              <li className="favorite-item" key={movie.tmdb_id + index}>
                {movie.tmdb_id ? (
                  <>
                    {/* <h6>{movie.order}</h6> */}
                    <Poster movie={movie} />
                    <button
                      className="remove-button"
                      type="button"
                      onClick={(e) => {
                        removeMovie(movie.tmdb_id, movie.order);
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
                  <FilmFinder handleSelection={handleSelection} />
                )}
              </li>
            ))}
            {[...Array(counter)].map((counter, index) => (
              <li key={index}>
                <FilmFinder handleSelection={handleSelection} />
              </li>
            ))}
          </>
        ) : (
          <>
            <li>
              <FilmFinder handleSelection={handleSelection} />
            </li>
            <li>
              <FilmFinder handleSelection={handleSelection} />
            </li>
            <li>
              <FilmFinder handleSelection={handleSelection} />
            </li>
            <li>
              <FilmFinder handleSelection={handleSelection} />
            </li>
          </>
        )}
        {updateState ? (
          <button
            className="save-button"
            type="button"
            onClick={(e) => {
              submitFavorites();
            }}
          >
            <AiOutlineCheck />
          </button>
        ) : (
          ""
        )}
      </ul>
    </>
  );
}

export default FilmFavorites;
