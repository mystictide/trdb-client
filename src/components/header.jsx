import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout, reset } from "../features/auth/authSlice";
import { accountModalSlice } from "../features/helpers/accountModalSlice";
import RegisterModal from "./account/register";
import LoginModal from "./account/login";
import { BiSearch } from "react-icons/bi";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoggedOut } = useSelector((state) => state.auth);
  const { loginActive, registerActive } = useSelector(
    (state) => state.accountModal
  );

  useEffect(() => {
    if (isLoggedOut) {
      navigate("/");
      dispatch(reset());
    }
  }, [user, isLoggedOut, loginActive, registerActive, navigate, dispatch]);

  const doLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <header id="header">
        <nav>
          {user ? (
            <>
              <Link to="/" className="logo" />
              <div className="main-nav">
                <ul>
                  <li>
                    <Link to="/me">{user.Username}</Link>
                  </li>
                  <li>Films</li>
                  <li>Messages</li>
                  <li>Lists</li>
                  <li>Members</li>
                  <li>
                    {" "}
                    <BiSearch />
                  </li>
                  <li>
                    {/* Log */}
                    <button onClick={doLogout}>Logout</button>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <>
              <Link to="/" className="logo" />
              <div className="main-nav ">
                <ul>
                  <li>
                    <button
                      onClick={() => {
                        dispatch(accountModalSlice.actions.updateLoginState());
                      }}
                    >
                      Sign in
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        dispatch(
                          accountModalSlice.actions.updateRegisterState()
                        );
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
                    <form className="search-form">
                      <fieldset>
                        <input className="search"></input>
                        <button type="submit">
                          <BiSearch />
                        </button>
                      </fieldset>
                    </form>
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
