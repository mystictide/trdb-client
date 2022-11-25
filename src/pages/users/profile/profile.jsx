import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropagateLoader from "react-spinners/ClipLoader";
import { modalSlice } from "../../../features/helpers/modalSlice";
import PhotoViewer from "../../../components/helpers/photoViewer";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  GetUserProfile,
  GetUserFollowing,
  GetUserFollowers,
  reset,
} from "../../../features/users/userSlice";
import UserProfileFavorites from "./profileFavorites";

const UserProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { username } = useParams();
  const { user } = useSelector((state) => state.auth);
  const { profile, isLoading } = useSelector((state) => state.users);
  const { photoActive } = useSelector((state) => state.modals);

  useEffect(() => {
    if (!profile.personal) {
      const reqData = { username: username };
      dispatch(GetUserProfile(reqData));
    }
    if (profile.personal && !profile.following) {
      const reqData = { id: profile.personal.ID };
      dispatch(GetUserFollowing(reqData));
    }
    if (profile.personal && !profile.followers) {
      const reqData = { id: profile.personal.ID };
      dispatch(GetUserFollowers(reqData));
    }
  }, [user, profile, username, navigate, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  return (
    <>
      {isLoading ? (
        <div className="loading">
          <PropagateLoader color="#6f5773" size={30} speedMultiplier={0.5} />
        </div>
      ) : (
        <>
          <div className="user-profile">
            <div className="content">
              {profile.personal ? (
                <>
                  <div className="personal">
                    <div className="info">
                      <div className="picture">
                        <img
                          src="https://a.ltrbxd.com/resized/avatar/upload/1/0/2/9/3/6/2/shard/avtr-0-220-0-220-crop.jpg"
                          alt={profile.personal.Username}
                          onClick={() => {
                            dispatch(modalSlice.actions.updatePhotoState());
                          }}
                        />
                      </div>
                      <div className="user-info">
                        <div className="header">
                          <h3>{profile.personal.Username}</h3>
                          <Link to="/settings">Edit Profile</Link>
                        </div>
                        <h6>{profile.personal.Settings.bio}</h6>
                      </div>
                    </div>
                    <div className="stats">
                      <div className="stat">
                        <h2>866</h2>
                        <h5>Films</h5>
                      </div>
                      <div className="stat md">
                        <h2>77</h2>
                        <h5>This year</h5>
                      </div>
                      <div className="stat md">
                        <h2>44</h2>
                        <h5>Following</h5>
                      </div>
                      <div className="stat md">
                        <h2>35</h2>
                        <h5>Followers</h5>
                      </div>
                    </div>
                  </div>
                  <div className="user-nav">
                    <ul className="nav-list">
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
                  <div className="user-main-container">
                    <div className="user-main-content">
                      <UserProfileFavorites
                        favorites={profile.personal.Settings}
                      />
                    </div>
                    <div className="user-main-content">
                      Recent Activity
                    </div>
                    <div className="user-sidebar-content">Watchlist</div>
                  </div>
                </>
              ) : (
                ""
              )}
            </div>
          </div>
          {photoActive ? (
            <PhotoViewer
              source={
                "https://a.ltrbxd.com/resized/avatar/upload/1/0/2/9/3/6/2/shard/avtr-0-1000-0-1000-crop.jpg"
              }
            />
          ) : (
            ""
          )}
        </>
      )}
    </>
  );
};

export default UserProfile;
