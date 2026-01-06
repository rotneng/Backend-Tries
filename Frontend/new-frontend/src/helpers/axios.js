import axios from "axios";

const api =
  window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "https://scarlett-marque.onrender.com";

const axiosInstance = axios.create({
  baseURL: api,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem("token");
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
