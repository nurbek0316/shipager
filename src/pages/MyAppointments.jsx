import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "../context/AuthContext";
import { doctorProfiles } from "../assets/doctor-profiles";

const MyAppointments = () => {
  const { token } = useContext(AuthContext);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [appointmentToCancel, setAppointmentToCancel] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        if (!token) return;
        const userId = jwtDecode(token).userId;

        const res = await axios.get(
          `https://doctor-service-4au2.onrender.com/api/v1/appointments/user/${userId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        console.log('Appointments response:', res.data);
        const appointments = res.data.data || [];
        
        const formattedAppointments = appointments
          .filter(appt => appt.status !== "canceled")
          .map(appt => ({
            ...appt,
            meeting_url: appt.meeting_url || null
          }));

        setAppointments(formattedAppointments);
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
        prev.filter((appt) => appt.id !== appointmentToCancel)
      );

      setModalOpen(false);
      setAppointmentToCancel(null);
    } catch (error) {
      console.error("Error cancelling appointment:", error);
    }
  };

  const formatTime = (timeStr) =>
    new Date(timeStr).toLocaleTimeString("en-KZ", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "UTC",
    });

  const filteredAppointments = appointments.filter(appt => 
    statusFilter === "all" ? true : appt.status === statusFilter
  );

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
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">My Appointments</h2>
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600">Filter by status:</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {filteredAppointments.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500 mb-2">No appointments found.</p>
          {statusFilter !== "all" && (
            <button
              onClick={() => setStatusFilter("all")}
              className="text-indigo-600 hover:text-indigo-700 text-sm"
            >
              Show all appointments
            </button>
          )}
        </div>
      ) : (
        <div className="grid gap-6">
          {filteredAppointments.map((appt) => (
            <div
              key={appt.id}
              className="bg-white p-5 rounded-xl shadow border hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <div className="w-28 h-28 rounded-xl bg-blue-100 flex items-center justify-center overflow-hidden">
                  {appt.doctor_gender ? (
                    <img 
                      src={doctorProfiles[appt.doctor_gender]} 
                      alt={`${appt.doctor_gender} doctor`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-sm text-gray-400">No Image</span>
                  )}
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
                        appt.status === "completed"
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
                    {appt.meeting_url && (
                      <a
                        href={appt.meeting_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-600 text-white text-sm px-4 py-2 rounded-md hover:bg-blue-700 text-center"
                      >
                        Join Meeting
                      </a>
                    )}
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
              </div>
            </div>
          ))}
        </div>
      )}

      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div 
            className="fixed inset-0" 
            onClick={() => setModalOpen(false)}
          ></div>
          <div className="bg-white rounded-xl shadow-xl p-6 w-80 animate-fade-in z-50 border border-gray-200">
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
