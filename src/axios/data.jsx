// const axios = require("axios");
import axios from "axios";
export const useLogin = (data) => {
  axios
    .post(`${process.env.REACT_APP_BASE_URL}account/login`, data)
    .then(function (response) {})
    .catch(function (err) {});
};

// utils/auth.js
export const isLoggedIn = () => {
  return !!localStorage.getItem("token");
};

export const getUser = () => {
  const user = localStorage.getItem("userDetails");
  return user ? JSON.parse(user) : null;
};