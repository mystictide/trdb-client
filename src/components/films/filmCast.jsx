import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import PropagateLoader from "react-spinners/ClipLoader";
import FilmCharacterPopup from "./filmCharacterPopup";

function FilmCast({ cast }) {
  const navigate = useNavigate();
  const [isShowMore, setIsShowMore] = useState(false);
  const [popupData, setPopupData] = useState(null);

  const toggleShowMore = () => {
    setIsShowMore(!isShowMore);
  };

  const togglePopup = (e, character) => {
    if (e) {
      const box = e.target.getBoundingClientRect();
      const yCenter = (box.top + box.bottom) / 2;
      var data = { name: character, top: yCenter, left: box.left };
      setPopupData(data);
    } else {
      setPopupData(null);
    }
  };

  useEffect(() => {
    if (cast.length > 28) {
      setIsShowMore(true);
    }
  }, [cast]);

  return (
    <>
      {cast ? (
        <>
          <div className="people">
            <div className="people-list">
              {isShowMore ? (
                <>
                  {popupData ? <FilmCharacterPopup data={popupData} /> : ""}
                  {cast.slice(0, 29).map((person, index) => (
                    <div
                      key={person.id}
                      onMouseEnter={(e) => togglePopup(e, person.character)}
                      onMouseLeave={(e) => togglePopup()}
                    >
                      <span className="person">
                        <Link className="item">{person.name}</Link>
                      </span>
                    </div>
                  ))}
                  <span onClick={toggleShowMore} className="show-more">
                    {" "}
                    ...show more
                  </span>
                </>
              ) : (
                <>
                  {popupData ? <FilmCharacterPopup data={popupData} /> : ""}
                  {cast.map((person, index) => (
                    <div
                      key={person.id}
                      onMouseEnter={(e) => togglePopup(e, person.character)}
                      onMouseLeave={(e) => togglePopup()}
                    >
                      <span key={person.id} className="person">
                        <Link className="item">{person.name}</Link>
                      </span>
                    </div>
                  ))}
                  {cast.length > 29 && !isShowMore ? (
                    <span onClick={toggleShowMore} className="show-more">
                      {" "}
                      show less
                    </span>
                  ) : (
                    ""
                  )}
                </>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="loading">
          <PropagateLoader color="#6f5773" size={30} speedMultiplier={0.5} />
        </div>
      )}
    </>
  );
}

export default FilmCast;
