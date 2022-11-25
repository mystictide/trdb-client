import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import PropagateLoader from "react-spinners/ClipLoader";

function FilmCredits({ credits, genres, languages, companies, countries }) {
  const navigate = useNavigate();

  const [filter, setFilter] = useState("cast");
  const [isShowMore, setIsShowMore] = useState(false);
  const toggleShowMore = () => {
    setIsShowMore(!isShowMore);
  };

  useEffect(() => {
    if (credits.cast.length > 28) {
      setIsShowMore(true);
    }
  }, [credits]);

  return (
    <>
      {credits ? (
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
          <div className="credits-items">
            {filter === "cast" ? (
              <div className="people">
                <p className="people-list">
                  {isShowMore ? (
                    <>
                      {credits.cast.slice(0, 29).map((person, index) => (
                        <Link className="item" key={person.id}>
                          {person.name}
                        </Link>
                      ))}
                      <span onClick={toggleShowMore} className="show-more">
                        {" "}
                        ...show more
                      </span>
                    </>
                  ) : (
                    <>
                      {credits.cast.map((person, index) => (
                        <Link className="item" key={person.id}>
                          {person.name}
                        </Link>
                      ))}
                      {credits.cast.length > 29 && !isShowMore ? (
                        <span onClick={toggleShowMore} className="show-more">
                          {" "}
                          show less
                        </span>
                      ) : (
                        ""
                      )}
                    </>
                  )}
                </p>
              </div>
            ) : (
              ""
            )}
            {filter === "details" ? (
              <div className="details">
                <ul className="details-list">
                  <li>
                    <div className="detail-item">
                      <h5>{companies.length > 1 ? "STUDIOS:" : "STUDIO:"}</h5>
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
                      <h5>{countries.length > 1 ? "COUNTRIES:" : "COUNTRY:"}</h5>
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
                      <h5>{languages.length > 1 ? "LANGUAGES:" : "LANGUAGE:"}</h5>
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
                          <h5>{genres.length > 1 ? "GENRES:" : "GENRE:"}</h5>
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
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default FilmCredits;
