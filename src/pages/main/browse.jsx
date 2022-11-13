import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Browse } from "../../features/main/mainSlice";
import PropagateLoader from "react-spinners/ClipLoader";
import Poster from "../../components/main/poster";
import Person from "../../components/main/person";
import Pager from "../../components/main/pager";

function Browser() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { keyword } = useParams();
  const { isLoading, browse } = useSelector((state) => state.main);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    if (!browse) {
      const reqData = { keyword: keyword, page: 1 };
      dispatch(Browse(reqData));
      setFilter("all");
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
              {browse && filter === "all" ? (
                <>
                  <span className="headers">
                    {browse.movies.totalItems > 0
                      ? `Found ${browse.movies.totalItems} people for "${keyword}"`
                      : `No matching results found for "${keyword}"`}
                  </span>
                </>
              ) : (
                ""
              )}
              {browse && filter === "films" ? (
                <>
                  <span className="headers">
                    {browse.movies.totalItems > 0
                      ? `Found ${browse.movies.totalItems} films for "${keyword}"`
                      : `No matching results found for "${keyword}"`}
                  </span>
                  {browse.movies
                    ? browse.movies.data.map((item, index) => (
                        <div className="match" key={index}>
                          <Poster movie={item} />
                        </div>
                      ))
                    : ""}
                  <Pager list={browse.movies} setPage={setPage} />
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
                  {browse.people
                    ? browse.people.data.map((item, index) => (
                        <div className="match" key={index}>
                          <Person actor={item} />
                        </div>
                      ))
                    : ""}
                  <Pager list={browse.people} setPage={setPage} />
                </>
              ) : (
                ""
              )}
            </div>
            {browse ? (
              <div className="filters">
                <span className="headers">Filter by</span>
                <ul className="filter-nav">
                  <li onClick={(e) => setFilter("all")}>All</li>
                  <li onClick={(e) => setFilter("films")}>
                    Films {browse.movies ? `(${browse.movies.totalItems})` : 0}
                  </li>
                  <li onClick={(e) => setFilter("people")}>
                    People {browse.people ? `(${browse.people.totalItems})` : 0}
                  </li>
                  <li onClick={(e) => setFilter("lists")}>Lists</li>
                  <li onClick={(e) => setFilter("users")}>Users</li>
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
