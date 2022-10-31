import axios from "axios";

const API_URL = "https://localhost:7109/settings/";

const user = JSON.parse(localStorage.getItem("user"));

const UpdatePersonal = async (reqData) => {
  var config = {
    method: "post",
    url: API_URL + "personal",
    headers: {
      Authorization: "Bearer " + reqData.token,
      "Content-Type": "application/json",
    },
    data: JSON.stringify(reqData.personal),
  };

  var data = await axios(config)
    .then(function (response) {
      user.Settings.Username = response.data.username;
      user.Email = response.data.email;
      user.Settings.bio = response.data.bio;
      user.Settings.website = response.data.website;
      localStorage.setItem("user", JSON.stringify(user));
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });

  return data;
};

const UpdateAvatar = async (reqData) => {
  var config = {
    method: "post",
    url: API_URL + "avatar",
    headers: {
      Authorization: "Bearer " + reqData.token,
      "Content-Type": "multipart/form-data",
    },
    data: reqData.data,
  };

  var data = await axios(config)
    .then(function (response) {
      user.Settings.picture_path = response.data + "ua-small.jpg";
      localStorage.setItem("user", JSON.stringify(user));
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });

  return data;
};

const ToggleDMs = async (reqData) => {
  var config = {
    method: "post",
    url: API_URL + "dm",
    headers: {
      Authorization: "Bearer " + reqData,
      "Content-Type": "application/json",
    },
  };

  var data = await axios(config)
    .then(function (response) {
      user.Settings.dmallowed = response.data;
      localStorage.setItem("user", JSON.stringify(user));
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });

  return data;
};

const TogglePrivacy = async (reqData) => {
  var config = {
    method: "post",
    url: API_URL + "privacy",
    headers: {
      Authorization: "Bearer " + reqData,
      "Content-Type": "application/json",
    },
  };

  var data = await axios(config)
    .then(function (response) {
      user.Settings.public = response.data;
      localStorage.setItem("user", JSON.stringify(user));
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });

  return data;
};

const ToggleAdultContent = async (reqData) => {
  var config = {
    method: "post",
    url: API_URL + "adult",
    headers: {
      Authorization: "Bearer " + reqData,
      "Content-Type": "application/json",
    },
  };

  var data = await axios(config)
    .then(function (response) {
      user.Settings.adult = response.data;
      localStorage.setItem("user", JSON.stringify(user));
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });

  return data;
};

const settingsService = {
  UpdatePersonal,
  UpdateAvatar,
  ToggleDMs,
  TogglePrivacy,
  ToggleAdultContent,
};

export default settingsService;
