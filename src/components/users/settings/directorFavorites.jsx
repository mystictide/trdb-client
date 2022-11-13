import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Person from "../../main/person";
import DirectorFinder from "./directorFinder";
import { modalSlice } from "../../../features/helpers/modalSlice";
import { clearSearch } from "../../../features/main/mainSlice";
import { ManageFavoriteDirectors } from "../../../features/users/settings/settingsSlice";
import {
  AiOutlineClose,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineCheck,
} from "react-icons/ai";

function DirectorFavorites() {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const [directorFormData, setDirectorData] = useState({
    director:
      user.Settings.favorite_directors.length > 0
        ? user.Settings.favorite_directors
        : [],
    counter:
      user.Settings.favorite_directors.length - 4 >= 0
        ? user.Settings.favorite_directors.length - 4
        : 0,
  });
  const [updateState, setUpdateState] = useState(false);

  const { director, counter } = directorFormData;

  const submitFavorites = (e) => {
    const reqData = {
      directors: director,
      token: user.Token,
    };
    dispatch(ManageFavoriteDirectors(reqData));
  };

  const removeDirector = (id, order) => {
    setDirectorData({
      director: director
        .filter(function (director) {
          return director.order !== order;
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
      setDirectorData({
        director: director
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
      setDirectorData({
        director: director
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
    const simpledirector = {
      id: 0,
      tmdb_id: selection.id,
      order: director.length > 0 ? director.length + 1 : 1,
      name: selection.name,
      profile_path: selection.profile_path,
    };
    setDirectorData((prevState) => ({
      director: [...prevState.director, simpledirector],
    }));
    setUpdateState(true);
    dispatch(modalSlice.actions.updateDirectorSearchState());
    dispatch(clearSearch());
  };

  useEffect(() => {
    if (director) {
      setDirectorData((prevState) => ({
        ...prevState,
        counter: 4 - director.length,
      }));
    }
  }, [director, dispatch]);

  return (
    <>
      <div className="fav-nav">
        <h4>FAVORITE DIRECTORS</h4>
      </div>

      <ul className="favorite-list">
        {director ? (
          <>
            {director.map((director, index) => (
              <li className="favorite-item" key={director.tmdb_id + index}>
                {director.tmdb_id ? (
                  <>
                    <Person actor={director} />
                    <button
                      className="remove-button"
                      type="button"
                      onClick={(e) => {
                        removeDirector(director.tmdb_id, director.order);
                      }}
                    >
                      <AiOutlineClose />
                    </button>
                    {director.order > 1 ? (
                      <button
                        className="sort-button left"
                        type="button"
                        onClick={(e) => {
                          changeOrder(director.tmdb_id, index, true);
                        }}
                      >
                        <AiOutlineArrowLeft />
                      </button>
                    ) : (
                      ""
                    )}
                    {director.order < 4 &&
                    directorFormData.director.length - director.order !== 0 ? (
                      <button
                        className="sort-button right"
                        type="button"
                        onClick={(e) => {
                          changeOrder(director.tmdb_id, index, false);
                        }}
                      >
                        <AiOutlineArrowRight />
                      </button>
                    ) : (
                      ""
                    )}
                  </>
                ) : (
                  <DirectorFinder handleSelection={handleSelection} />
                )}
              </li>
            ))}
            {[...Array(counter)].map((counter, index) => (
              <li key={index}>
                <DirectorFinder handleSelection={handleSelection} />
              </li>
            ))}
          </>
        ) : (
          <>
            <li>
              <DirectorFinder handleSelection={handleSelection} />
            </li>
            <li>
              <DirectorFinder handleSelection={handleSelection} />
            </li>
            <li>
              <DirectorFinder handleSelection={handleSelection} />
            </li>
            <li>
              <DirectorFinder handleSelection={handleSelection} />
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

export default DirectorFavorites;
