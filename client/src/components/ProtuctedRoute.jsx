import React from "react";
import { useAuth } from "../context/AuthProvider";
import { Navigate } from "react-router-dom";

function ProtuctedRoute({ element: Component }) {
  const { isAdmin } = useAuth();
  return isAdmin ? <Component /> : <Navigate to="/" />;
}

export default ProtuctedRoute;
