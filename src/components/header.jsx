import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout, reset } from "../features/auth/authSlice";
import { BiSearch } from "react-icons/bi";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoggedOut } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isLoggedOut) {
      navigate("/");
      dispatch(reset());
    }
  }, [user, isLoggedOut, navigate, dispatch]);

  const doLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <header>
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
                    <button onClick={doLogout}>Logout</button>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <Link to="/" className="logo"></Link>
          )}
        </nav>
      </header>
    </>
  );
};

export default Header;
