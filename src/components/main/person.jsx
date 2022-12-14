import { Link } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";

function Person(prop) {
  const photo_url = "https://image.tmdb.org/t/p/w500";
  const person = prop.actor;
  return (
    <>
      <div className="poster-title">
        <span>{person.name}</span>
      </div>
      <div className="film-poster">
        <Link>
          {person.profile_path ? (
            <img src={photo_url + person.profile_path} alt={person.name} />
          ) : (
            <div className="default">
              <FaUserAlt />
            </div>
          )}
        </Link>
      </div>
    </>
  );
}

export default Person;
