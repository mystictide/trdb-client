import { Link } from "react-router-dom";
import { GiFilmSpool } from "react-icons/gi";
import { formatPrettyURL } from "../../content/js/helpers";

function Poster(prop) {
  const poster_url = "https://image.tmdb.org/t/p/w500";
  return (
    <>
      <div className="poster-title">
        <span>{prop.film.title}</span>
      </div>
      <div className="film-poster">
        <Link
          to={`/film/${formatPrettyURL(prop.film.title)}`}
          state={{ id: prop.film.tmdb_id }}
        >
          {prop.film.poster_path ? (
            <img
              src={poster_url + prop.film.poster_path}
              alt={prop.film.title}
            />
          ) : (
            <div className="default">
              <GiFilmSpool />
            </div>
          )}
        </Link>
      </div>
    </>
  );
}

export default Poster;
