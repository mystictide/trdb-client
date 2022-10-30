import axios from "axios";

const user = JSON.parse(localStorage.getItem("user")) ?? 0;
const API_URL = "https://localhost:7109/auth/";
const headers = {
  Authorization: "Bearer " + user.Token,
  "Content-Type": "application/json",
};

const checkExistingUsername = async (username) => {
  var config = {
    method: "post",
    url: API_URL + "cusername",
    headers: headers,
    data: JSON.stringify(username),
  };

  var data = await axios(config)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
  return data;
};

const checkExistingMail = async (email) => {
  var config = {
    method: "post",
    url: API_URL + "cmail",
    headers: headers,
    data: JSON.stringify(email),
  };

  var data = await axios(config)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
  return data;
};

const validationService = {
  checkExistingMail,
  checkExistingUsername,
};

export default validationService;
