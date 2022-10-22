import axios from "axios";

const API_URL = "https://localhost:7109/main/";
const headers = {
  "Content-Type": "application/json",
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

const authService = {
  GetWeekly,
};

export default authService;
