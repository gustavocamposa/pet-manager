import { useEffect, useState } from "react";

import { Routes, Route, Link, useNavigate } from "react-router-dom";

import Login from "./pages/Login/Login.jsx";
import Pets from "./pages/Pets/Pets.jsx";
import Register from "./pages/Register/Register.jsx";

import ProtectedRoute from "./components/ProtectedRoute.jsx";
import GuestRoute from "./components/GuestRoute.jsx";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  function handleLoginSuccess() {
    setIsAuthenticated(true);
  }

  function handleLogout() {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login");
  }

  return (
    <div className="app">
      <h1 className="app-title">Pet Application</h1>

      <nav className="nav">
        <Link to="/">Home Page</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </nav>

      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Pets onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/login"
          element={
            <GuestRoute isAuthenticated={isAuthenticated}>
              <Login onLoginSuccess={handleLoginSuccess} />
            </GuestRoute>
          }
        />

        <Route
          path="/register"
          element={
            <GuestRoute isAuthenticated={isAuthenticated}>
              <Register />
            </GuestRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
