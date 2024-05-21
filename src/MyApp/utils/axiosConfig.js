import axios from "axios";

const apiUrl = process.env.PUBLIC_API_URL;

const axiosInstance = axios.create({
  baseURL: apiUrl,
});

export default axiosInstance;
