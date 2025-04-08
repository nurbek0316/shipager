import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "../context/AuthContext";

const MyAppointments = () => {
  const { token } = useContext(AuthContext);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [appointmentToCancel, setAppointmentToCancel] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        if (!token) return;
        const userId = jwtDecode(token).userId;

        const res = await axios.get(
          `https://doctor-service-4au2.onrender.com/api/v1/appointments/user/${userId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setAppointments(res.data.data || []);
      } catch (error) {
        console.error("Error fetching appointments:", error);
        setAppointments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [token]);

  const confirmCancel = (id) => {
    setAppointmentToCancel(id);
    setModalOpen(true);
  };

  const cancelAppointment = async () => {
    try {
      await axios.get(
        `https://doctor-service-4au2.onrender.com/api/v1/appointments/cancel/${appointmentToCancel}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setAppointments((prev) =>
        prev.map((appt) =>
          appt.id === appointmentToCancel
            ? { ...appt, status: "canceled" }
            : appt
        )
      );

      setModalOpen(false);
      setAppointmentToCancel(null);
    } catch (error) {
      console.error("Error cancelling appointment:", error);
    }
  };

  const handlePayment = async (appt) => {
    try {
      const user = jwtDecode(token);
      const doctorRes = await axios.get(
        `https://doctor-service-4au2.onrender.com/api/v1/doctors/${appt.doctor_id}`
      );

      const doctor = doctorRes.data.data;
      const amount = doctor.price;
      const paymentPayload = {
        phone: "+77011234567",
        amount: amount.toString(),
        description: `Appointment with ${doctor.name}`,
        accountId: user.userId,
        email: "demo@shipager.kz",
        backLink: "https://shipager.kz/payment-success",
      };

      const paymentRes = await axios.post(
        "https://authorization-service-4b7m.onrender.com/auth/createPayment",
        paymentPayload
      );

      const paymentId = paymentRes.data.data;
      window.location.href = `https://authorization-service-4b7m.onrender.com/auth/pay?id=${paymentId}`;
    } catch (error) {
      console.error("💳 Payment error:", error);
    }
  };

  const formatTime = (timeStr) =>
    new Date(timeStr).toLocaleTimeString("en-KZ", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "UTC",
    });

  // const doctorPriceToNumber = (priceStr) => {
  //   if (!priceStr) return "150.00";
  //   const num = Number(priceStr.toString().replace(/[^\d.]/g, ""));
  //   return num ? num.toFixed(2) : "150.00";
  // };

  if (!token) {
    return (
      <p className="text-center text-gray-600 mt-10">
        Please log in to see your appointments.
      </p>
    );
  }

  if (loading) {
    return (
      <p className="text-center text-gray-500 mt-10">Loading appointments...</p>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">My Appointments</h2>

      {appointments.length === 0 ? (
        <p className="text-gray-500">No appointments found.</p>
      ) : (
        <div className="grid gap-6">
          {appointments.map((appt) => (
            <div
              key={appt.id}
              className={`bg-white p-5 rounded-xl shadow border ${
                appt.status === "canceled" ? "opacity-60" : ""
              }`}
            >
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <div className="w-28 h-28 rounded-xl bg-blue-100 flex items-center justify-center text-gray-400 text-sm">
                  No Image
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {appt.doctor_name || "Unknown"}
                  </h3>
                  <p className="text-sm text-gray-500">{appt.specialization}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Phone: {appt.doctor_phone || "N/A"}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Date & Time: {formatTime(appt.slot_start)} -{" "}
                    {formatTime(appt.slot_end)}
                  </p>
                  <p className="text-sm mt-1">
                    <span className="font-semibold">Status:</span>{" "}
                    <span
                      className={`capitalize ${
                        appt.status === "canceled"
                          ? "text-red-500"
                          : appt.status === "completed"
                          ? "text-green-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {appt.status}
                    </span>
                  </p>
                </div>

                {appt.status === "active" && (
                  <div className="flex flex-col items-end gap-2 w-full sm:w-auto">
                    <button
                      onClick={() => handlePayment(appt)}
                      className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                    >
                      Pay
                    </button>
                    <button
                      onClick={() => confirmCancel(appt.id)}
                      className="border border-red-300 text-red-600 text-sm px-4 py-2 rounded-md hover:bg-red-50"
                    >
                      Cancel Appointment
                    </button>
                  </div>
                )}

                {appt.status === "completed" && (
                  <div className="text-green-600 font-semibold">✔ Paid</div>
                )}
                {appt.status === "canceled" && (
                  <div className="text-red-400 text-sm">✖ Canceled</div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 transition-all duration-300">
          <div className="bg-white rounded-xl shadow-xl p-6 w-80 animate-fade-in">
            <h2 className="text-lg font-bold mb-4 text-center text-gray-800">
              Cancel Appointment?
            </h2>
            <p className="text-gray-600 text-sm mb-6 text-center">
              Are you sure you want to cancel this appointment?
            </p>
            <div className="flex justify-between">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 rounded-md border text-gray-600 hover:bg-gray-100"
              >
                No, go back
              </button>
              <button
                onClick={cancelAppointment}
                className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600"
              >
                Yes, cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAppointments;
