import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'https://localhost:7261/api/v1/',
  withCredentials: true,
});

export default axiosClient;
