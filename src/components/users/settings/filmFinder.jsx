import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AiFillPlusSquare } from "react-icons/ai";
import { modalSlice } from "../../../features/helpers/modalSlice";
import FilmSearch from "../../../components/helpers/filmSearch";

function FilmFinder({ handleSelection }) {
  const dispatch = useDispatch();
  const { filmSearchActive } = useSelector((state) => state.modals);

  useEffect(() => {}, [filmSearchActive, dispatch]);

  return (
    <>
      <div className="search-box">
        <button
          type="button"
          className="search-button"
          onClick={() => {
            dispatch(modalSlice.actions.updateFilmSearchState());
          }}
        >
          <AiFillPlusSquare />
        </button>
      </div>
      {filmSearchActive ? <FilmSearch handleSelection={handleSelection} /> : ""}
    </>
  );
}

export default FilmFinder;
