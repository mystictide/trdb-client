import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropagateLoader from "react-spinners/ClipLoader";
import { modalSlice } from "../../features/helpers/modalSlice";
import PhotoViewer from "../../components/helpers/photoViewer";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import {
  GetFilm,
  GetFilmCast,
  GetFilmCrew,
  reset,
} from "../../features/films/filmSlice";
import { decodeURL } from "../../content/js/helpers";
import Backdrop from "../../components/main/backdrop";
import TextPreview from "../../components/helpers/textPreview";
import FilmCredits from "../../components/films/filmCredits";
import FilmMenu from "../../components/films/filmMenu";

const Film = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { title } = useParams();
  const location = useLocation();
  const { state } = location;
  const { user } = useSelector((state) => state.auth);
  const { film, isLoading, detailsSuccess, castSuccess, crewSuccess } =
    useSelector((state) => state.films);
  const { photoActive } = useSelector((state) => state.modals);
  const poster_url = "https://image.tmdb.org/t/p/w500";

  useEffect(() => {
    const el = document.getElementById("main");
    const elHeader = document.getElementById("header");
    el.classList.add("welcome-page");
    elHeader.classList.add("welcome-header", "active");
  }, []);

  useEffect(() => {
    return () => {
      dispatch(reset());
      const el = document.getElementById("main");
      const elHeader = document.getElementById("header");
      el.classList.remove("welcome-page");
      elHeader.classList.remove("welcome-header", "active");
    };
  }, [dispatch]);

  useEffect(() => {
    if (state) {
      if (!film) {
        const reqData = { id: state.id };
        dispatch(GetFilm(reqData));
      }
    } else {
      if (!film) {
        const reqData = { title: decodeURL(title) };
        dispatch(GetFilm(reqData));
      }
    }
  }, [user, film, state, title, navigate, dispatch]);

  useEffect(() => {
    if (film && !castSuccess) {
      const reqData = { id: film.ID };
      dispatch(GetFilmCast(reqData));
    }
  }, [film, castSuccess, dispatch]);

  useEffect(() => {
    if (film && castSuccess && !crewSuccess) {
      const reqData = { id: film.ID };
      dispatch(GetFilmCrew(reqData));
    }
  }, [film, castSuccess, crewSuccess, dispatch]);

  return (
    <>
      {isLoading ? (
        <div className="content">
          <div className="content-wrap">
            <div className="loading">
              <PropagateLoader
                color="#6f5773"
                size={30}
                speedMultiplier={0.5}
              />
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      {film && detailsSuccess ? (
        <>
          <Backdrop film={film} />
          <div className="content">
            <div className="film-page-container">
              <div className="film-wrapper">
                <div className="film-poster">
                  <img
                    src={poster_url + film.poster_path}
                    alt={film.title}
                    onClick={() => {
                      dispatch(modalSlice.actions.updatePhotoState());
                    }}
                  />
                  <div>ratings</div>
                </div>
                <div className="film-main">
                  <section className="heading">
                    <h1>{film.title}</h1>
                    <h4 className="year">
                      {film.release_date.substring(0, 4)}
                    </h4>
                    <h4 className="director">Directed by</h4>
                    <ul>
                      {film.directors.map((person, index) => (
                        <div key={person.id}>
                          {index ? ", " : ""}
                          <li className="item">{person.name}</li>
                        </div>
                      ))}
                    </ul>
                  </section>
                  <div className="main-container">
                    <section className="information">
                      <div className="presentation">
                        <h5 className="tagline">{film.tagline}</h5>
                        <TextPreview text={film.overview} />
                      </div>
                      <div className="credits">
                        {castSuccess && film.credits ? (
                          <FilmCredits
                            genres={film.genres}
                            languages={film.spoken_languages}
                            companies={film.production_companies}
                            countries={film.production_countries}
                            cast={film.credits.cast}
                            crew={film.credits.crew}
                          />
                        ) : (
                          <div className="loading">
                            <PropagateLoader
                              color="#6f5773"
                              size={30}
                              speedMultiplier={0.5}
                            />
                          </div>
                        )}
                      </div>
                      <div className="extra">
                        <h6 className="runtime">{film.runtime} minutes</h6>
                        <a
                          className="ref"
                          href={`http://www.imdb.com/title/${film.imdb_id}/maindetails`}
                        >
                          IMDB
                        </a>
                        <a
                          className="ref"
                          href={`https://www.themoviedb.org/movie/${film.id}/`}
                        >
                          TMDB
                        </a>
                      </div>
                    </section>
                    <FilmMenu film={film}/>
                  </div>
                </div>
              </div>
            </div>
            {photoActive ? (
              <PhotoViewer source={poster_url + film.poster_path} size={2} />
            ) : (
              ""
            )}
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default Film;
