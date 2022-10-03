import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {}, [user, navigate, dispatch]);

  return (
    <>
      {user.userSpotify ? (
        <div>
          <button className="gnr-button">Match!</button>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default Dashboard;
