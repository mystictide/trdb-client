import axios from "axios";
import Cookies from "universal-cookie";

const API_URL = "https://localhost:7109/main/";
const headers = {
  "Content-Type": "application/json",
};

const setExpirationDate = function (days) {
  var date = new Date(Date.now());
  date.setDate(date.getDate() + days);
  return date;
};

const GetWeekly = async () => {
  var config = {
    method: "get",
    url: API_URL + "get/weekly",
    headers: headers,
  };

  var data = await axios(config)
    .then(function (response) {
      localStorage.setItem("weekly", JSON.stringify(response.data));
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });

  return data;
};

const GetPopularMovies = async () => {
  var config = {
    method: "get",
    url: API_URL + "get/popular",
    headers: headers,
  };

  var data = await axios(config)
    .then(function (response) {
      const cookies = new Cookies();
      cookies.set("popular", JSON.stringify(response.data), {
        path: "/",
        expires: setExpirationDate(1),
      });
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });

  return data;
};

const GetTopMovies = async () => {
  var config = {
    method: "get",
    url: API_URL + "get/top",
    headers: headers,
  };

  var data = await axios(config)
    .then(function (response) {
      const cookies = new Cookies();
      cookies.set("top", JSON.stringify(response.data), {
        path: "/",
        expires: setExpirationDate(1),
      });
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });

  return data;
};

const mainService = {
  GetWeekly,
  GetPopularMovies,
  GetTopMovies,
};

export default mainService;
