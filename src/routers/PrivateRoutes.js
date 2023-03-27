import React from "react";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";

export const PrivateRoutes = ({ children }) => {
  const isToken = localStorage.getItem("token");

  if (!isToken) {
    toast.error("No tienes permisos para acceder a esta ruta");
    return <Navigate to="/" />;
  }

  return children;
};
