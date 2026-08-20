import { useState } from "react";
import { registerUser } from "../../services/userService";

export default function Register({ onBackToLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function validate() {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = "Please enter your name.";
    }

    if (!email.trim()) {
      newErrors.email = "Please enter your email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email.";
    }

    if (!password) {
      newErrors.password = "Please enter a password.";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleRegister(event) {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const data = await registerUser({
        name: name.trim(),
        email: email.trim(),
        password,
      });

      console.log(data);

      setSuccess("User registered successfully!");

      setName("");
      setEmail("");
      setPassword("");
      setErrors({});
    } catch (error) {
      console.error(error);
      setError(
        error.message === "Failed to fetch"
          ? "Could not connect to the server. Please try again."
          : error.message,
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="register-page">
      <form className="register-form" onSubmit={handleRegister} noValidate>
        <h2 className="section-title">Register</h2>

        <div className="field">
          <input
            type="text"
            className={`input ${errors.name ? "input-error" : ""}`}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            disabled={isSubmitting}
          />
          {errors.name && <span className="field-error">{errors.name}</span>}
        </div>

        <div className="field">
          <input
            type="email"
            className={`input ${errors.email ? "input-error" : ""}`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            disabled={isSubmitting}
          />
          {errors.email && <span className="field-error">{errors.email}</span>}
        </div>

        <div className="field">
          <input
            type="password"
            className={`input ${errors.password ? "input-error" : ""}`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            disabled={isSubmitting}
          />
          {errors.password && (
            <span className="field-error">{errors.password}</span>
          )}
        </div>

        {error && <p className="form-error">{error}</p>}
        {success && <p className="form-success">{success}</p>}

        <div className="register-actions">
          <button
            type="button"
            className="btn btn-outline"
            onClick={onBackToLogin}
            disabled={isSubmitting}
          >
            Back to login
          </button>
          <button className="btn btn-primary" disabled={isSubmitting}>
            {isSubmitting ? "Registering..." : "Register"}
          </button>
        </div>
      </form>
    </div>
  );
}