import { Link } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";

function User(prop) {
  const photo_url = "https://image.tmdb.org/t/p/w500";
  return (
    <>
      <div className="poster-title">
        <span>{prop.Username}</span>
      </div>
      <div className="film-poster">
        <Link>
          {prop.picture_path ? (
            <img src={photo_url + prop.picture_path} alt={prop.name} />
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

export default User;
