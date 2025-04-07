import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const Register = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({ login: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleRegister = async () => {
    if (!form.login || !form.email || !form.password) {
      setError("All fields are required");
      return;
    }

    try {
      const res = await axios.post(
        "https://authorization-service-4b7m.onrender.com/auth/sign-up",
        {
          login: form.login,
          email: form.email,
          password: form.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const token = res.data.token;

      if (token) {
        login(token);
        navigate("/");
        window.location.reload();
      } else {
        setError("No token received from server.");
      }
    } catch (err) {
      console.error("Registration error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Register</h2>

        <input
          type="text"
          placeholder="Username"
          value={form.login}
          onChange={(e) => setForm({ ...form, login: e.target.value })}
          className="input mb-3"
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="input mb-3"
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="input mb-3"
        />

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <button onClick={handleRegister} className="btn-primary w-full">
          Register
        </button>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
