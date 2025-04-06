import axios from 'axios';

const axiosClient = axios.create({
  baseURL:
    'https://barkeepers-handbook-bbhadna0b5b9a2d8.eastus2-01.azurewebsites.net/api/v1/',
  withCredentials: true,
});

export default axiosClient;
