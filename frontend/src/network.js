const axios = require("axios").default;

const BASE_URL = "http://localhost:8000";

const axiosInstance = () => {
  let config = { baseURL: BASE_URL };
  const token = localStorage.getItem("token");

  if (token)
    config = { ...config, headers: { Authorization: `Token ${token}` } };
  console.log(config);

  return axios.create(config);
};

export default axiosInstance;
