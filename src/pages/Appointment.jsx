import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import { jwtDecode } from "jwt-decode";

const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);
  return (
    <div className="flex text-yellow-400 text-sm">
      {[...Array(fullStars)].map((_, i) => (
        <FaStar key={`f-${i}`} />
      ))}
      {hasHalf && <FaStarHalfAlt />}
      {[...Array(emptyStars)].map((_, i) => (
        <FaRegStar key={`e-${i}`} />
      ))}
    </div>
  );
};

const Appointment = () => {
  const { docId } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [relatedDoctors, setRelatedDoctors] = useState([]);
  const [success, setSuccess] = useState("");
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const doctorRes = await axios.get(
          `https://doctor-service-4au2.onrender.com/api/v1/doctors/${docId}`
        );
        setDoctor(doctorRes.data.data);

        const allDoctors = await axios.get(
          "https://doctor-service-4au2.onrender.com/api/v1/doctors/"
        );
        const others = allDoctors.data.data.filter((d) => d.id !== docId);
        setRelatedDoctors(others.slice(0, 4));
      } catch (err) {
        console.error("Ошибка загрузки врача:", err);
      }
    };

    fetchData();
  }, [docId]);

  const groupedByDate = (doctor?.available_schedules || []).reduce(
    (acc, slot) => {
      const date = slot.slot_start.split("T")[0];
      if (!acc[date]) acc[date] = [];
      acc[date].push(slot);
      return acc;
    },
    {}
  );

  const formatTime = (str) =>
    new Date(str).toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });

  const formatDateLabel = (str) =>
    new Date(str).toLocaleDateString("en-GB", {
      weekday: "short",
      day: "numeric",
    });

  const handleBooking = async () => {
    if (!selectedSlot || !token) return;
    const user = jwtDecode(token);
    const payload = {
      doctor_id: doctor.id,
      user_id: user.userId,
      schedule_id: selectedSlot.schedule_id,
      Status: "active",
    };

    try {
      await axios.post(
        "https://doctor-service-4au2.onrender.com/api/v1/appointments/",
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess("Appointment successfully booked!");
      setSelectedSlot(null);
    } catch (error) {
      console.error("Booking error:", error);
      setSuccess("Failed to book appointment.");
    }
  };

  if (!doctor)
    return <div className="text-center mt-10 text-gray-500">Loading...</div>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      
      <div className="flex flex-col md:flex-row items-start gap-6 bg-white border rounded-xl shadow p-6">
        <div className="w-40 h-40 bg-blue-100 rounded-xl flex items-center justify-center text-gray-400">
          No Image
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            {doctor.name}
            <span className="text-blue-500 text-xl">✔️</span>
          </h1>
          <p className="text-gray-600 text-sm mb-2">
            {doctor.specialization} · {doctor.experience} Years
          </p>
          <StarRating rating={doctor.rating} />
          <p className="text-gray-600 text-sm mt-2">
            Dr. {doctor.name.split(" ").slice(-1)[0]} is a trusted{" "}
            {doctor.specialization.toLowerCase()} with {doctor.experience} years
            of experience.
          </p>
          <p className="mt-4 text-gray-800 font-semibold">
            Appointment fee: ${doctor.price}
          </p>
        </div>
      </div>

      
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">Booking slots</h2>
        {!token ? (
          <p className="text-gray-600">Please log in to book an appointment.</p>
        ) : (
          <>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {Object.keys(groupedByDate).map((date) => (
                <button
                  key={date}
                  onClick={() => setSelectedDate(date)}
                  className={`px-4 py-2 rounded-full border ${
                    selectedDate === date
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-700"
                  }`}
                >
                  {formatDateLabel(date)}
                </button>
              ))}
            </div>

            {selectedDate && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
                {groupedByDate[selectedDate].map((slot) => (
                  <button
                    key={slot.schedule_id}
                    onClick={() => setSelectedSlot(slot)}
                    className={`px-4 py-2 border rounded-full text-sm ${
                      selectedSlot?.schedule_id === slot.schedule_id
                        ? "bg-blue-500 text-white"
                        : "bg-white text-gray-700 hover:border-blue-400"
                    }`}
                  >
                    {formatTime(slot.slot_start)} - {formatTime(slot.slot_end)}
                  </button>
                ))}
              </div>
            )}

            <button
              onClick={handleBooking}
              disabled={!selectedSlot}
              className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 disabled:bg-gray-300 disabled:text-gray-500"
            >
              Book an appointment
            </button>

            {success && (
              <p className="mt-4 text-green-600 font-medium">{success}</p>
            )}
          </>
        )}
      </div>

      
      <div className="mt-16">
        <h2 className="text-xl font-semibold text-center mb-2">
          Related Doctors
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Simply browse through our extensive list of trusted doctors.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {relatedDoctors.map((doc) => (
            <div
              key={doc.id}
              className="bg-blue-50 p-4 rounded-xl text-center hover:shadow-md transition cursor-pointer"
            >
              <div className="w-full h-32 bg-blue-100 mb-3 flex items-center justify-center text-gray-400 rounded-xl">
                No Image
              </div>
              <p className="font-semibold text-gray-800">{doc.name}</p>
              <p className="text-sm text-gray-500">{doc.specialization}</p>
              <p className="text-green-500 text-xs mt-1">● Available</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Appointment;
