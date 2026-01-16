import React from "react";
import { Navigate, Outlet } from "react-router-dom";

/**
 * A wrapper component for routes that require authentication.
 * If the user is not authenticated (no token), it redirects to the login page.
 */
const ProtectedRoute = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    // Redirect to login if there is no token
    return <Navigate to="/Login" replace />;
  }

  // If token exists, render the child routes
  return <Outlet />;
};

export default ProtectedRoute;
