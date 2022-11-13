import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AiFillPlusSquare } from "react-icons/ai";
import { modalSlice } from "../../../features/helpers/modalSlice";
import ActorSearch from "../../../components/helpers/actorSearch";

function ActorFinder({ handleSelection }) {
  const dispatch = useDispatch();
  const { actorSearchActive } = useSelector((state) => state.modals);

  useEffect(() => {}, [actorSearchActive, dispatch]);

  return (
    <>
      <div className="search-box">
        <button
          type="button"
          className="search-button"
          onClick={() => {
            dispatch(modalSlice.actions.updateActorSearchState());
          }}
        >
          <AiFillPlusSquare />
        </button>
      </div>
      {actorSearchActive ? <ActorSearch handleSelection={handleSelection} /> : ""}
    </>
  );
}

export default ActorFinder;
