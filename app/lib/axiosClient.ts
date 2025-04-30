import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'https://barkeepers-handbook-api.fly.dev/api/v1/',
  withCredentials: true,
});

export default axiosClient;
