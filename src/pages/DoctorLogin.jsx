import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const DoctorLogin = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const mockDoctor = {
      email: "yerassylrymkul@gmail.com",
      password: "123",
      name: "Doc",
      id: "doc-001",
    };

    if (form.email === mockDoctor.email && form.password === mockDoctor.password) {
      localStorage.setItem("doctorId", mockDoctor.id);
      localStorage.setItem("doctorName", mockDoctor.name);
      navigate("/doctor-dashboard");
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Doctor Login</h2>

        <input
          type="text"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full border px-4 py-3 rounded mb-4"
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full border px-4 py-3 rounded mb-4"
        />

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
        >
          Login as Doctor
        </button>
      </div>
    </div>
  );
};

export default DoctorLogin;
