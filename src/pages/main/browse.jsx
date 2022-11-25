import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Browse } from "../../features/main/mainSlice";
import PropagateLoader from "react-spinners/ClipLoader";
import FilmResult from "../../components/browser/filmResult";
import PersonResult from "../../components/browser/personResult";
import UserResult from "../../components/browser/userResult";
import Pager from "../../components/main/pager";

function Browser() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { keyword } = useParams();
  const { isLoading, browse } = useSelector((state) => state.main);
  const [filter, setFilter] = useState("films");

  useEffect(() => {
    if (!browse) {
      const reqData = { keyword: keyword, page: 1 };
      dispatch(Browse(reqData));
      setFilter("films");
    }
  }, [filter, keyword, browse, navigate, dispatch]);

  const setPage = (e, page) => {
    const reqData = { keyword: keyword, page: page };
    dispatch(Browse(reqData));
  };

  return (
    <>
      {isLoading ? (
        <div className="loading">
          <PropagateLoader color="#6f5773" size={30} speedMultiplier={0.5} />
        </div>
      ) : (
        <div className="browser">
          <div className="content browser-content">
            <div className="matches">
              {browse && filter === "films" ? (
                <>
                  <span className="headers">
                    {browse.films.totalItems > 0
                      ? `Found ${browse.films.totalItems} films for "${keyword}"`
                      : `No matching results found for "${keyword}"`}
                  </span>
                  <FilmResult films={browse.films} />
                  <Pager list={browse.films} setPage={setPage} />
                </>
              ) : (
                ""
              )}
              {browse && filter === "people" ? (
                <>
                  <span className="headers">
                    {browse.people.totalItems > 0
                      ? `Found ${browse.people.totalItems} people for "${keyword}"`
                      : `No matching results found for "${keyword}"`}
                  </span>
                  <PersonResult people={browse.people} />
                  <Pager list={browse.people} setPage={setPage} />
                </>
              ) : (
                ""
              )}
              {browse && filter === "users" ? (
                <>
                  <span className="headers">
                    {browse.users.totalItems > 0
                      ? `Found ${browse.users.totalItems} users for "${keyword}"`
                      : `No matching results found for "${keyword}"`}
                  </span>
                  <UserResult users={browse.users} />
                  <Pager list={browse.users} setPage={setPage} />
                </>
              ) : (
                ""
              )}
            </div>
            {browse ? (
              <div className="filters">
                <span className="headers">Filter by</span>
                <ul className="filter-nav">
                  {browse.films && browse.films.totalItems > 0 ? (
                    <li onClick={(e) => setFilter("films")}>
                      Films {`(${browse.films.totalItems})`}
                    </li>
                  ) : (
                    ""
                  )}
                  {browse.people && browse.people.totalItems > 0 ? (
                    <li onClick={(e) => setFilter("people")}>
                      People {`(${browse.people.totalItems})`}
                    </li>
                  ) : (
                    ""
                  )}
                  {browse.lists && browse.lists.totalItems > 0 ? (
                    <li onClick={(e) => setFilter("lists")}>
                      Lists {`(${browse.lists.totalItems})`}
                    </li>
                  ) : (
                    ""
                  )}
                  {browse.users && browse.users.totalItems > 0 ? (
                    <li onClick={(e) => setFilter("users")}>
                      Users {`(${browse.users.totalItems})`}
                    </li>
                  ) : (
                    ""
                  )}
                </ul>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Browser;
