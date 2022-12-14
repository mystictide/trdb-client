import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/header";
import Home from "./pages/main/home";
import Film from "./pages/films/film";
import UserFilmReview from "./pages/films/userFilmReview";
import UserFilmLogs from "./pages/films/userFilmLogs";
import UserProfile from "./pages/users/profile/profile";
import UserSettings from "./pages/users/settings/userSettings";
import Browse from "./pages/main/browse";
import Footer from "./components/footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <div className="page-container">
          <Header />
          <div id="main" className="main">
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/film/:title" element={<Film />} />
              <Route path="/:username/film/:title-:year/">
                <Route path=":count" element={<UserFilmReview />} />
                <Route path="" element={<UserFilmReview />} />
              </Route>
              <Route
                path="/:username/film/:title-:year/logs"
                element={<UserFilmLogs />}
              ></Route>
              <Route path="/u/:username" element={<UserProfile />} />
              <Route path="/browse/:keyword" element={<Browse />} />
              <Route path="/settings/" element={<UserSettings />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={3500}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme="dark"
      />
    </>
  );
}

export default App;
