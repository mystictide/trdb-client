import axios from "axios";

const API_URL = "https://localhost:7109/users/";
const headers = {
  "Content-Type": "application/json",
};

const SetPersonalSettings = async (reqData) => {
  var config = {
    method: "post",
    url: API_URL + "settings",
    headers: headers,
    data: reqData,
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

const settingsService = {
    SetPersonalSettings,
};

export default settingsService;
