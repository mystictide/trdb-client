import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import FilmRating from "../../components/films/filmRating";
import Poster from "../../components/main/poster";
import FilmMenu from "../../components/films/filmMenu";
import {
  formatPrettyURL,
  decodeURL,
  pathFromUserID,
} from "../../content/js/helpers";
import {
  GetUserFilmReview,
  resetUserFilmLog,
} from "../../features/userFilms/userFilmSlice";
import { Link, useNavigate, useParams } from "react-router-dom";

function UserFilmReview({ film, review }) {
  const dispatch = useDispatch();
  const { username, title, year, count } = useParams();
  const { user } = useSelector((state) => state.auth);
  const { userfilmlog, isSuccess } = useSelector((state) => state.userfilms);

  useEffect(() => {
    if (!userfilmlog.reviews) {
      const reqData = {
        username: username,
        title: decodeURL(title),
        year: year,
        count: count ?? null,
      };
      dispatch(GetUserFilmReview(reqData));
    }
  }, [userfilmlog.reviews, username, title, year, count, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(resetUserFilmLog());
    };
  }, [dispatch]);

  return (
    <>
      {isSuccess && userfilmlog.reviews ? (
        <>
          <div className="film-log-container">
            <section className="poster">
              <Poster film={userfilmlog.film} />
            </section>
            <section className="review-form">
              <h5>
                Review by <Link to={`/u/${username}`}>{username}</Link>
              </h5>
              <div className="title">
                <h2>
                  <Link to={`/film/${formatPrettyURL(userfilmlog.film.title)}`}>
                    {userfilmlog.film.title}
                  </Link>
                </h2>
                <h4 className="year">
                  {userfilmlog.film.release_date.substring(0, 4)}
                </h4>
                <FilmRating rating={userfilmlog.reviews} readOnly={true} />
              </div>
              <div className="title">
                <h4 className="watched">
                  Watched{" "}
                  {new Date(
                    userfilmlog.reviews.date_watched
                  ).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </h4>
              </div>
              <div className="body">
                {userfilmlog.reviews.review ||
                !userfilmlog.reviews.review === "" ? (
                  <p>{userfilmlog.reviews.review}</p>
                ) : (
                  <p className="notfound">
                    There is no review found for this log entry.
                  </p>
                )}
              </div>
              <div className="functions"></div>
            </section>
            {user ? <FilmMenu film={userfilmlog.film} /> : ""}
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
}

// {
//   pathFromUserID(userfilmlog.reviews.user_id);
// }

export default UserFilmReview;
