const axios = require("axios").default;

const config = {
  baseURL: "http://localhost:8000",
  // timeout: 1000,
  // withCredentials: true,
};

const request = axios.create(config);

export default request;
