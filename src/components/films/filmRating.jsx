import { BsStar, BsStarFill } from "react-icons/bs";
import Rating from "react-rating";

function FilmRating({ readOnly, rating, rate, allowCancel, setRating }) {
  const cancelRating = () => {
    setRating(0);
  };

  return (
    <>
      {rating ? (
        <>
          <div style={{ position: "relative" }}>
            {rating.rating > 0 && allowCancel ? (
              <button type="button" onClick={(e) => cancelRating()}>
                x
              </button>
            ) : (
              ""
            )}
            <Rating
              className="stars"
              start={0}
              stop={5}
              initialRating={rating.rating}
              emptySymbol={<BsStar />}
              fullSymbol={<BsStarFill />}
              fractions={2}
              onClick={(e) => rate(e)}
              readonly={readOnly ?? false}
            />
          </div>
        </>
      ) : (
        <Rating
          className="stars"
          start={0}
          stop={5}
          initialRating={0}
          emptySymbol={<BsStar />}
          fullSymbol={<BsStarFill />}
          fractions={2}
          onClick={(e) => rate(e)}
        />
      )}
    </>
  );
}

export default FilmRating;
