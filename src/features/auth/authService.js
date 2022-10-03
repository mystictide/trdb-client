import axios from "axios";

const API_URL = "/api/users/";

const register = async (userData) => {
  const response = await axios.post(API_URL, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

const logout = async () => {
  localStorage.removeItem("user");
  localStorage.removeItem("userSpotify");
};

const checkExistingUsername = async (userData) => {
  const response = await axios.post(API_URL, userData.username);
  return response.data;
};

const checkExistingMail = async (userData) => {
  const response = await axios.post(API_URL, userData.email);
  return response.data;
};

const authService = {
  register,
  login,
  logout,
  checkExistingMail,
  checkExistingUsername,
};

export default authService;
