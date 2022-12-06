import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Poster from "../../components/main/poster";
import {
  formatPrettyURL,
  decodeURL,
  pathFromUserID,
} from "../../content/js/helpers";
import {
  GetUserFilmLogs,
  resetUserFilmLogs,
} from "../../features/userFilms/userFilmSlice";
import { Link, useNavigate, useParams } from "react-router-dom";

function UserFilmLogs({ film, review }) {
  const dispatch = useDispatch();
  const { username, title, year } = useParams();
  const { user } = useSelector((state) => state.auth);
  const { userfilmlogs, isSuccess } = useSelector((state) => state.userfilms);

  useEffect(() => {
    if (!userfilmlogs.reviews) {
      const reqData = {
        username: username,
        title: decodeURL(title),
        year: year,
      };
      dispatch(GetUserFilmLogs(reqData));
    }
  }, [userfilmlogs.reviews, username, title, year, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(resetUserFilmLogs());
    };
  }, [dispatch]);

  return (
    <>
      {isSuccess && userfilmlogs.reviews ? (
        <>
          <div className="film-logs-container">
            <section className="activity">
              <h5>YOUR LOGS FOR</h5>
              <div className="title">
                <h2>
                  <Link
                    to={`/film/${formatPrettyURL(userfilmlogs.film.title)}`}
                  >
                    {userfilmlogs.film.title}
                  </Link>
                </h2>
                <h4 className="year">
                  {userfilmlogs.film.release_date.substring(0, 4)}
                </h4>
              </div>
              <div className="logs">
                <ul>
                  {userfilmlogs.reviews.map((review, index) => (
                    <li key={index}>
                      {username}{" "}
                      <Link
                        to={`/${username}/film/${formatPrettyURL(
                          userfilmlogs.film.title
                        )}-${userfilmlogs.film.release_date.substring(0, 4)}/${
                          review.id
                        }`}
                      >
                        logged {userfilmlogs.film.title} on{" "}
                      </Link>
                      {new Date(review.date_watched).toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        }
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
            <section className="poster">
              <Poster film={userfilmlogs.film} />
            </section>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
}

export default UserFilmLogs;
