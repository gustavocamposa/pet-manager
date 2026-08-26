import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
  isAuthenticated: boolean;
  children: ReactNode;
};

export default function ProtectedRoute({
  isAuthenticated,
  children,
}: ProtectedRouteProps) {
  if (isAuthenticated) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}