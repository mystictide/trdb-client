import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Featured from "../../components/main/featured";
import Backdrop from "../../components/main/backdrop";
import { modalSlice } from "../../features/helpers/modalSlice";

function Welcome() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const el = document.getElementById("main");
    const elHeader = document.getElementById("header");
    el.classList.add("welcome-page");
    elHeader.classList.add("welcome-header");
  }, []);

  return (
    <>
      {!user ? <Backdrop /> : ""}
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
                  dispatch(modalSlice.actions.updateRegisterState());
                }}
              >
                COME ABOARD — AND SHARE!
              </button>
            </div>
          </div>
          <Featured />
        </div>
      </div>
    </>
  );
}

export default Welcome;
