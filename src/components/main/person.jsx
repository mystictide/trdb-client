import { Link } from "react-router-dom";

function Person(prop) {
  const photo_url = "https://image.tmdb.org/t/p/w500";
  const person = prop.actor;
  return (
    <>
      <div className="poster-title">
        <span>{person.name}</span>
      </div>
      <div className="movie-poster">
        <Link>
          <img src={photo_url + person.profile_path} alt={person.name} />
        </Link>
      </div>
    </>
  );
}

export default Person;
