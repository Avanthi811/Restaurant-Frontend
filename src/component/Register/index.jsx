// src/pages/Register.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import './index.css'

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    if (!form.name || !form.email || !form.password) return "All fields are required.";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) return "Enter a valid email.";
    if (form.password.length < 6) return "Password must be at least 6 characters.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const validationErr = validate();
    if (validationErr) return setError(validationErr);

    try {
      setLoading(true);
      const res = await fetch("https://restaurant-backend-nkkg.onrender.com/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const result = await res.json();
      console.log(result)
      if (!res.ok) {
        // show backend message if present
        setError(result.message || result.message || "Registration failed");
        setLoading(false);
        return;
      }

      // success -> navigate to login
      navigate("/login");
    } catch (err) {
      console.error("Register fetch error:", err);
      setError("Network error - try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <form onSubmit={handleSubmit} className="register-form">
        <h2>Register</h2>
        {error && <p className="error">{error}</p>}
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} />
        <button type="submit" disabled={loading}>{loading ? "Registering..." : "Register"}</button>
        <h2 className="login-text">
          Already have an account? <Link to="/login" className="login-link">Login</Link>
        </h2>
      </form>
    </div>
  );
};

export default Register;
