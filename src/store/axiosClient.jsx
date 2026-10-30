import axios from "axios";

export const client = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

client.interceptors.request.use((config) => {
  // Check for mall-token first (SSO token), then fall back to regular token
  const mallToken = localStorage.getItem("mall-token");
  const regularToken = localStorage.getItem("token");
  const token = mallToken || regularToken;

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
      // Clear all auth-related localStorage items
      localStorage.removeItem("mall-token");
      localStorage.removeItem("mallUserInfo");
      localStorage.removeItem("token");
      // Redirect to login page
      window.location = "/login/new";
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
