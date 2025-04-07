import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "../context/AuthContext";

const MyAppointments = () => {
  const { token } = useContext(AuthContext);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        if (!token) return;
        const decoded = jwtDecode(token);
        const userId = decoded.userId;

        const res = await axios.get(
          `https://doctor-service-4au2.onrender.com/api/v1/appointments/user/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setAppointments(res.data.data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [token]);

  const updateStatus = async (appointmentId, newStatus) => {
    try {
      
      setAppointments((prev) =>
        prev.map((appt) =>
          appt.id === appointmentId ? { ...appt, status: newStatus } : appt
        )
      );
  
      // пока что фейк койп койдм 
      console.log(`Фейково обновлён статус ${appointmentId} на ${newStatus}`);
    } catch (error) {
      console.error(`Ошибка при фейковом обновлении статуса:`, error);
    }
  };
  

  if (!token) {
    return (
      <div className="text-center text-gray-600 mt-10">
        Please log in to see your appointments.
      </div>
    );
  }

  if (loading) {
    return (
      <div className="text-center text-gray-500 mt-10">
        Loading appointments...
      </div>
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
                    Dr. {appt.doctor_name || "Unknown"}
                  </h3>
                  <p className="text-sm text-gray-500">{appt.specialization}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Phone: {appt.doctor_phone || "N/A"}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Date & Time:{" "}
                    {new Date(appt.slot_start).toLocaleString("en-US", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
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
                      onClick={() => updateStatus(appt.id, "completed")}
                      className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                    >
                      Mark as Paid
                    </button>
                    <button
                      onClick={() => updateStatus(appt.id, "canceled")}
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
    </div>
  );
};

export default MyAppointments;
