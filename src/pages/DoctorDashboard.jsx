// DoctorDashboard.jsx
import React, { useEffect, useState } from "react";
import { FaTimes, FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const StatusBadge = ({ status }) => {
  const statusStyles = {
    active: "bg-blue-100 text-blue-800",
    canceled: "bg-red-100 text-red-800",
    completed: "bg-green-100 text-green-800"
  };

  const statusText = {
    active: "Active",
    canceled: "Canceled",
    completed: "Completed"
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusStyles[status]}`}>
      {statusText[status]}
    </span>
  );
};

const AppointmentType = ({ isOnline }) => {
  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
      isOnline ? 'bg-purple-100 text-purple-800' : 'bg-indigo-100 text-indigo-800'
    }`}>
      {isOnline ? 'Online' : 'Offline'}
    </span>
  );
};

const ActionButton = ({ icon: Icon, label, onClick, disabled, variant }) => {
  const baseStyles = "flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all duration-200";
  const variantStyles = {
    complete: "bg-green-100 text-green-700 hover:bg-green-200",
    cancel: "bg-red-100 text-red-700 hover:bg-red-200"
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      title={label}
    >
      <Icon size={16} />
      {label}
    </button>
  );
};

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const doctorName = localStorage.getItem("doctorName") || "Doctor";
  const [appointments, setAppointments] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(null);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const appointmentsResponse = await axios.get(
        "https://doctor-service-4au2.onrender.com/api/v1/appointments/"
      );

      const appointmentsWithSchedule = await Promise.all(
        appointmentsResponse.data.data.map(async (appointment) => {
          const scheduleResponse = await axios.get(
            `https://doctor-service-4au2.onrender.com/api/v1/schedules/${appointment.schedule_id}`
          );
          return {
            ...appointment,
            schedule: scheduleResponse.data.data,
          };
        })
      );

      setAppointments(appointmentsWithSchedule);
      setError(null);
    } catch (err) {
      console.error("Error fetching appointments:", err);
      setError("Failed to load appointments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleCancel = async (appointmentId) => {
    try {
      setActionLoading(appointmentId);
      await axios.get(`https://doctor-service-4au2.onrender.com/api/v1/appointments/cancel/${appointmentId}`);
      await fetchAppointments();
    } catch (err) {
      console.error("Error cancelling appointment:", err);
      setError("Failed to cancel appointment");
    } finally {
      setActionLoading(null);
    }
  };

  const handleComplete = async (appointmentId) => {
    try {
      setActionLoading(appointmentId);
      await axios.get(`https://doctor-service-4au2.onrender.com/api/v1/appointments/complete/${appointmentId}`);
      await fetchAppointments();
    } catch (err) {
      console.error("Error completing appointment:", err);
      setError("Failed to complete appointment");
    } finally {
      setActionLoading(null);
    }
  };

  const filteredAppointments = appointments.filter((appt) => {
    if (activeTab === "online") return appt.meeting_url !== null;
    if (activeTab === "offline") return appt.meeting_url === null;
    return true;
  }).sort((a, b) => {
    // Sort by date (newest first)
    return new Date(b.schedule.slot_start) - new Date(a.schedule.slot_start);
  });

  const handleLogout = () => {
    localStorage.removeItem("doctorId");
    localStorage.removeItem("doctorName");
    navigate("/login");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
        <div className="text-xl font-bold text-[#4C5FF7]">Shipager <span className="ml-2 px-2 py-1 text-xs bg-gray-100 border rounded-full">Doctor</span></div>
        <button
          onClick={handleLogout}
          className="text-sm text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded shadow"
        >
          Logout
        </button>
      </header>

      <div className="flex flex-1">
        <aside className="w-60 bg-white shadow-md p-6">
          <nav className="space-y-4 text-gray-700">
            <button onClick={() => setActiveTab("all")} className={`block w-full text-left ${activeTab === "all" ? "font-semibold" : ""}`}>All Appointments</button>
            <button onClick={() => setActiveTab("online")} className={`block w-full text-left ${activeTab === "online" ? "font-semibold" : ""}`}>Online Consultations</button>
            <button onClick={() => setActiveTab("offline")} className={`block w-full text-left ${activeTab === "offline" ? "font-semibold" : ""}`}>Appointment with a doctor</button>
          </nav>
        </aside>

        <main className="flex-1 bg-gray-50 p-8">
          <h1 className="text-2xl font-bold mb-6">Welcome, {doctorName}</h1>

          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="p-4 border-b font-semibold text-lg">
              {activeTab === "all" && "All Appointments"}
              {activeTab === "online" && "Online Consultations"}
              {activeTab === "offline" && "Appointments with a Doctor"}
            </div>

            {loading && (
              <div className="p-8 text-center text-gray-500">
                Loading appointments...
              </div>
            )}

            {error && (
              <div className="p-8 text-center text-red-500">
                {error}
              </div>
            )}

            {!loading && !error && (
              <div className="divide-y">
                {filteredAppointments.map((appointment) => (
                  <div key={appointment.id} className="p-6 hover:bg-gray-50">
                    <div className="flex justify-between items-start">
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <p className="font-medium">Patient ID: {appointment.user_id}</p>
                          <StatusBadge status={appointment.status} />
                          <AppointmentType isOnline={appointment.meeting_url !== null} />
                        </div>
                        <p className="text-sm text-gray-500">
                          {new Date(appointment.schedule.slot_start).toLocaleString()}
                        </p>
                        {appointment.meeting_url && appointment.status === 'active' && (
                          <a
                            href={appointment.meeting_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block text-blue-500 hover:text-blue-600 text-sm font-medium"
                          >
                            Join Meeting →
                          </a>
                        )}
                      </div>

                      {appointment.status === 'active' && (
                        <div className="flex items-center gap-2">
                          <ActionButton
                            icon={FaCheck}
                            label="Complete"
                            onClick={() => handleComplete(appointment.id)}
                            disabled={actionLoading === appointment.id}
                            variant="complete"
                          />
                          <ActionButton
                            icon={FaTimes}
                            label="Cancel"
                            onClick={() => handleCancel(appointment.id)}
                            disabled={actionLoading === appointment.id}
                            variant="cancel"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {filteredAppointments.length === 0 && (
                  <div className="p-8 text-center text-gray-500">
                    No appointments found
                  </div>
                )}
              </div>
            )}
          </div>
        </main>
      </div>

      <footer className="bg-white text-center text-sm text-gray-500 py-4 border-t">
        © 2025 Shipager. All rights reserved.
      </footer>
    </div>
  );
};

export default DoctorDashboard;
