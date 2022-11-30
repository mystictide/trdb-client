import axios from "axios";

const API_URL = "https://localhost:7109/film/";
const headers = {
  "Content-Type": "application/json",
};

const GetFilm = async (reqData) => {
  var param = !!reqData.id
    ? "get?ID=" + reqData.id
    : "get?title=" + reqData.title;

  var config = {
    method: "get",
    url: API_URL + param,
    headers: headers,
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

const GetFilmCast = async (reqData) => {
  var config = {
    method: "get",
    url: API_URL + "get/credits/cast?ID=" + reqData.id,
    headers: headers,
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

const GetFilmCrew = async (reqData) => {
  var config = {
    method: "get",
    url: API_URL + "get/credits/crew?ID=" + reqData.id,
    headers: headers,
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

const filmService = {
  GetFilm,
  GetFilmCast,
  GetFilmCrew,
};

export default filmService;
