import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import PropagateLoader from "react-spinners/ClipLoader";
import FilmRating from "./filmRating";
import { toast } from "react-toastify";
import { formatPrettyURL } from "../../content/js/helpers";
import {
  GetUserFilmDetails,
  Watch,
  Like,
  Watchlist,
  Rate,
  Review,
  reset,
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
  const { user } = useSelector((state) => state.auth);
  const { userfilm, isInitialSuccess } = useSelector(
    (state) => state.userfilms
  );

  const toggleShare = (e) => {
    setShareStatus(e);
  };

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

  useEffect(() => {
    if (!isInitialSuccess) {
      const reqData = { id: film.id, token: user.Token };
      dispatch(GetUserFilmDetails(reqData));
    }
  }, [isInitialSuccess, userfilm, film, user, dispatch]);

  return (
    <>
      <section className="side-menu">
        <div className="film-functions">
          <ul className="function-list">
            <li className="main-functions">
              {userfilm.watched ? (
                <button
                  type="button"
                  className="active watch"
                  onClick={(e) => toggleWatch()}
                >
                  <BsEyeFill />
                  Watched
                </button>
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
              <FilmRating rating={userfilm.rating} rate={rate} />
            </li>
            <li>
              <button type="button">Review or log</button>
            </li>
            <li>
              <button type="button">Add to lists</button>
            </li>
            {shareStatus ? (
              <li className="share" onMouseLeave={(e) => toggleShare(false)}>
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
              <li onMouseEnter={(e) => toggleShare(true)}>Share</li>
            )}
          </ul>
        </div>
      </section>
    </>
  );
}

export default FilmMenu;
