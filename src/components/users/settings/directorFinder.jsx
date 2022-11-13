import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AiFillPlusSquare } from "react-icons/ai";
import { modalSlice } from "../../../features/helpers/modalSlice";
import DirectorSearch from "../../../components/helpers/directorSearch";

function DirectorFinder({ handleSelection }) {
  const dispatch = useDispatch();
  const { directorSearchActive } = useSelector((state) => state.modals);

  useEffect(() => {}, [directorSearchActive, dispatch]);

  return (
    <>
      <div className="search-box">
        <button
          type="button"
          className="search-button"
          onClick={() => {
            dispatch(modalSlice.actions.updateDirectorSearchState());
          }}
        >
          <AiFillPlusSquare />
        </button>
      </div>
      {directorSearchActive ? <DirectorSearch handleSelection={handleSelection} /> : ""}
    </>
  );
}

export default DirectorFinder;
