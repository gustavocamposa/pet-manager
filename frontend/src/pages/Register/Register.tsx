import { useState } from "react";
import type { SubmitEvent } from "react";
import { registerUser } from "../../services/userService";
import { useNavigate } from "react-router-dom";

type RegisterErrors = {
  name?: string;
  email?: string;
  password?: string;
  phone?: string;
  address?: string;
};

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [errors, setErrors] = useState<RegisterErrors>({});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function validate() {
    const newErrors: RegisterErrors = {};

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

    if (!phone.trim()) {
      newErrors.phone = "Please enter your phone number.";
    } else if (!/^\d{8,15}$/.test(phone.trim())) {
      newErrors.phone =
        "Phone must contain only digits (8 to 15 numbers).";
    }

    if (!address.trim()) {
      newErrors.address = "Please enter your address.";
    } else if (/^\d+$/.test(address.trim())) {
      newErrors.address =
        "Please enter a valid address (not just numbers).";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  async function handleRegister(event: SubmitEvent) {
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
        phone: phone.trim(),
        address: address.trim(),
      });

      console.log(data);

      setSuccess("User registered successfully!");

      setName("");
      setEmail("");
      setPassword("");
      setPhone("");
      setAddress("");
      setErrors({});
    } catch (error) {
      console.error(error);

      if (error instanceof Error) {
        setError(
          error.message === "Failed to fetch"
            ? "Could not connect to the server. Please try again."
            : error.message,
        );
      } else {
        setError("Could not connect to the server. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="register-page">
      <form
        className="register-form"
        onSubmit={handleRegister}
        noValidate
      >
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

          {errors.name && (
            <span className="field-error">{errors.name}</span>
          )}
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

          {errors.email && (
            <span className="field-error">{errors.email}</span>
          )}
        </div>

        <div className="field">
          <input
            type="password"
            className={`input ${
              errors.password ? "input-error" : ""
            }`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            disabled={isSubmitting}
          />

          {errors.password && (
            <span className="field-error">{errors.password}</span>
          )}
        </div>

        <div className="field">
          <input
            type="tel"
            className={`input ${errors.phone ? "input-error" : ""}`}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone"
            disabled={isSubmitting}
          />

          {errors.phone && (
            <span className="field-error">{errors.phone}</span>
          )}
        </div>

        <div className="field">
          <input
            type="text"
            className={`input ${
              errors.address ? "input-error" : ""
            }`}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Address"
            disabled={isSubmitting}
          />

          {errors.address && (
            <span className="field-error">{errors.address}</span>
          )}
        </div>

        {error && <p className="form-error">{error}</p>}

        {success && <p className="form-success">{success}</p>}

        <div className="register-actions">
          <button
            type="button"
            className="btn btn-outline"
            onClick={() => navigate("/login")}
            disabled={isSubmitting}
          >
            Back to login
          </button>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Registering..." : "Register"}
          </button>
        </div>
      </form>
    </div>
  );
}