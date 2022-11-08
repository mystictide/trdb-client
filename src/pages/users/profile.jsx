import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  GetUserProfile,
  GetUserFollowing,
  GetUserFollowers,
} from "../../features/users/userSlice";
import { useNavigate, useParams } from "react-router-dom";

function UserProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { profile } = useSelector((state) => state.users);
  const { username } = useParams();

  useEffect(() => {
    if (!profile.personal) {
      const reqData = { username: username };
      dispatch(GetUserProfile(reqData));
    }
    if (profile.personal && !profile.following) {
      console.log("test");
      const reqData = { id: profile.personal.ID };
      dispatch(GetUserFollowing(reqData));
    }
    if (profile.personal && !profile.followers) {
      const reqData = { id: profile.personal.ID };
      dispatch(GetUserFollowers(reqData));
    }
  }, [user, profile, username, navigate, dispatch]);

  return (
    <>
      <div className="user-profile">
        <div className="content">
          <div className="personal">
            <h3>{profile.personal.Username}</h3>
          </div>
          <div className="functions">
            <ul className="function-list">
              <li>Profile</li>
              <li>Activity</li>
              <li>Films</li>
              <li>Diary</li>
              <li>Reviews</li>
              <li>Watchlist</li>
              <li>Lists</li>
              <li>Likes</li>
              <li>Network</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserProfile;
