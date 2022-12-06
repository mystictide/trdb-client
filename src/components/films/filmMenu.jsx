import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import PropagateLoader from "react-spinners/ClipLoader";
import FilmManageReview from "./filmManageReview";
import FilmRating from "./filmRating";
import { toast } from "react-toastify";
import { formatPrettyURL } from "../../content/js/helpers";
import { modalSlice } from "../../features/helpers/modalSlice";
import {
  GetUserFilmDetails,
  Watch,
  Like,
  Watchlist,
  Rate,
  resetReviewState,
} from "../../features/userFilms/userFilmSlice";
import {
  BsEye,
  BsEyeFill,
  BsSuitHeart,
  BsSuitHeartFill,
  BsClock,
  BsClockFill,
  BsClipboard,
  BsTwitter,
} from "react-icons/bs";

function FilmMenu({ film }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [shareStatus, setShareStatus] = useState(false);
  const [blank, setBlankReview] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { userfilm, isInitialSuccess, isReviewSuccess } = useSelector(
    (state) => state.userfilms
  );
  const { reviewState } = useSelector((state) => state.modals);
  const watchCount = userfilm.reviews.length;

  const copyToClipboard = (e) => {
    var test = "http://localhost:3000/film/" + formatPrettyURL(film.title);
    navigator.clipboard.writeText(test);
    toast.success("copied to clipboard!");
  };

  const ShareTweet = () => {
    var content =
      film.title +
      " " +
      `(${film.release_date.substring(0, 4)})` +
      " on @trdb - " +
      "http://localhost:3000/film/" +
      formatPrettyURL(film.title);
    var url = "https://twitter.com/intent/tweet?text=" + content;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const toggleWatch = () => {
    var reqData = { id: film.id, token: user.Token };
    dispatch(Watch(reqData));
  };

  const toggleLike = () => {
    var reqData = { id: film.id, token: user.Token };
    dispatch(Like(reqData));
  };

  const toggleWatchlist = () => {
    var reqData = { id: film.id, token: user.Token };
    dispatch(Watchlist(reqData));
  };

  const rate = (rating) => {
    var reqData = {
      entity: {
        id: userfilm.rating ? userfilm.rating.id : 0,
        tmdb_id: film.id,
        rating: rating,
      },
      token: user.Token,
    };
    dispatch(Rate(reqData));
  };

  const goToActivity = () => {
    var url = `/${user.Username}/film/${formatPrettyURL(
      film.title
    )}-${film.release_date.substring(0, 4)}/logs`;
    navigate(url);
  };

  const goToReview = () => {
    var url = `/${user.Username}/film/${formatPrettyURL(
      film.title
    )}-${film.release_date.substring(0, 4)}}`;
    navigate(url);
  };

  const toggleReview = () => {
    setBlankReview(true);
    dispatch(modalSlice.actions.updateReviewState());
  };

  useEffect(() => {
    if (!isInitialSuccess) {
      const reqData = { id: film.id, token: user.Token };
      dispatch(GetUserFilmDetails(reqData));
    }
  }, [isInitialSuccess, userfilm, film, user, dispatch]);

  useEffect(() => {
    if (isReviewSuccess) {
      toast("Review successfully logged in!");
      dispatch(modalSlice.actions.updateReviewState());
      dispatch(resetReviewState());

      var url = `/${user.Username}/film/${formatPrettyURL(
        film.title
      )}-${film.release_date.substring(0, 4)}/${
        userfilm.reviews[userfilm.reviews.length - 1].id
      }`;
      navigate(url);
    }
  }, [film, user, isReviewSuccess, userfilm, navigate, dispatch]);

  return (
    <>
      <section className="side-menu">
        <div className="film-functions">
          <ul className="function-list">
            <li className="main-functions">
              {userfilm.watched ? (
                <>
                  {watchCount > 0 ? (
                    <>
                      {watchCount > 1 ? (
                        <button
                          type="button"
                          className="active watch"
                          onClick={(e) => goToActivity()}
                        >
                          <BsEyeFill />
                          Reviewed <span>{watchCount}</span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="active watch"
                          onClick={(e) => goToReview()}
                        >
                          <BsEyeFill />
                          Reviewed
                        </button>
                      )}
                    </>
                  ) : (
                    <button
                      type="button"
                      className="active watch"
                      onClick={(e) => toggleWatch()}
                    >
                      <BsEyeFill />
                      Watched
                    </button>
                  )}
                </>
              ) : (
                <button type="button" onClick={(e) => toggleWatch()}>
                  <BsEye />
                  Watch
                </button>
              )}
              {userfilm.liked ? (
                <button
                  type="button active"
                  className="active like"
                  onClick={(e) => toggleLike()}
                >
                  <BsSuitHeartFill />
                  Liked
                </button>
              ) : (
                <button type="button" onClick={(e) => toggleLike()}>
                  <BsSuitHeart />
                  Like
                </button>
              )}
              {userfilm.watchlist ? (
                <button
                  type="button active"
                  className="active watchlist"
                  onClick={(e) => toggleWatchlist()}
                >
                  <BsClockFill />
                  Watchlist
                </button>
              ) : (
                <button type="button" onClick={(e) => toggleWatchlist()}>
                  <BsClock />
                  Watchlist
                </button>
              )}
            </li>
            <li className="rating">
              Rate
              <FilmRating
                rating={
                  userfilm.reviews.length > 0
                    ? { rating: userfilm.reviews[0].rating }
                    : userfilm.rating
                }
                rate={rate}
              />
            </li>
            {userfilm.reviews.length === 1 ? (
              <li>
                <button
                  type="button"
                  onClick={() => {
                    dispatch(modalSlice.actions.updateReviewState());
                  }}
                >
                  Update your review
                </button>
              </li>
            ) : (
              ""
            )}
            <li>
              <button
                type="button"
                onClick={(e) => {
                  toggleReview();
                }}
              >
                {userfilm.reviews.length > 0
                  ? "Review or log again"
                  : "Review or log"}
              </button>
            </li>
            <li>
              <button type="button">Add to lists</button>
            </li>
            {shareStatus ? (
              <li className="share" onMouseLeave={(e) => setShareStatus(false)}>
                <button type="button" onClick={(e) => copyToClipboard()}>
                  <BsClipboard />
                  Clipboard
                </button>
                <button type="button" onClick={(e) => ShareTweet()}>
                  <BsTwitter />
                  Twitter
                </button>
              </li>
            ) : (
              <li onMouseEnter={(e) => setShareStatus(true)}>Share</li>
            )}
          </ul>
        </div>
      </section>
      {reviewState ? (
        <FilmManageReview film={film} userfilm={userfilm} blank={blank} />
      ) : (
        ""
      )}
    </>
  );
}

export default FilmMenu;
