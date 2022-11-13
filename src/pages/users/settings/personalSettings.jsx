import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import MediaUploader from "../../../components/helpers/mediaUploader";
import { update } from "../../../features/auth/authSlice";
import { reset } from "../../../features/users/settings/settingsSlice";
import {
  UpdatePersonal,
  ToggleDMs,
  ToggleWatchlist,
  TogglePrivacy,
  ToggleAdultContent,
} from "../../../features/users/settings/settingsSlice";
import {
  checkExistingMail,
  checkExistingUsername,
} from "../../../features/auth/validationSlice";
import { toast } from "react-toastify";

function PersonalSettings() {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { isError, isSuccess } = useSelector((state) => state.settings);

  const [personalFormData, setPersonalData] = useState({
    username: user.Username ?? "",
    email: user.Email ?? "",
    bio: user.Settings.bio ?? "",
    website: user.Settings.website ?? "",
  });

  const { username, email, bio, website } = personalFormData;
  const { usernameExists, emailExists } = useSelector(
    (state) => state.validation
  );

  useEffect(() => {
    if (isError) {
      toast("Something went wrong!");
      dispatch(reset());
    }
    if (!isError & isSuccess) {
      dispatch(update());
      toast("Settings saved!");
      dispatch(reset());
    }
  }, [isError, isSuccess, dispatch]);

  const onPersonalChange = (e) => {
    setPersonalData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onUsernameChange = (e) => {
    setPersonalData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    if (e.target.value.length > 0) {
      dispatch(checkExistingUsername(e.target.value));
    }
  };

  const onEmailChange = (e) => {
    setPersonalData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    if (e.target.value.length > 0) {
      dispatch(checkExistingMail(e.target.value));
    }
  };

  const onPersonalSubmit = (e) => {
    e.preventDefault();
    const reqData = {
      personal: { email, username, bio, website },
      token: user.Token,
    };
    dispatch(UpdatePersonal(reqData));
  };

  const onDMChange = (e) => {
    dispatch(ToggleDMs(user.Token));
  };

  const onWatchlistChange = (e) => {
    dispatch(ToggleWatchlist(user.Token));
  };

  const onPrivacyChange = (e) => {
    dispatch(TogglePrivacy(user.Token));
  };

  const onAdultChange = (e) => {
    dispatch(ToggleAdultContent(user.Token));
  };

  return (
    <>
      <h4>PERSONAL</h4>
      <div className="tab multiple">
        <div className="profile">
          <form className="settings-form-group" onSubmit={onPersonalSubmit}>
            <label>Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              value={username}
              placeholder={user.Username}
              onChange={onUsernameChange}
            />
            {usernameExists ? (
              <h5 className="form-error">Username already exists</h5>
            ) : (
              ""
            )}
            <label>Email address</label>
            <input
              type="text"
              className="form-control"
              id="email"
              name="email"
              value={email}
              placeholder={user.email}
              onChange={onEmailChange}
            />
            {emailExists ? (
              <h5 className="form-error">Email already exists</h5>
            ) : (
              ""
            )}
            <label>Bio</label>
            <textarea
              type="text"
              className="form-control"
              id="bio"
              name="bio"
              value={bio}
              placeholder={
                user.Settings.bio ? user.Settings.bio : "enter a bio"
              }
              onChange={onPersonalChange}
            />
            <label>Website</label>
            <input
              type="text"
              className="form-control"
              id="website"
              name="website"
              value={website}
              placeholder={
                user.Settings.website ? user.Settings.website : "enter a url"
              }
              onChange={onPersonalChange}
            />
            <button type="submit">Save</button>
          </form>
          <hr />
          <div className="privacy">
            <form className="form-group check">
              <label>Accept direct messages</label>
              <input
                type="checkbox"
                className="form-control"
                id="dm"
                name="dm"
                checked={user.Settings.dmallowed ?? 0}
                value={user.Settings.dmallowed ?? 0}
                onChange={onDMChange}
              />
            </form>
            <form className="form-group check">
              <label>Public watchlist</label>
              <input
                type="checkbox"
                className="form-control"
                id="watchlist"
                name="watchlist"
                checked={user.Settings.watchlist_public ?? 0}
                value={user.Settings.watchlist_public ?? 0}
                onChange={onWatchlistChange}
              />
            </form>
            <form className="form-group check">
              <label>Public profile</label>
              <input
                type="checkbox"
                className="form-control"
                id="public"
                name="public"
                checked={user.Settings.public ?? 0}
                value={user.Settings.public ?? 0}
                onChange={onPrivacyChange}
              />
            </form>
            <form className="form-group check">
              <label>Show adult content</label>
              <input
                type="checkbox"
                className="form-control"
                id="adult"
                name="adult"
                checked={user.Settings.adult ?? 0}
                value={user.Settings.adult ?? 0}
                onChange={onAdultChange}
              />
            </form>
          </div>
        </div>
        <MediaUploader />
      </div>
    </>
  );
}

export default PersonalSettings;
