import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AiFillPlusSquare } from "react-icons/ai";
import { modalSlice } from "../../../features/helpers/modalSlice";

function FilmFinder() {
  const dispatch = useDispatch();
  const { searchActive } = useSelector((state) => state.modals);

  useEffect(() => {}, [searchActive, dispatch]);

  return (
    <div className="search-box">
      <button
        type="button"
        className="search-button"
        onClick={() => {
          dispatch(modalSlice.actions.updateSearchState());
        }}
      >
        <AiFillPlusSquare />
      </button>
    </div>
  );
}

export default FilmFinder;
