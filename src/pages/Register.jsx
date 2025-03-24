import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const Register = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [form, setForm] = useState({ login: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleRegister = async () => {
    try {
      const res = await axios.post("https://authorization-service-4b7m.onrender.com/auth/sign-up", form);
      login(res.data.token);
      navigate("/");
    } catch (err) {
      setError("Registration failed. Try different login/email.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md border">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Register</h2>
        <p className="text-sm text-gray-500 mb-6">Create an account to book appointments</p>

        <input
          type="text"
          placeholder="Login"
          value={form.login}
          onChange={(e) => setForm({ ...form, login: e.target.value })}
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <button
          onClick={handleRegister}
          className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 rounded transition"
        >
          Register
        </button>

        <p className="text-sm text-center mt-4 text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 font-medium hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
