import React, { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../utils/context/auth";

type Props = {
  children?: ReactElement | null;
};

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children || null;
};

export default ProtectedRoute;
