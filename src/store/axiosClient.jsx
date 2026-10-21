import axios from "axios";

export const client = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});
const token = localStorage.getItem("token");

client.interceptors.request.use((config) => {
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

client.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (401 === error?.response?.status) {
      window.location = "/";
      localStorage.clear();
    } else if (
      "Request failed with status code 500" === error.message ||
      error?.response?.status >= 500
    ) {
      return Promise.reject({
        ...error,
        message: "It's not you, it's us. Try again later.",
      });
    } else {
      return Promise.reject(error);
    }
  }
);
