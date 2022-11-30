import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FilmCrew from "./filmCrew";
import FilmCast from "./filmCast";

function FilmCredits({ cast, crew, genres, languages, companies, countries }) {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("cast");

  return (
    <div className="film-credits-headers">
      <div className="header-nav">
        <ul>
          <li
            className={filter === "cast" ? "active" : ""}
            onClick={(e) => setFilter("cast")}
          >
            Cast
          </li>
          <li
            className={filter === "crew" ? "active" : ""}
            onClick={(e) => setFilter("crew")}
          >
            Crew
          </li>
          <li
            className={filter === "details" ? "active" : ""}
            onClick={(e) => setFilter("details")}
          >
            Details
          </li>
          <li
            className={filter === "genres" ? "active" : ""}
            onClick={(e) => setFilter("genres")}
          >
            Genres
          </li>
        </ul>
      </div>
      {cast ? (
        <div className="credits-items">
          {filter === "cast" ? (
          <FilmCast cast={cast} /> 
          ) : (
            ""
          )}
          {filter === "crew" ? <FilmCrew crew={crew} /> : ""}
          {filter === "details" ? (
            <div className="details">
              <ul className="details-list">
                <li>
                  <div className="detail-item">
                    <h5>
                      <span>{companies.length > 1 ? "STUDIOS" : "STUDIO"}</span>
                    </h5>
                    <p>
                      {companies.map((company, index) => (
                        <Link className="item" key={company.id}>
                          {company.name}
                        </Link>
                      ))}
                    </p>
                  </div>
                </li>
                <li>
                  <div className="detail-item">
                    <h5>
                      <span>
                        {countries.length > 1 ? "COUNTRIES" : "COUNTRY"}
                      </span>
                    </h5>
                    <p>
                      {countries.map((country, index) => (
                        <Link className="item" key={country.ID}>
                          {country.iso_3166_1}
                        </Link>
                      ))}
                    </p>
                  </div>
                </li>
                <li>
                  <div className="detail-item">
                    <h5>
                      <span>
                        {languages.length > 1 ? "LANGUAGES" : "LANGUAGE"}
                      </span>
                    </h5>
                    <p>
                      {languages.map((language, index) => (
                        <Link className="item" key={language.ID}>
                          {language.english_name}
                        </Link>
                      ))}
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          ) : (
            ""
          )}
          {filter === "genres" ? (
            <div className="details">
              <ul className="details-list">
                {genres ? (
                  <>
                    <li>
                      <div className="detail-item">
                        <h5>
                          <span>{genres.length > 1 ? "GENRES" : "GENRE"}</span>
                        </h5>
                        <p>
                          {genres.map((genre, index) => (
                            <Link className="item" key={genre.id}>
                              {genre.name}
                            </Link>
                          ))}
                        </p>
                      </div>
                    </li>
                  </>
                ) : (
                  ""
                )}
              </ul>
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default FilmCredits;
