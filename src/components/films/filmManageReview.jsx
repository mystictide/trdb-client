import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaTimes } from "react-icons/fa";
import { Review } from "../../features/userFilms/userFilmSlice";
import { modalSlice } from "../../features/helpers/modalSlice";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Poster from "../main/poster";
import FilmRating from "./filmRating";
import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";

function FilmManageReview({ film, userfilm, blank }) {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const review =
    userfilm.reviews.length > 0 && !blank ? userfilm.reviews[0] : null;

  const [inFocus, setFocus] = useState(false);
  const [dateSelection, setDateSelection] = useState(
    review ? (review.date_watched ? true : false) : false
  );
  const [date, setDate] = useState(new Date());
  const [rating, setRating] = useState(
    userfilm.reviews.length > 0
      ? userfilm.reviews[0].rating
      : userfilm.rating
      ? userfilm.rating.rating
      : 0
  );
  const [like, setLike] = useState(userfilm.liked);
  const [rewatch, setRewatch] = useState(review ? review.isRewatch : false);
  const [watchDate, setWatchDate] = useState(
    review ? new Date(review.date_watched) : null
  );
  const [body, setBody] = useState(review ? review.review : "");

  const onClose = () => {
    if (document.getElementById("review").value !== "") {
      var answer = window.confirm(
        "Are you sure you want to close down your review?"
      );
      if (answer) {
        dispatch(modalSlice.actions.updateReviewState());
      }
    } else {
      dispatch(modalSlice.actions.updateReviewState());
    }
  };

  const rate = (rating) => {
    setRating(rating);
  };

  const checkFocus = (e) => {
    if (e.target.tagName === "textarea") {
      setFocus(true);
    } else if (e.target.id === "container") {
      setFocus(false);
    }
  };

  const handleDateSelect = (e) => {
    setWatchDate(e);
  };

  const onSubmit = () => {
    var reqData = {
      entity: {
        id: review ? review.id : 0,
        tmdb_id: film.id,
        rating: rating,
        review: body,
        date_watched: watchDate ?? date,
        isRewatch: rewatch,
        liked: like,
      },
      token: user.Token,
    };
    dispatch(Review(reqData));
  };

  return (
    <>
      <div className="review-container">
        <div className="review-overlay"></div>
        <div
          id="container"
          className={`review-content ${inFocus ? "focused" : ""}`}
          onMouseDown={(e) => checkFocus(e)}
        >
          <section className="poster">
            <Poster film={film} />
          </section>
          <section className="review-form">
            <h5>LOGGING…</h5>
            <div className="title">
              <h2>{film.title}</h2>
              <h4 className="year">{film.release_date.substring(0, 4)}</h4>
            </div>
            <div className="date-selection">
              <div className="checks">
                {dateSelection ? (
                  <>
                    <input
                      type="checkbox"
                      checked={dateSelection}
                      value={dateSelection}
                      onChange={(e) => setDateSelection(e.target.checked)}
                    />
                    <label>
                      on{" "}
                      <DatePicker
                        dateFormat={"dd MMM yyyy"}
                        dateFormatCalendar={"dd MMM yyyy"}
                        shouldCloseOnSelect={true}
                        disabledKeyboardNavigation
                        showYearDropdown
                        scrollableYearDropdown
                        yearDropdownItemNumber={15}
                        maxDate={new Date()}
                        selected={watchDate ? watchDate : date}
                        onChange={(date) => setDate(date)}
                        onSelect={(selectedDate) =>
                          handleDateSelect(selectedDate)
                        }
                      />
                    </label>
                  </>
                ) : (
                  <label>
                    <input
                      type="checkbox"
                      checked={dateSelection}
                      value={dateSelection}
                      onChange={(e) => setDateSelection(e.target.checked)}
                    />
                    Specify the date you watched it
                  </label>
                )}

                {dateSelection ? (
                  <label>
                    <input
                      type="checkbox"
                      checked={rewatch}
                      value={rewatch}
                      onChange={(e) => setRewatch(e.target.checked)}
                    />
                    I’ve watched this film before
                  </label>
                ) : (
                  ""
                )}
              </div>
              <div className="rewatch"></div>
            </div>
            <div className="body">
              <textarea
                id="review"
                placeholder="Add a review"
                onMouseDown={(e) => setFocus(true)}
                value={body}
                onChange={(e) => setBody(e.target.value)}
              ></textarea>
            </div>
            <div className="extra">
              <div className="rating">
                Rating
                <FilmRating
                  rating={{ rating: rating }}
                  rate={rate}
                  allowCancel={true}
                  setRating={setRating}
                />
              </div>
              <div className="like">
                Like
                {like ? (
                  <button
                    type="button active"
                    className="active like"
                    onClick={(e) => setLike(false)}
                  >
                    <BsSuitHeartFill />
                  </button>
                ) : (
                  <button type="button" onClick={(e) => setLike(true)}>
                    <BsSuitHeart />
                  </button>
                )}
              </div>
            </div>
            <button
              type="button"
              className="submit"
              onClick={(e) => onSubmit()}
            >
              SUBMIT
            </button>
          </section>
          <section className="heading">
            <FaTimes onClick={(e) => onClose()} />
          </section>
        </div>
      </div>
    </>
  );
}

export default FilmManageReview;
