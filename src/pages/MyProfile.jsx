import React, { useEffect, useState } from "react";
import axios from "axios";
import { assets } from "../assets/assets";

const MyProfile = () => {
  const [user, setUser] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    birthDate: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userRes = await axios.get(
          "https://authorization-service-4b7m.onrender.com/auth/getUser?login=dirrrplom123@gmail.com"
        );
        const userData = userRes.data;
        setUser(userData);
        setForm({
          name: userData.Name || "",
          email: userData.Email || "",
          phone: userData.Phone || "",
          gender: userData.Gender || "",
          birthDate: userData.BirthDate ? userData.BirthDate.slice(0, 10) : "",
        });

        const subRes = await axios.get(
          `https://authorization-service-4b7m.onrender.com/auth/getSub?id=acc-54321`
        );
        setSubscription(subRes.data);
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
      }
    };

    fetchUser();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    console.log("Данные для сохранения:", form);
    setEditMode(false);
  };

  const getFormattedSubscription = () => {
    if (!subscription || !subscription.Name) return "No active subscription";
    const words = subscription.Name.trim().split(" ");
    const lastWord = words[words.length - 1];
    return `Active — Your subscription ${lastWord}`;
  };

  if (!user)
    return (
      <div className="text-center mt-10 text-gray-500 animate-pulse">
        Loading...
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto mt-12 bg-white shadow-2xl rounded-3xl px-10 py-12 border border-indigo-200">
      <div className="flex items-center gap-6 mb-10">
        <img
          src={assets.profile_pic}
          alt="Profile"
          className="w-28 h-28 object-cover rounded-2xl border-4 border-indigo-300 shadow-lg"
        />
        <div>
          <h2 className="text-4xl font-extrabold text-indigo-800">
            {form.name}
          </h2>
          <p className="text-sm text-indigo-500 mt-1">
            Personal Profile Overview
          </p>
        </div>
      </div>

      <div className="space-y-6 text-[15px]">
        <div>
          <label className="block text-indigo-600 mb-1 font-semibold">
            Email
          </label>
          {editMode ? (
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-indigo-300 rounded-xl shadow focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          ) : (
            <p className="text-gray-800">{form.email}</p>
          )}
        </div>

        <div>
          <label className="block text-indigo-600 mb-1 font-semibold">
            Phone
          </label>
          {editMode ? (
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-indigo-300 rounded-xl shadow focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          ) : (
            <p className="text-gray-800">{form.phone || "-"}</p>
          )}
        </div>

        <div>
          <label className="block text-indigo-600 mb-1 font-semibold">
            Gender
          </label>
          {editMode ? (
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-indigo-300 rounded-xl shadow focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          ) : (
            <p className="text-gray-800">{form.gender || "-"}</p>
          )}
        </div>

        <div>
          <label className="block text-indigo-600 mb-1 font-semibold">
            Birthday
          </label>
          {editMode ? (
            <input
              type="date"
              name="birthDate"
              value={form.birthDate}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-indigo-300 rounded-xl shadow focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          ) : (
            <p className="text-gray-800">{form.birthDate || "-"}</p>
          )}
        </div>

        <div className="pt-4">
          <label className="block text-indigo-600 mb-1 font-semibold">
            Your Subscription
          </label>
          <p
            className={`text-lg font-bold ${
              subscription ? "text-green-600" : "text-red-500"
            }`}
          >
            {getFormattedSubscription()}
          </p>
        </div>
      </div>

      <div className="flex gap-4 mt-10 justify-end">
        {!editMode ? (
          <button
            onClick={() => setEditMode(true)}
            className="px-6 py-2 bg-indigo-500 text-white font-semibold rounded-xl shadow hover:bg-indigo-600 transition"
          >
            Edit
          </button>
        ) : (
          <>
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-green-500 text-white font-semibold rounded-xl shadow hover:bg-green-600 transition"
            >
              Save
            </button>
            <button
              onClick={() => setEditMode(false)}
              className="px-6 py-2 bg-gray-200 text-gray-800 font-semibold rounded-xl shadow hover:bg-gray-300 transition"
            >
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
