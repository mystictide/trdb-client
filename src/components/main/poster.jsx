import { Link } from "react-router-dom";

function Poster(prop) {
  const poster_url = "https://image.tmdb.org/t/p/w500";
  return (
    <div className="movie-poster">
      <Link>
        <img src={poster_url + prop.movie.poster_path} alt={prop.movie.title} />
      </Link>
    </div>
  );
}

export default Poster;
