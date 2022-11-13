import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Person from "../../main/person";
import ActorFinder from "./actorFinder";
import { modalSlice } from "../../../features/helpers/modalSlice";
import { clearSearch } from "../../../features/main/mainSlice";
import { ManageFavoriteActors } from "../../../features/users/settings/settingsSlice";
import {
  AiOutlineClose,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineCheck,
} from "react-icons/ai";

function ActorFavorites() {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const [actorFormData, setActorData] = useState({
    actor:
      user.Settings.favorite_actors.length > 0
        ? user.Settings.favorite_actors
        : [],
    counter:
      user.Settings.favorite_actors.length - 4 >= 0
        ? user.Settings.favorite_actors.length - 4
        : 0,
  });
  const [updateState, setUpdateState] = useState(false);

  const { actor, counter } = actorFormData;

  const submitFavorites = (e) => {
    const reqData = {
      actors: actor,
      token: user.Token,
    };
    dispatch(ManageFavoriteActors(reqData));
  };

  const removeactor = (id, order) => {
    setActorData({
      actor: actor
        .filter(function (actor) {
          return actor.order !== order;
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
      setActorData({
        actor: actor
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
      setActorData({
        actor: actor
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
    const simpleactor = {
      id: 0,
      tmdb_id: selection.id,
      order: actor.length > 0 ? actor.length + 1 : 1,
      name: selection.name,
      profile_path: selection.profile_path,
    };
    setActorData((prevState) => ({
      actor: [...prevState.actor, simpleactor],
    }));
    setUpdateState(true);
    dispatch(modalSlice.actions.updateActorSearchState());
    dispatch(clearSearch());
  };

  useEffect(() => {
    if (actor) {
      setActorData((prevState) => ({
        ...prevState,
        counter: 4 - actor.length,
      }));
    }
  }, [actor, dispatch]);

  return (
    <>
      <div className="fav-nav">
        <h4>FAVORITE ACTORS</h4>
      </div>

      <ul className="favorite-list">
        {actor ? (
          <>
            {actor.map((actor, index) => (
              <li className="favorite-item" key={actor.tmdb_id + index}>
                {actor.tmdb_id ? (
                  <>
                    <Person actor={actor} />
                    <button
                      className="remove-button"
                      type="button"
                      onClick={(e) => {
                        removeactor(actor.tmdb_id, actor.order);
                      }}
                    >
                      <AiOutlineClose />
                    </button>
                    {actor.order > 1 ? (
                      <button
                        className="sort-button left"
                        type="button"
                        onClick={(e) => {
                          changeOrder(actor.tmdb_id, index, true);
                        }}
                      >
                        <AiOutlineArrowLeft />
                      </button>
                    ) : (
                      ""
                    )}
                    {actor.order < 4 &&
                    actorFormData.actor.length - actor.order !== 0 ? (
                      <button
                        className="sort-button right"
                        type="button"
                        onClick={(e) => {
                          changeOrder(actor.tmdb_id, index, false);
                        }}
                      >
                        <AiOutlineArrowRight />
                      </button>
                    ) : (
                      ""
                    )}
                  </>
                ) : (
                  <ActorFinder handleSelection={handleSelection} />
                )}
              </li>
            ))}
            {[...Array(counter)].map((counter, index) => (
              <li key={index}>
                <ActorFinder handleSelection={handleSelection} />
              </li>
            ))}
          </>
        ) : (
          <>
            <li>
              <ActorFinder handleSelection={handleSelection} />
            </li>
            <li>
              <ActorFinder handleSelection={handleSelection} />
            </li>
            <li>
              <ActorFinder handleSelection={handleSelection} />
            </li>
            <li>
              <ActorFinder handleSelection={handleSelection} />
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

export default ActorFavorites;
