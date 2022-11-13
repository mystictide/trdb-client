import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout, reset } from "../features/auth/authSlice";
import { clearBrowser } from "../features/main/mainSlice";
import { modalSlice } from "../features/helpers/modalSlice";
import RegisterModal from "./account/register";
import LoginModal from "./account/login";
import { BiX, BiSearch } from "react-icons/bi";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { loginActive, registerActive } = useSelector((state) => state.modals);

  const [searchActive, setSearchState] = useState(false);
  const [searchData, setsearchData] = useState({
    keyword: "",
  });
  const { keyword } = searchData;

  useEffect(() => {}, [user, loginActive, registerActive, navigate, dispatch]);

  const doLogout = () => {
    dispatch(logout());
    navigate("/");
    dispatch(reset());
  };

  const onKeywordChange = (e) => {
    setsearchData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onKeywordSubmit = (e) => {
    dispatch(clearBrowser());
    navigate("/browse/" + keyword);
  };

  return (
    <>
      <header id="header">
        <nav>
          {user ? (
            <>
              <Link to="/" className="logo" />
              <div className="main-nav">
                <ul className="nav-list">
                  <li>
                    <Link to="/me">{user.Username}</Link>
                  </li>
                  <li>Films</li>
                  <li>Messages</li>
                  <li>Lists</li>
                  <li>Members</li>
                  {!searchActive ? (
                    <>
                      <li
                        className="search"
                        onClick={(e) => setSearchState(!searchActive)}
                      >
                        <BiSearch />
                      </li>
                      <li>
                        {/* Log */}
                        <button onClick={doLogout}>Logout</button>
                      </li>
                    </>
                  ) : (
                    <li>
                      <div className="search-box">
                        <fieldset>
                          <button
                            type="button"
                            className="cancel"
                            onClick={(e) => setSearchState(!searchActive)}
                          >
                            <BiX />
                          </button>
                          <input
                            className="search"
                            type="text"
                            id="keyword"
                            name="keyword"
                            value={keyword}
                            onChange={onKeywordChange}
                          ></input>
                          <button type="button" onClick={onKeywordSubmit}>
                            <BiSearch />
                          </button>
                        </fieldset>
                      </div>
                    </li>
                  )}
                </ul>
              </div>
            </>
          ) : (
            <>
              <Link to="/" className="logo" />
              <div className="main-nav ">
                <ul className="nav-list">
                  <li>
                    <button
                      onClick={() => {
                        dispatch(modalSlice.actions.updateLoginState());
                      }}
                    >
                      Sign in
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        dispatch(modalSlice.actions.updateRegisterState());
                      }}
                    >
                      Register
                    </button>
                  </li>
                  <li>Films</li>
                  <li>Lists</li>
                  <li>Members</li>
                  <li>Blog</li>
                  <li>
                    <div className="search-box">
                      <fieldset>
                        <input className="search"></input>
                        <button type="button">
                          <BiSearch />
                        </button>
                      </fieldset>
                    </div>
                  </li>
                </ul>
              </div>
            </>
          )}
        </nav>
      </header>
      {loginActive ? <LoginModal /> : ""}
      {registerActive ? <RegisterModal /> : ""}
    </>
  );
};

export default Header;
