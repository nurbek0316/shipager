import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ login: "", password: "" });
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "https://authorization-service-4b7m.onrender.com/auth/sign-in",
        {
          login: form.login,
          password: form.password,
        }
      );

      const token = res.data.accessToken;

      if (token) {
        login(token);
        navigate("/");
        window.location.reload();
      } else {
        setError("No token received from server.");
      }
    } catch (err) {
      console.error(err);
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <input
          type="text"
          placeholder="Login or Email"
          value={form.login}
          onChange={(e) => setForm({ ...form, login: e.target.value })}
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
        <button onClick={handleLogin} className="btn-primary w-full">
          Login
        </button>

        <p className="text-sm text-center mt-4">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-600 underline">
            Register here
          </Link>
        </p>

        {/* ✅ Добавлена ссылка для входа как доктор */}
        <p className="text-sm text-center mt-3">
          Are you a doctor?{" "}
          <Link to="/doctor-login" className="text-blue-600 underline">
            Login as Doctor
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
