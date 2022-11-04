import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { register } from "../../features/auth/authSlice";
import {
  checkExistingMail,
  checkExistingUsername,
} from "../../features/auth/validationSlice";
import { useNavigate } from "react-router-dom";
import { modalSlice } from "../../features/helpers/modalSlice";
import { FaTimes } from "react-icons/fa";

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [formValidation, setFormValidation] = useState({
    vPassword: true,
  });

  const { user, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );
  const { username, email, password } = formData;
  const { vPassword } = formValidation;
  const { usernameExists, emailExists } = useSelector(
    (state) => state.validation
  );

  useEffect(() => {
    if (user) {
      navigate("/");
    }
    if (isSuccess) {
      navigate("/login");
    }
    if (isError) {
      toast.error(message);
    }
  }, [
    user,
    isSuccess,
    isError,
    message,
    navigate,
    setFormData,
    setFormValidation,
    dispatch,
  ]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    setTimeout(() => {
      validateFields(e);
    }, 1500);
  };

  const validateFields = (e) => {
    if (e.target.name === "username") {
      if (e.target.value.length > 0) {
        dispatch(checkExistingUsername(e.target.value));
      }
    }
    if (e.target.name === "email") {
      if (e.target.value.length > 0) {
        dispatch(checkExistingMail(e.target.value));
      }
    }
    if (e.target.name === "password") {
      if (e.target.value.length > 6) {
        setFormValidation((prevState) => ({
          ...prevState,
          vPassword: false,
        }));
      } else {
        setFormValidation((prevState) => ({
          ...prevState,
          vPassword: true,
        }));
      }
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const userData = { username, email, password };
    if (!vPassword) {
      dispatch(register(userData));
    }
  };

  return (
    <div className="account-container">
      <div className="acc-overlay"></div>
      <div className="account-content">
        <section className="heading">
          <h1>Join ReviewDB</h1>
          <FaTimes
            onClick={() => {
              dispatch(modalSlice.actions.updateRegisterState());
            }}
          />
        </section>
        <section className="form">
          <form className="form-group" onSubmit={onSubmit}>
            <label>Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              value={username}
              placeholder="enter a username"
              onChange={onChange}
            />
            {usernameExists ? (
              <label className="error">Username already exists</label>
            ) : (
              ""
            )}
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              placeholder="enter an email address"
              onChange={onChange}
            />
            {emailExists ? (
              <label className="error">Email address already registered</label>
            ) : (
              ""
            )}
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              placeholder="set a password"
              onChange={onChange}
            />
            {vPassword ? (
              <label className="error">
                Password requires more than 6 characters
              </label>
            ) : (
              ""
            )}
            <div className="functions">
              <button type="submit">Sign up</button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}

export default Register;
