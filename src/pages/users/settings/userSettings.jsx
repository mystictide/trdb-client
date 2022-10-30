import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PersonalSettings from "../../../components/users/settings/personalSettings";
import FilmSettings from "../../../components/users/settings/filmSettings";
import ConnectionSettings from "../../../components/users/settings/connSettings";
import NotificationSettings from "../../../components/users/settings/notifSettings";
import ImportSettings from "../../../components/users/settings/importSettings";
import { useNavigate } from "react-router-dom";

function UserSettings() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [panelData, setPanelData] = useState({
    personal: true,
    film: false,
    conn: false,
    notif: false,
    imp: false,
  });
  const { personal, film, conn, notif, imp } = panelData;
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    // if (!user) {
    //   navigate("/");
    // }
  }, [user, navigate, dispatch]);

  const setActivePanel = (e, panel) => {
    const nav = document.getElementById("panels").children;
    for (let item of nav) {
      item.firstChild.classList.remove("active");
    }
    e.target.classList.toggle("active");
    setPanelState(panel);
  };

  const setPanelState = (panel) => {
    setPanelData(false);
    if (panel === 1) {
      setPanelData((prevState) => ({
        ...prevState,
        personal: !personal,
      }));
    }
    if (panel === 2) {
      setPanelData((prevState) => ({
        ...prevState,
        film: !film,
      }));
    }
    if (panel === 3) {
      setPanelData((prevState) => ({
        ...prevState,
        conn: !conn,
      }));
    }
    if (panel === 4) {
      setPanelData((prevState) => ({
        ...prevState,
        notif: !notif,
      }));
    }
    if (panel === 5) {
      setPanelData((prevState) => ({
        ...prevState,
        imp: !imp,
      }));
    }
  };

  return (
    <>
      <div className="user-settings">
        <div className="content">
          <h2>Settings</h2>
          <div className="settings-nav">
            <ul id="panels">
              <li>
                <button
                  className="active"
                  onClick={(e) => setActivePanel(e, 1)}
                >
                  PERSONAL
                </button>
              </li>
              <li>
                <button onClick={(e) => setActivePanel(e, 2)}>
                  FILMS
                </button>
              </li>
              <li>
                <button onClick={(e) => setActivePanel(e, 3)}>
                  CONNECTIONS
                </button>
              </li>
              <li>
                <button onClick={(e) => setActivePanel(e, 4)}>
                  NOTIFICATIONS
                </button>
              </li>
              <li>
                <button onClick={(e) => setActivePanel(e, 5)}>
                  IMPORT & EXPORT
                </button>
              </li>
              <li>
                <button onClick={(e) => setActivePanel(e, 6)}>
                  Deactivate
                </button>
              </li>
            </ul>
          </div>
          <div className="settings-wrap">
            {panelData.personal ? <PersonalSettings /> : ""}
            {panelData.film ? <FilmSettings /> : ""}
            {panelData.conn ? <ConnectionSettings /> : ""}
            {panelData.notif ? <NotificationSettings /> : ""}
            {panelData.imp ? <ImportSettings /> : ""}
          </div>
        </div>
      </div>
    </>
  );
}

export default UserSettings;
