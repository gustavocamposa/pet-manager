import { Navigate } from "react-router-dom";

export default function GuestRoute({ isAuthenticated, children }) {
  if (isAuthenticated) {
    return <Navigate to="/" />;
  } else {
    return children;
  }
}
