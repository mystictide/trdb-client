import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Poster from "../../../components/main/poster";
import Person from "../../../components/main/person";
import { GiFilmSpool } from "react-icons/gi";
import { FaUserAlt } from "react-icons/fa";

const UserProfileFavorites = ({ favorites }) => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("films");
  const filmCounter =
    favorites.favorite_films.length - 4 >= 0
      ? 0
      : 4 - favorites.favorite_films.length;
  const actorCounter =
    favorites.favorite_actors.length - 4 >= 0
      ? 0
      : 4 - favorites.favorite_actors.length;
  const directorCounter =
    favorites.favorite_directors.length - 4 >= 0
      ? 0
      : 4 - favorites.favorite_directors.length;

  return (
    <>
      <div className="user-content-headers">
        <div className="header-nav">
          <span>Favorite</span>
          <ul>
            <li
              className={filter === "films" ? "active" : ""}
              onClick={(e) => setFilter("films")}
            >
              Films
            </li>
            <li
              className={filter === "actors" ? "active" : ""}
              onClick={(e) => setFilter("actors")}
            >
              Actors
            </li>
            <li
              className={filter === "directors" ? "active" : ""}
              onClick={(e) => setFilter("directors")}
            >
              Directors
            </li>
          </ul>
        </div>
        <div className="item-boxes">
          <ul className="item-list">
            {filter === "films" ? (
              <>
                {favorites.favorite_films.map((film, index) => (
                  <li className="item" key={film.tmdb_id + index}>
                    <Poster film={film} />
                  </li>
                ))}
                {[...Array(filmCounter)].map((filmCounter, index) => (
                  <li key={index}>
                    <div className="film-poster">
                      <div className="no-entry">
                        <GiFilmSpool />
                      </div>
                    </div>
                  </li>
                ))}
              </>
            ) : (
              ""
            )}
            {filter === "actors" ? (
              <>
                {favorites.favorite_actors.map((actor, index) => (
                  <li className="item" key={actor.tmdb_id + index}>
                    <Person actor={actor} />
                  </li>
                ))}
                {[...Array(actorCounter)].map((actorCounter, index) => (
                  <li key={index}>
                    <div className="film-poster">
                      <div className="no-entry">
                        <FaUserAlt />
                      </div>
                    </div>
                  </li>
                ))}
              </>
            ) : (
              ""
            )}
            {filter === "directors" ? (
              <>
                {favorites.favorite_directors.map((director, index) => (
                  <li className="item" key={director.tmdb_id + index}>
                    <Person actor={director} />
                  </li>
                ))}
                {[...Array(directorCounter)].map((directorCounter, index) => (
                  <li key={index}>
                    <div className="film-poster">
                      <div className="no-entry">
                        <FaUserAlt />
                      </div>
                    </div>
                  </li>
                ))}
              </>
            ) : (
              ""
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default UserProfileFavorites;
