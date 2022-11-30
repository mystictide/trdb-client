import axios from "axios";

const API_URL = "https://localhost:7109/film/";

const GetUserFilmDetails = async (reqData) => {
  var config = {
    method: "get",
    url: API_URL + "get/user?ID=" + reqData.id,
    headers: {
      Authorization: "Bearer " + reqData.token,
      "Content-Type": "application/json",
    },
  };

  var data = await axios(config)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return { data: error.response.data, status: error.response.status };
    });

  return data;
};

const Watch = async (reqData) => {
  var config = {
    method: "get",
    url: API_URL + "watch?ID=" + reqData.id,
    headers: {
      Authorization: "Bearer " + reqData.token,
      "Content-Type": "application/json",
    },
  };

  var data = await axios(config)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return { data: error.response.data, status: error.response.status };
    });

  return data;
};

const Like = async (reqData) => {
  var config = {
    method: "get",
    url: API_URL + "like?ID=" + reqData.id,
    headers: {
      Authorization: "Bearer " + reqData.token,
      "Content-Type": "application/json",
    },
  };

  var data = await axios(config)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return { data: error.response.data, status: error.response.status };
    });

  return data;
};

const Watchlist = async (reqData) => {
  var config = {
    method: "get",
    url: API_URL + "watchlist?ID=" + reqData.id,
    headers: {
      Authorization: "Bearer " + reqData.token,
      "Content-Type": "application/json",
    },
  };

  var data = await axios(config)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return { data: error.response.data, status: error.response.status };
    });

  return data;
};

const Rate = async (reqData) => {
  var config = {
    method: "post",
    url: API_URL + "rate",
    headers: {
      Authorization: "Bearer " + reqData.token,
      "Content-Type": "application/json",
    },
    data: JSON.stringify(reqData.entity),
  };

  var data = await axios(config)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return { data: error.response.data, status: error.response.status };
    });

  return data;
};

const Review = async (reqData) => {
  var config = {
    method: "post",
    url: API_URL + "review",
    headers: {
      Authorization: "Bearer " + reqData.token,
      "Content-Type": "application/json",
    },
    data: JSON.stringify(reqData.entity),
  };

  var data = await axios(config)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      return { data: error.response.data, status: error.response.status };
    });

  return data;
};

const userFilmService = {
  GetUserFilmDetails,
  Watch,
  Like,
  Watchlist,
  Rate,
  Review,
};

export default userFilmService;
