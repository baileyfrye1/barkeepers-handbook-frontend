import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://api.barkeepershandbook.com/v1/",
  withCredentials: true,
});

export default axiosClient;
