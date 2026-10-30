import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  // Check for either mall-token (SSO) or regular token
  const mallToken = localStorage.getItem("mall-token");
  const regularToken = localStorage.getItem("token");
  const isAuthenticated = mallToken || regularToken;

  return isAuthenticated ? <Outlet /> : <Navigate to="/login/new" replace />;
};

export default PrivateRoute;
