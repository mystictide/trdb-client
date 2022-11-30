import { Link, useNavigate } from "react-router-dom";
import PropagateLoader from "react-spinners/ClipLoader";

function FilmCrew({ crew }) {
  const navigate = useNavigate();

  return (
    <>
      {crew ? (
        <div className="details">
          <ul className="details-list">
            {crew.directors.length > 0 ? (
              <li>
                <div className="detail-item">
                  <h5>
                    <span>
                      {crew.directors.length > 1 ? "DIRECTORS" : "DIRECTOR"}
                    </span>
                  </h5>
                  <p>
                    {crew.directors.map((director, index) => (
                      <Link className="item" key={director.id}>
                        {director.name}
                      </Link>
                    ))}
                  </p>
                </div>
              </li>
            ) : (
              ""
            )}

            {crew.producers.length > 0 ? (
              <li>
                <div className="detail-item">
                  <h5>
                    <span>
                      {crew.producers.length > 1 ? "PRODUCERS" : "PRODUCER"}
                    </span>
                  </h5>
                  <p>
                    {crew.producers.map((producer, index) => (
                      <Link className="item" key={producer.id}>
                        {producer.name}
                      </Link>
                    ))}
                  </p>
                </div>
              </li>
            ) : (
              ""
            )}
            {crew.writers.length > 0 ? (
              <li>
                <div className="detail-item">
                  <h5>
                    <span>
                      {crew.writers.length > 1 ? "WRITERS" : "WRITER"}
                    </span>
                  </h5>
                  <p>
                    {crew.writers.map((writer, index) => (
                      <Link className="item" key={writer.id}>
                        {writer.name}
                      </Link>
                    ))}
                  </p>
                </div>
              </li>
            ) : (
              ""
            )}
            {crew.editors.length > 0 ? (
              <li>
                <div className="detail-item">
                  <h5>
                    <span>
                      {crew.editors.length > 1 ? "EDITORS" : "EDITOR"}
                    </span>
                  </h5>
                  <p>
                    {crew.editors.map((editor, index) => (
                      <Link className="item" key={editor.id}>
                        {editor.name}
                      </Link>
                    ))}
                  </p>
                </div>
              </li>
            ) : (
              ""
            )}
            {crew.photographers.length > 0 ? (
              <li>
                <div className="detail-item">
                  <h5>
                    <span>CINEMATOGRAPHY</span>
                  </h5>
                  <p>
                    {crew.photographers.map((photographer, index) => (
                      <Link className="item" key={photographer.id}>
                        {photographer.name}
                      </Link>
                    ))}
                  </p>
                </div>
              </li>
            ) : (
              ""
            )}
            {crew.designers.length > 0 ? (
              <li>
                <div className="detail-item">
                  <h5>
                    <span>PRODUCTION DESIGN</span>
                  </h5>
                  <p>
                    {crew.designers.map((designer, index) => (
                      <Link className="item" key={designer.id}>
                        {designer.name}
                      </Link>
                    ))}
                  </p>
                </div>
              </li>
            ) : (
              ""
            )}
            {crew.art.length > 0 ? (
              <li>
                <div className="detail-item">
                  <h5>
                    <span>ART DIRECTION</span>
                  </h5>
                  <p>
                    {crew.art.map((artist, index) => (
                      <Link className="item" key={artist.id}>
                        {artist.name}
                      </Link>
                    ))}
                  </p>
                </div>
              </li>
            ) : (
              ""
            )}
            {crew.decorators.length > 0 ? (
              <li>
                <div className="detail-item">
                  <h5>
                    <span>SET DECORATION</span>
                  </h5>
                  <p>
                    {crew.decorators.map((decorator, index) => (
                      <Link className="item" key={decorator.id}>
                        {decorator.name}
                      </Link>
                    ))}
                  </p>
                </div>
              </li>
            ) : (
              ""
            )}
            {crew.composers.length > 0 ? (
              <li>
                <div className="detail-item">
                  <h5>
                    <span>COMPOSER</span>
                  </h5>
                  <p>
                    {crew.composers.map((composer, index) => (
                      <Link className="item" key={composer.id}>
                        {composer.name}
                      </Link>
                    ))}
                  </p>
                </div>{" "}
              </li>
            ) : (
              ""
            )}
            {crew.sound.length > 0 ? (
              <li>
                <div className="detail-item">
                  <h5>
                    <span>SOUND</span>
                  </h5>
                  <p>
                    {crew.sound.map((s, index) => (
                      <Link className="item" key={s.id}>
                        {s.name}
                      </Link>
                    ))}
                  </p>
                </div>
              </li>
            ) : (
              ""
            )}
            {crew.costume.length > 0 ? (
              <li>
                <div className="detail-item">
                  <h5>
                    <span>COSTUMES</span>
                  </h5>
                  <p>
                    {crew.costume.map((c, index) => (
                      <Link className="item" key={c.id}>
                        {c.name}
                      </Link>
                    ))}
                  </p>
                </div>
              </li>
            ) : (
              ""
            )}
            {crew.makeup.length > 0 ? (
              <li>
                <div className="detail-item">
                  <h5>
                    <span>MAKE-UP</span>
                  </h5>
                  <p>
                    {crew.makeup.map((m, index) => (
                      <Link className="item" key={m.id}>
                        {m.name}
                      </Link>
                    ))}
                  </p>
                </div>
              </li>
            ) : (
              ""
            )}
          </ul>
        </div>
      ) : (
        <div className="loading">
          <PropagateLoader color="#6f5773" size={30} speedMultiplier={0.5} />
        </div>
      )}
    </>
  );
}

export default FilmCrew;
