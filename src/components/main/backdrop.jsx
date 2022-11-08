import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GetWeekly } from "../../features/main/mainSlice";

function Backdrop() {
  const dispatch = useDispatch();

  const { homepage } = useSelector((state) => state.main);
  const url = "https://image.tmdb.org/t/p/original";

  useEffect(() => {
    if (!homepage.weekly) {
      dispatch(GetWeekly());
    }
  }, [homepage, dispatch]);

  return (
    <div className="backdrop-container">
      <div className="backdrop-wrap">
        {homepage.weekly ? (
          <>
            <div
              className="backdrop-img"
              style={{
                backgroundImage: `url(${url + homepage.weekly.backdrop_path})`,
              }}
              loading="lazy"
            ></div>
            <div className="backdrop-title">
              <h5>
                <a href="/">
                  {homepage.weekly.title +
                    ` (${homepage.weekly.release_date.substring(0, 4)})`}
                </a>
              </h5>
            </div>
          </>
        ) : (
          <div className="backdrop-img" loading="lazy"></div>
        )}
        <div className="backdrop-mask"></div>
      </div>
    </div>
  );
}

export default Backdrop;
