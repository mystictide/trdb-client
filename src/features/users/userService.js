import axios from "axios";

const API_URL = "https://localhost:7109/users/";
const headers = {
  "Content-Type": "application/json",
};

const GetUserProfile = async (reqData) => {
  var config = {
    method: "get",
    url: API_URL + "get/user?Username=" + reqData.username,
    headers: headers,
  };

  var data = await axios(config)
    .then(function (response) {
      localStorage.setItem("personal", JSON.stringify(response.data));
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });

  return data;
};

const GetUserFollowing = async (reqData) => {
  var config = {
    method: "get",
    url: API_URL + "get/following?UserID=" + reqData.id,
    headers: headers,
  };

  var data = await axios(config)
    .then(function (response) {
      localStorage.setItem("following", JSON.stringify(response.data));
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });

  return data;
};

const GetUserFollowers = async (reqData) => {
  var config = {
    method: "get",
    url: API_URL + "get/followers?UserID=" + reqData.id,
    headers: headers,
  };

  var data = await axios(config)
    .then(function (response) {
      localStorage.setItem("followers", JSON.stringify(response.data));
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });

  return data;
};

const GetUserBlocklist = async (reqData) => {
  var config = {
    method: "get",
    url: API_URL + "get/blocklist?UserID=" + reqData.id,
    headers: headers,
  };

  var data = await axios(config)
    .then(function (response) {
      localStorage.setItem("blocklist", JSON.stringify(response.data));
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });

  return data;
};

const userService = {
  GetUserProfile,
  GetUserFollowing,
  GetUserFollowers,
  GetUserBlocklist
};

export default userService;
