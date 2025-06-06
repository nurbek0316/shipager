import React, { useState, useContext } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { jwtDecode } from "jwt-decode";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const { planName, totalPrice, appointmentData } = location.state || {};

  const [form, setForm] = useState({
    iin: "",
    phone: "",
    email: "",
    name: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const createMeetingAndUpdateAppointment = async () => {
    try {
      // Create meeting
      const meetResponse = await axios.post(
        "https://doctor-service-4au2.onrender.com/api/v1/meets/create",
        {
          user_email: form.email,
          doctor_email: appointmentData.doctorEmail,
          start_time: appointmentData.startTime,
          end_time: appointmentData.endTime
        }
      );

      if (meetResponse.data.success && meetResponse.data.data.meet_link) {
        // Update appointment with meeting URL
        await axios.put(
          `https://doctor-service-4au2.onrender.com/api/v1/appointments/${appointmentData.appointmentId}/meeting-url`,
          {
            meeting_url: meetResponse.data.data.meet_link
          }
        );
      }
    } catch (error) {
      console.error("Error in meeting creation or appointment update:", error);
    }
  };

  const handlePayment = async () => {
    if (!form.iin || !form.phone || !form.email || !form.name) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "https://authorization-service-4b7m.onrender.com/auth/createPayment",
        {
          iin: form.iin,
          phone: form.phone,
          amount: totalPrice.toString(),
          description: `Payment for ${planName}`,
          accountId: "acc-54321",
          name: form.name,
          email: form.email,
          backLink: "https://shipager.kz/payment-success",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        const paymentId = response.data.data;
        
        // If this is an appointment payment, create meeting and update appointment
        if (appointmentData) {
          await createMeetingAndUpdateAppointment();
        }

        setSuccessMessage("Payment created successfully!");
        setTimeout(() => {
          window.location.href = `https://authorization-service-4b7m.onrender.com/auth/pay?id=${paymentId}`;
        }, 1500);
      } else {
        setError("Error creating payment.");
      }
    } catch (err) {
      setError("Failed to create payment.");
      console.error("Payment error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-white rounded-xl shadow-xl mt-10">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
        Payment for {planName}
      </h2>

      <div className="space-y-6">
        <div>
          <label
            htmlFor="iin"
            className="block text-sm font-medium text-gray-600"
          >
            IIN
          </label>
          <input
            type="text"
            id="iin"
            value={form.iin}
            onChange={(e) => setForm({ ...form, iin: e.target.value })}
            className="w-full border px-4 py-3 rounded-lg mt-2 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter IIN"
          />
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-600"
          >
            Phone
          </label>
          <input
            type="text"
            id="phone"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full border px-4 py-3 rounded-lg mt-2 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter phone number"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-600"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full border px-4 py-3 rounded-lg mt-2 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter email"
          />
        </div>

        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-600"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full border px-4 py-3 rounded-lg mt-2 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your name"
          />
        </div>
      </div>

      {error && <p className="text-red-600 text-sm mt-3">{error}</p>}
      {successMessage && (
        <p className="text-green-600 text-sm mt-3">{successMessage}</p>
      )}

      <div className="mt-4">
        <p className="text-lg font-semibold text-gray-800">
          Amount: {totalPrice} ₸
        </p>
      </div>

      <button
        onClick={handlePayment}
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg mt-6 transition duration-300"
      >
        {loading ? "Creating payment..." : "Pay"}
      </button>
    </div>
  );
};

export default PaymentPage;
