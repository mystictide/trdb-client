import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GetPopularMovies, GetTopMovies } from "../../features/main/mainSlice";
import PropagateLoader from "react-spinners/ClipLoader";
import Poster from "./poster";

function Featured() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { homepage } = useSelector((state) => state.main);

  useEffect(() => {
    if (!homepage.popular) {
      dispatch(GetPopularMovies());
    }
    if (!homepage.top) {
      dispatch(GetTopMovies());
    }
  }, [homepage, navigate, dispatch]);
  

  return (
    <>
      {homepage.popular && homepage.top ? (
        <div className="feature-wrap">
          <div className="featured">
            <ul className="feature-list">
              {homepage.popular.map((movie) => (
                <li key={movie.id}>
                  <Poster movie={movie} />
                </li>
              ))}
            </ul>
          </div>
          <div className="info">
            <h3>Say a few words about the Artists you listen to</h3>
          </div>
          <div className="featured">
            <ul className="feature-list">
              {homepage.top.map((movie) => (
                <li key={movie.id}>
                  <Poster movie={movie} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div className="loading">
          <PropagateLoader color="#6f5773" size={30} speedMultiplier={0.5} />
        </div>
      )}
    </>
  );
}

export default Featured;
