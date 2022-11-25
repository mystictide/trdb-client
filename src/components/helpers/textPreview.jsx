// import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function TextPreview({ text, link }) {
  const [isReadMore, setIsReadMore] = useState(false);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  useEffect(() => {
    if (text.length > 450) {
      setIsReadMore(true);
    }
  }, [text]);

  return (
    <>
      <p className="overview">
        {isReadMore ? (
          <>
            {text.slice(0, 451)}
            <span onClick={toggleReadMore} className="read-more">
              {" "}
              ...read more
            </span>
          </>
        ) : (
          <>
            {text}
            {text.length > 450 && !isReadMore ? (
              <span onClick={toggleReadMore} className="read-more">
                {" "}
                show less
              </span>
            ) : (
              ""
            )}
          </>
        )}
      </p>
    </>
  );
}

export default TextPreview;
