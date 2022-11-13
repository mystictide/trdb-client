import { useEffect } from "react";

function Pager(prop) {
  const list = prop.list;
  const setPage = prop.setPage;
  useEffect(() => {}, [list]);

  return (
    <>
      {list.filterModel.pager.TotalPages > 1 ? (
        <div className="pager-container">
          <ul className="pager-list">
            {list.filterModel.pager.CurrentPage > 1 ? (
              <li className="pager-item">
                <button className="pager-button" onClick={(e) => setPage(e, 1)}>
                  {"<<"}
                </button>{" "}
              </li>
            ) : (
              ""
            )}
            {list.filterModel.pager.CurrentPage > 1 ? (
              <li className="pager-item">
                <button
                  className="pager-button"
                  onClick={(e) =>
                    setPage(e, list.filterModel.pager.CurrentPage - 1)
                  }
                >
                  Previous
                </button>
              </li>
            ) : (
              ""
            )}
            {list.filterModel.pager.CurrentPage ===
            list.filterModel.pager.TotalPages ? (
              ""
            ) : (
              <li className="pager-item">
                <button
                  className="pager-button"
                  onClick={(e) =>
                    setPage(e, list.filterModel.pager.CurrentPage + 1)
                  }
                >
                  Next
                </button>
              </li>
            )}
            {list.filterModel.pager.CurrentPage ===
            list.filterModel.pager.TotalPages ? (
              ""
            ) : (
              <li className="pager-item">
                <button
                  className="pager-button"
                  onClick={(e) => setPage(e, list.filterModel.pager.TotalPages)}
                >
                  {">>"}
                </button>
              </li>
            )}
          </ul>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default Pager;
