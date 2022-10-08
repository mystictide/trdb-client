import { useEffect } from "react";
import { Link } from "react-router-dom";

function Welcome() {
  useEffect(() => {
    const el = document.getElementById("main");
    const elHeader = document.getElementById("header");
    el.classList.add("welcome-page");
    elHeader.classList.add("welcome-header");
  }, []);
  return (
    <div className="content">
      <div className="content-wrap">
        <div className="greetings">
          <div className="message">
            <h1>Your Art, Your Media</h1>
            <h1>Take notes on the Films you see</h1>
            <h1>Say a few words about the Artists you listen to</h1>
            {/* <h5>Sign up, connect and & have a look around</h5> */}
          </div>
          <div className="functions">
            <Link to="/register">GO AHEAD — COME ABOARD!</Link>
            {/* <Link to="/login" className="min">
              or Sign in
            </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
