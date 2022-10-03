import axios from "axios";

const API_URL = "/api/users/";

const checkExistingUsername = async (username) => {
  const response = await axios.post(API_URL + "cusername", {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: username,
  });
  return response.data;
};

const checkExistingMail = async (email) => {
  const response = await axios.post(API_URL + "cmail", {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: email,
  });
  return response.data;
};

const validationService = {
  checkExistingMail,
  checkExistingUsername,
};

export default validationService;
