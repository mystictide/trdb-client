import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/header";
import Home from "./pages/main/home";
import Footer from "./components/footer";
import Register from "./pages/account/register";
import Login from "./pages/account/login";

function App() {
  return (
    <>
      <Router>
        <div className="page-container">
          <Header />
          <div className="main">
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/register" element={<Register />}></Route>
              <Route path="/login" element={<Login />}></Route>
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
