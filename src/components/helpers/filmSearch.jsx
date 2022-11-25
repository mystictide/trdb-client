import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { SearchFilms } from "../../features/main/mainSlice";
import { modalSlice } from "../../features/helpers/modalSlice";
import { FaTimes } from "react-icons/fa";

function FilmSearch({ handleSelection }) {
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
    const searchFilm = setTimeout(() => {
      if (keyword.length > 0) {
        const reqData = { keyword: keyword, token: user.Token };
        dispatch(SearchFilms(reqData));
      }
    }, 2000);
    return () => clearTimeout(searchFilm);
  }, [keyword, user, dispatch]);

  return (
    <div className="modal-container">
      <div className="modal-overlay"></div>
      <div className="modal-content">
        <section className="heading">
          <h1>PICK A FAVORITE</h1>
          <FaTimes
            onClick={() => {
              dispatch(modalSlice.actions.updateFilmSearchState());
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
            <label>Name of film</label>
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
        {isSuccess && search.films.data && search.films.data.length > 0 ? (
          <section className="search-results">
            <ul className="result-list">
              {search.films.data.map((film) => (
                <li key={film.id} onClick={(e) => handleSelection(film)}>
                  {film.title + ` (${film.release_date.substring(0, 4)})`}
                </li>
              ))}
            </ul>
          </section>
        ) : (
          <section className="search-results">
            <ul className="result-list">
              <li>No matching results found.</li>
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}

export default FilmSearch;
