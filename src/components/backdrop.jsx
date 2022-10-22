import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GetWeekly } from "../features/main/mainSlice";
import datetimeDifference from "datetime-difference";

function Backdrop() {
  const dispatch = useDispatch();

  const { homepage } = useSelector((state) => state.main);
  const url = "https://image.tmdb.org/t/p/original/";

  useEffect(() => {
    if (!homepage.weekly) {
      dispatch(GetWeekly());
    } else {
      const diff = datetimeDifference(
        new Date(homepage.weekly.expires),
        new Date()
      );
      if (diff.days < 1 && diff.hours < 1 && diff.minutes < 1) {
        dispatch(GetWeekly());
        console.log("lol");
      }
    }
  }, [homepage, dispatch]);

  return (
    <div className="backdrop-container">
      <div className="backdrop-wrap">
        {homepage.weekly ? (
          <div
            className="backdrop-img"
            style={{
              backgroundImage: `url(${url + homepage.weekly.backdrop_path})`,
            }}
            loading="lazy"
          ></div>
        ) : (
          <div className="backdrop-img" loading="lazy"></div>
        )}
        <div className="backdrop-mask"></div>
      </div>
    </div>
  );
}

export default Backdrop;
