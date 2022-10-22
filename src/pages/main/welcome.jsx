import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { accountModalSlice } from "../../features/helpers/accountModalSlice";

function Welcome() {
  const dispatch = useDispatch();

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
            <h1>Your Art, Your Thoughts</h1>
            <h1>Take notes on the Films you see</h1>
            <h1>Say a few words about the Artists you listen to</h1>
          </div>
          <div className="functions">
            <button
              onClick={() => {
                dispatch(accountModalSlice.actions.updateRegisterState());
              }}
            >
              COME ABOARD — AND SHARE!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
