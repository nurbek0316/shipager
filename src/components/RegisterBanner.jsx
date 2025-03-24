import React from "react";
import { useNavigate } from "react-router-dom";
import appointmentImg from "../assets/appointment_img.png";

const RegisterBanner = () => {
  const navigate = useNavigate();

  return (
    <div className="relative mt-20">
      {/* Синий блок */}
      <div className="bg-indigo-500 rounded-xl px-6 md:px-10 lg:px-20 py-10 md:py-14 flex flex-col md:flex-row items-center justify-between relative z-10 overflow-hidden">
        {/* Текст слева */}
        <div className="flex-1 text-white">
          <h2 className="text-3xl md:text-4xl font-bold leading-snug mb-4">
            Book Appointment <br /> With 100+ Trusted Doctors
          </h2>
          <p className="text-sm font-light mb-6">
            Create your account in seconds and get access to top doctors. <br className="hidden md:block" />
            Schedule appointments anytime, anywhere.
          </p>
          <button
            onClick={() => navigate("/register")}
            className="bg-white text-indigo-500 font-medium px-6 py-3 rounded-full hover:bg-gray-100 transition"
          >
            Create account
          </button>
        </div>
      </div>

      <div className="absolute -top-10 right-0 md:right-6 lg:right-12 z-20 w-[180px] sm:w-[230px] md:w-[260px] lg:w-[300px]">
        <img src={appointmentImg} alt="Doctor" className="object-contain" />
      </div>
    </div>
  );
};

export default RegisterBanner;
