import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { SubmitEvent } from "react";

const LOGIN_URL = "http://localhost:3000/login";

type LoginProps = {
  onLoginSuccess: () => void;
};

type LoginErrors = {
  email?: string;
  password?: string;
};

type LoginResponse = {
  message: string;
  token: string;
};

type LoginError = {
  error: string;
};

export default function Login({ onLoginSuccess }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<LoginErrors>({});
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  function validate() {
    const newErrors: LoginErrors = {};

    if (!email.trim()) {
      newErrors.email = "Please enter your email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email.";
    }

    if (!password) {
      newErrors.password = "Please enter your password.";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  async function handleLogin(event: SubmitEvent) {
    event.preventDefault();

    setFormError("");

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(LOGIN_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data: LoginResponse | LoginError =
        await response.json().catch(() => null);

      if (!response.ok) {
        const errorMessage =
          "error" in data ? data.error : "Invalid email or password.";

        throw new Error(errorMessage);
      }

      if ("token" in data) {
        localStorage.setItem("token", data.token);
      }

      onLoginSuccess();
      navigate("/");
    } catch (error) {
      if (error instanceof Error) {
        setFormError(
          error.message === "Failed to fetch"
            ? "Could not connect to the server. Please try again."
            : error.message,
        );
      } else {
        setFormError("Could not connect to the server. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleLogin} noValidate>
        <div className="field">
          <input
            type="text"
            className={`input ${errors.email ? "input-error" : ""}`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Type your email..."
            disabled={isSubmitting}
          />

          {errors.email && (
            <span className="field-error">{errors.email}</span>
          )}
        </div>

        <div className="field">
          <input
            type="password"
            className={`input ${errors.password ? "input-error" : ""}`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Type your password..."
            disabled={isSubmitting}
          />

          {errors.password && (
            <span className="field-error">{errors.password}</span>
          )}
        </div>

        {formError && <p className="form-error">{formError}</p>}

        <button className="btn btn-primary" disabled={isSubmitting}>
          {isSubmitting ? "Signing in..." : "Enter"}
        </button>

        <button
          type="button"
          className="btn btn-outline"
          onClick={() => navigate("/register")}
        >
          Create account
        </button>
      </form>
    </div>
  );
}