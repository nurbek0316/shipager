import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [form, setForm] = useState({ login: "", password: "" });
  const [error, setError] = useState("");

  const handleLogin = async () => {
    const res = await axios.post("https://authorization-service-4b7m.onrender.com/auth/sign-in", {
      login: form.login,
      password: form.password,
    });
    login(res.data.token);
    navigate("/");
  };
  

  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md border">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Login</h2>
        <p className="text-sm text-gray-500 mb-6">Please login to book appointment</p>

        <input
          type="text"
          placeholder="Email"
          value={form.login}
          onChange={(e) => setForm({ ...form, login: e.target.value })}
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
          onClick={handleLogin}
          className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 rounded transition"
        >
          Login
        </button>

        <p className="text-sm text-center mt-4 text-gray-600">
          Don't have an account?{" "}
          <Link to="/register" className="text-indigo-600 font-medium hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
