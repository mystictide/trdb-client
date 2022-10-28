import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

function PersonalSettings() {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { profile } = useSelector((state) => state.users);

  const [personalFormData, setPersonalData] = useState({
    username: user.Username ?? "",
    email: user.Email ?? "",
    bio: profile.personal.bio ?? "",
    website: profile.personal.website ?? "",
  });

  const [mediaData, setMedialData] = useState({
    picture: profile.personal.picture ?? "",
  });

  const { username, email, bio, website } = personalFormData;
  const { picture } = mediaData;

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

  const onMediaSelect = (e) => {};

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
                profile.personal.bio ? profile.personal.bio : "enter a bio"
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
                profile.personal.website
                  ? profile.personal.website
                  : "enter a url"
              }
              onChange={onPersonalChange}
            />
            <button type="submit">Save</button>
          </form>
          <hr />
          <form className="form-group check">
            <label>Accept direct messages</label>
            <input
              type="checkbox"
              className="form-control"
              id="dm"
              name="dm"
              value={profile.personal.dmallowed}
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
              value={profile.personal.public}
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
              value={profile.personal.adult}
              onChange={onAdultChange}
            />
          </form>
        </div>
        <div className="media">
          <form className="form-group" onSubmit={onPersonalSubmit}>
            <label>Profile picture</label>
            <section className="uploader-container">
              <div className="uploader">
                <div className="file">
                  <div className="interact">
                    <input
                      type="file"
                      className="form-control"
                      id="picture"
                      name="picture"
                      onChange={onMediaSelect}
                    />
                    <label htmlFor="picture">Drag and drop image</label>
                  </div>
                  <div className="preview-container">
                    <div className="preview">
                      <img
                        alt="user avatar"
                        src="https://a.ltrbxd.com/resized/avatar/upload/1/0/2/9/3/6/2/shard/avtr-0-1000-0-1000-crop.jpg"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <button type="submit">Save</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default PersonalSettings;
