import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ login: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleRegister = async () => {
    try {
      const res = await axios.post("https://authorization-service-4b7m.onrender.com/auth/sign-up", form);
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err) {
      setError("Registration failed. Check your inputs.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded-xl shadow bg-white">
      <h2 className="text-2xl font-bold mb-4">Create Account</h2>
      <input
        type="text"
        placeholder="Login"
        value={form.login}
        onChange={(e) => setForm({ ...form, login: e.target.value })}
        className="w-full mb-3 p-2 border rounded"
      />
      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className="w-full mb-3 p-2 border rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        className="w-full mb-3 p-2 border rounded"
      />
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
      <button
        onClick={handleRegister}
        className="w-full bg-indigo-500 text-white py-2 rounded hover:bg-indigo-600"
      >
        Register
      </button>
      <p className="text-sm mt-4">
        Already have an account? <Link to="/login" className="text-indigo-500 hover:underline">Login here</Link>
      </p>
    </div>
  );
};

export default Register;