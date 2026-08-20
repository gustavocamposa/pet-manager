import { useEffect, useState } from "react";

import Login from "./pages/Login/Login.jsx";
import Pets from "./pages/Pets/Pets.jsx";
import Register from "./pages/Register/Register.jsx";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
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
  }

  function handleBackToLogin() {
    setShowRegister(false);
  }
  return (
    <div className="app">
      <h1 className="app-title">Pet Application</h1>
      {isAuthenticated ? (
        <Pets onLogout={handleLogout} />
      ) : showRegister ? (
        <Register onBackToLogin={handleBackToLogin} />
      ) : (
        <Login
          onLoginSuccess={handleLoginSuccess}
          onRegister={() => setShowRegister(true)}
        />
      )}
    </div>
  );
}

export default App;
