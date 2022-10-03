import { Link } from "react-router-dom";

function Welcome() {
  return (
    <div className="greetings">
      <div className=""></div>
      <div className="message">
        <h1>Match it up,</h1>
        <h1>but with your music taste this time.</h1>
        <h5>Sign up, connect your Spotify account & look around</h5>
      </div>
      <div className="functions">
        <Link to="/register">Sign up</Link>
        <Link to="/login" className="min">or Sign in</Link>
      </div>
    </div>
  );
}

export default Welcome;
