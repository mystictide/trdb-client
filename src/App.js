import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/header";
import Home from "./pages/main/home";
import UserProfile from "./pages/users/profile";
import UserSettings from "./pages/users/settings/userSettings";
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
              <Route path="/u/:username" element={<UserProfile />} />
              <Route path="/settings/" element={<UserSettings />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
