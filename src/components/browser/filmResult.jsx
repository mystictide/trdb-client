import { Link } from "react-router-dom";
import Poster from "../../components/main/poster";

function FilmResult({ films }) {
  return (
    <>
      {films
        ? films.data.map((item, index) => (
            <div className="match" key={index}>
              <Poster film={item} />
              <div className="match-info">
                <div className="details">
                  <div className="header">
                    <span>{item.title}</span>
                    <span>({item.release_date.substring(0, 4)})</span>
                  </div>
                  <p>{item.overview}</p>
                  <h5>
                    Directed by{" "}
                    <span>
                      <Link>Test</Link>
                    </span>
                  </h5>
                </div>
              </div>
            </div>
          ))
        : ""}
    </>
  );
}

export default FilmResult;
