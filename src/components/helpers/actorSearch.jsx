import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { SearchActors } from "../../features/main/mainSlice";
import { modalSlice } from "../../features/helpers/modalSlice";
import { FaTimes } from "react-icons/fa";

function ActorSearch({ handleSelection }) {
  const dispatch = useDispatch();
  const [searchData, setSearchData] = useState({
    keyword: "",
  });

  const { user } = useSelector((state) => state.auth);
  const { search, isError, isSuccess, message } = useSelector(
    (state) => state.main
  );

  const { keyword } = searchData;

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
  }, [user, keyword, search, isError, isSuccess, message, dispatch]);

  useEffect(() => {
    const searchActor = setTimeout(() => {
      if (keyword.length > 0) {
        const reqData = { keyword: keyword, token: user.Token };
        dispatch(SearchActors(reqData));
      }
    }, 2000);
    return () => clearTimeout(searchActor);
  }, [keyword, user, dispatch]);

  return (
    <div className="modal-container">
      <div className="modal-overlay"></div>
      <div className="modal-content">
        <section className="heading">
          <h1>PICK A FAVORITE</h1>
          <FaTimes
            onClick={() => {
              dispatch(modalSlice.actions.updateActorSearchState());
            }}
          />
        </section>
        <section className="search-form">
          <form
            className="form-group"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <label>Name of actor</label>
            <input
              type="keyword"
              className="form-control"
              id="keyword"
              name="keyword"
              value={keyword}
              onChange={(e) =>
                setSearchData((prevState) => ({
                  ...prevState,
                  [e.target.name]: e.target.value,
                }))
              }
            />
          </form>
        </section>
        {isSuccess && search.actors.data ? (
          <section className="search-results">
            <ul className="result-list">
              {search.actors.data.map((actor) => (
                <li key={actor.id} onClick={(e) => handleSelection(actor)}>
                  {actor.name}
                </li>
              ))}
            </ul>
          </section>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default ActorSearch;
