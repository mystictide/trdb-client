import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import Header from "./components/header";
import Backdrop from "./components/backdrop";
import Home from "./pages/main/home";
import Footer from "./components/footer";

function App() {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <Router>
        <div className="page-container">
          {!user ? <Backdrop /> : ""}
          <Header />
          <div id="main" className="main">
            <Routes>
              <Route path="/" element={<Home />}></Route>
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
