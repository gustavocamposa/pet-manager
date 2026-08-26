import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

type GuestRouteProps = {
  isAuthenticated: boolean;
  children: ReactNode;
}

export default function GuestRoute({
  isAuthenticated,
  children,
}: GuestRouteProps) {
  if(isAuthenticated) {
    return <Navigate to="/" />;
  } else {
    return children;
  }
}
