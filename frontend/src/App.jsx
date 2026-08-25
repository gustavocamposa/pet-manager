import { useEffect, useState } from "react";

import { Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";

import Login from "./pages/Login/Login.jsx";
import Pets from "./pages/Pets/Pets.jsx";
import Register from "./pages/Register/Register.jsx";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login");
  }

  function handleLoginSuccess() {
    setIsAuthenticated(true);
  }

  return (
    <div className="app">
      <h1 className="app-title">Pet Application</h1>

      <nav>
        <Link to="/">Home Page</Link> | <Link to="/login">Login</Link> |{" "}
        <Link to="/register">Register</Link>
      </nav>

      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Pets onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/login"
          element={<Login onLoginSuccess={handleLoginSuccess} />}
        />

        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
