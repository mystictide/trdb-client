import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import MediaUploader from "../../../components/helpers/mediaUploader";

function PersonalSettings() {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const [personalFormData, setPersonalData] = useState({
    username: user.Username ?? "",
    email: user.Email ?? "",
    bio: user.Settings.bio ?? "",
    website: user.Settings.website ?? "",
  });

  const { username, email, bio, website } = personalFormData;

  useEffect(() => {}, [dispatch]);

  const onPersonalChange = (e) => {
    setPersonalData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onPersonalSubmit = (e) => {
    // e.preventDefault();
    // const userData = { email, password };
    // dispatch(login(userData));
  };

  const onDMChange = (e) => {};

  const onPrivacyChange = (e) => {};

  const onAdultChange = (e) => {};

  return (
    <>
      <h4>PERSONAL</h4>
      <div className="tab personal">
        <div className="profile">
          <form className="form-group" onSubmit={onPersonalSubmit}>
            <label>Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              value={username}
              placeholder={user.Username}
              onChange={onPersonalChange}
            />
            <label>Email address</label>
            <input
              type="text"
              className="form-control"
              id="email"
              name="email"
              value={email}
              placeholder={user.email}
              onChange={onPersonalChange}
            />
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
