import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Poster from "../../main/poster";
import FilmFinder from "./filmFinder";
import { modalSlice } from "../../../features/helpers/modalSlice";
import { clearSearch } from "../../../features/main/mainSlice";
import { ManageFavoriteFilms } from "../../../features/users/settings/settingsSlice";
import {
  AiOutlineClose,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineCheck,
} from "react-icons/ai";

function FilmFavorites() {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const [filmFormData, setFilmData] = useState({
    film:
      user.Settings.favorite_films.length > 0
        ? user.Settings.favorite_films
        : [],
    counter:
      user.Settings.favorite_films.length - 4 >= 0
        ? user.Settings.favorite_films.length - 4
        : 0,
  });
  const [updateState, setUpdateState] = useState(false);

  const { film, counter } = filmFormData;

  const submitFavorites = (e) => {
    const reqData = {
      films: film,
      token: user.Token,
    };
    dispatch(ManageFavoriteFilms(reqData));
  };

  const removeFilm = (id, order) => {
    setFilmData({
      film: film
        .filter(function (film) {
          return film.order !== order;
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
      setFilmData({
        film: film
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
      setFilmData({
        film: film
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
    const simpleFilm = {
      id: 0,
      tmdb_id: selection.id,
      order: film.length > 0 ? film.length + 1 : 1,
      title: selection.title,
      backdrop_path: selection.backdrop_path,
      poster_path: selection.poster_path,
    };
    setFilmData((prevState) => ({
      film: [...prevState.film, simpleFilm],
    }));
    setUpdateState(true);
    dispatch(modalSlice.actions.updateFilmSearchState());
    dispatch(clearSearch());
  };

  useEffect(() => {
    if (film) {
      setFilmData((prevState) => ({
        ...prevState,
        counter: 4 - film.length,
      }));
    }
  }, [film, dispatch]);

  return (
    <>
      <div className="fav-nav">
        <h4>FAVORITE FILMS</h4>
      </div>

      <ul className="favorite-list">
        {film ? (
          <>
            {film.map((film, index) => (
              <li className="favorite-item" key={film.tmdb_id + index}>
                {film.tmdb_id ? (
                  <>
                    <Poster film={film} />
                    <button
                      className="remove-button"
                      type="button"
                      onClick={(e) => {
                        removeFilm(film.tmdb_id, film.order);
                      }}
                    >
                      <AiOutlineClose />
                    </button>
                    {film.order > 1 ? (
                      <button
                        className="sort-button left"
                        type="button"
                        onClick={(e) => {
                          changeOrder(film.tmdb_id, index, true);
                        }}
                      >
                        <AiOutlineArrowLeft />
                      </button>
                    ) : (
                      ""
                    )}
                    {film.order < 4 &&
                    filmFormData.film.length - film.order !== 0 ? (
                      <button
                        className="sort-button right"
                        type="button"
                        onClick={(e) => {
                          changeOrder(film.tmdb_id, index, false);
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
