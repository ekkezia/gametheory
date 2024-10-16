import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_API_URL || "http://localhost:5000", // Set your base URL
});

export default axiosInstance;
