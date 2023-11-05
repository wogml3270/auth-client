import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/authContext";

const ProtectedRoute = ({ membershipRequired }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  if (membershipRequired && user.membership.name !== membershipRequired) {
    return <Navigate to="/membership" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
