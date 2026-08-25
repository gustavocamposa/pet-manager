import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ isAuthenticated, children }) {
  if (isAuthenticated) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}
