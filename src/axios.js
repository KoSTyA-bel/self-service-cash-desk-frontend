import axios from "axios";

export const getToken = () =>
  localStorage.getItem("jwt") ? localStorage.getItem("jwt") : null;

export const getAuthorizationHeader = () => `Bearer ${getToken()}`;

const instance = axios.create({
  baseURL: "https://localhost:7249/",
  headers: { Authorization: getAuthorizationHeader() },
});

instance.interceptors.response.use(
  (config) => {
    return config;
  },
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem("jwt");
      window.location.href = "/auth";
    }
    if (error.response.status === 500) {
      window.location.href = "/error";
    }

    throw error;
  }
);

export default instance;
