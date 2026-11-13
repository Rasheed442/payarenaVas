import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateRoute = () => {
  // Check for either mall-token (SSO) or regular token
  const mallToken = localStorage.getItem("mall-token");
  const regularToken = localStorage.getItem("token");
  const isAuthenticated = mallToken || regularToken;
  const { pathname } = useLocation();

  // Users flagged as KYC-unverified must complete verification first.
  // Only enforced when the flag is explicitly "false" so SSO sessions
  // without the flag are not blocked.
  const kycVerified = localStorage.getItem("kycVerified");

  if (!isAuthenticated) {
    return <Navigate to="/login/new" replace />;
  }

  if (kycVerified === "false" && pathname !== "/kyc-verification") {
    return <Navigate to="/kyc-verification" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
