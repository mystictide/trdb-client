import { BsStar, BsStarFill } from "react-icons/bs";
import Rating from "react-rating";

function FilmRating({ rating, rate }) {

  return (
    <>
      {rating ? (
        <Rating
          className="stars"
          start={0}
          stop={5}
          initialRating={rating.rating}
          emptySymbol={<BsStar />}
          fullSymbol={<BsStarFill />}
          fractions={2}
          onClick={(e) => rate(e)}
        />
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
