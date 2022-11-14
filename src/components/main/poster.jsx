import { Link } from "react-router-dom";

function Poster(prop) {
  const poster_url = "https://image.tmdb.org/t/p/w500";

  return (
    <>
      <div className="poster-title">
        <span>{prop.film.title}</span>
      </div>
      <div className="film-poster">
        <Link>
          <img
            src={poster_url + prop.film.poster_path}
            alt={prop.film.title}
          />
        </Link>
      </div>
    </>
  );
}

export default Poster;
