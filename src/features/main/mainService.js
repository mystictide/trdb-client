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
      const cookies = new Cookies();
      cookies.set("weekly", JSON.stringify(response.data), {
        path: "/",
        expires: setExpirationDate(2),
      });

      return response.data;
    })
    .catch(function (error) {
      return { data: error.response.data, status: error.response.status };
    });

  return data;
};

const GetPopularFilms = async () => {
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
      return { data: error.response.data, status: error.response.status };
    });

  return data;
};

const GetTopFilms = async () => {
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
      return { data: error.response.data, status: error.response.status };
    });

  return data;
};

const Browse = async (reqData) => {
  let page;
  if (reqData.page > 1) {
    page = reqData.page;
  } else {
    page = 1;
  }
  var config = {
    method: "get",
    url: API_URL + "browse/?Keyword=" + reqData.keyword + "&page=" + page,
    headers: {
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

const SearchFilms = async (reqData) => {
  var config = {
    method: "get",
    url: API_URL + "search/film?Keyword=" + reqData.keyword,
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

const SearchActors = async (reqData) => {
  var config = {
    method: "get",
    url: API_URL + "search/actor?Keyword=" + reqData.keyword,
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

const SearchDirectors = async (reqData) => {
  var config = {
    method: "get",
    url: API_URL + "search/director?Keyword=" + reqData.keyword,
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

const mainService = {
  GetWeekly,
  GetPopularFilms,
  GetTopFilms,
  Browse,
  SearchFilms,
  SearchActors,
  SearchDirectors,
};

export default mainService;
