import React from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

const PrivateRoute = () => {
  return localStorage.getItem("token") ? <Outlet /> : <Navigate to="/login/new" replace />;
};

export default PrivateRoute;
