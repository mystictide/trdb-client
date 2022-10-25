import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { GetPopularMovies, GetTopMovies } from "../../features/main/mainSlice";
import PropagateLoader from "react-spinners/ClipLoader";

function Featured() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { homepage } = useSelector((state) => state.main);
  const url = "https://image.tmdb.org/t/p/w500";

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
            <ul>
              {homepage.popular.map((movie) => (
                <li key={movie.id}>
                  <div className="movie">
                    <Link>
                      <img src={url + movie.poster_path} alt={movie.title} />
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="info">
            <h3>Say a few words about the Artists you listen to</h3>
          </div>
          <div className="featured">
            <ul>
              {homepage.top.map((movie) => (
                <li key={movie.id}>
                  <div className="movie">
                    <Link>
                      <img src={url + movie.poster_path} alt={movie.title} />
                    </Link>
                  </div>
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
