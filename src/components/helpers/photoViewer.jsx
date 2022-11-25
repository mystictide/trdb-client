import { useDispatch } from "react-redux";
import { FaTimes } from "react-icons/fa";
import { modalSlice } from "../../features/helpers/modalSlice";

function PhotoViewer({ source, size }) {
  const dispatch = useDispatch();

  return (
    <>
      <div className="photo-container">
        <div
          className="photo-overlay"
          onClick={() => {
            dispatch(modalSlice.actions.updatePhotoState());
          }}
        ></div>
        <div className={`photo-content ${size === 2 ? "large" : ""}`}>
          <section className="heading">
            <FaTimes
              onClick={() => {
                dispatch(modalSlice.actions.updatePhotoState());
              }}
            />
          </section>
          <section className="image">
            <div className="picture">
              <img src={source} alt="trdb" />
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default PhotoViewer;
