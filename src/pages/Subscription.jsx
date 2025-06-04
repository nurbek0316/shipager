// src/pages/Subscription.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HeartPulse, Users, Crown } from "lucide-react";
import appointmentImage from "../assets/appointment_img.png";

const plans = [
  {
    name: "Basic",
    icon: <HeartPulse className="h-8 w-8 text-white" />,
    periods: {
      "1 month": 9000,
      "3 month": 25650,
      "6 month": 48600,
      "12 month": 86400,
    },
    description:
      "Basic – for rare requests.\n" +
      "• 2 online consultations/month\n" +
      "• 1 app doctor visit/month\n" +
      "• Access to prescriptions\n" +
      "• 5% test discount\n" +
      "• Live chat support",
  },
  {
    name: "Standard",
    icon: <Users className="h-8 w-8 text-white" />,
    periods: {
      "1 month": 12000,
      "3 month": 34200,
      "6 month": 64800,
      "12 month": 115200,
    },
    description:
      "Standard – for families and frequent use.\n" +
      "• 10 online consultations\n" +
      "• 3 doctor visits/month\n" +
      "• Quick response\n" +
      "• Medical diary\n" +
      "• 10% test discount",
  },
  {
    name: "Premium",
    icon: <Crown className="h-8 w-8 text-white" />,
    periods: {
      "1 month": 18000,
      "3 month": 51300,
      "6 month": 97200,
      "12 month": 172800,
    },
    description:
      "Premium – maximum comfort.\n" +
      "• Unlimited 24/7 access\n" +
      "• Personal manager\n" +
      "• Urgent visits\n" +
      "• Yearly check-up\n" +
      "• 20% test discount",
  },
];

const Subscription = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState("1 month");
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
    setSelectedPeriod("1 month");
    setTotalPrice(plan.periods["1 month"]);
  };

  const handleSelectPeriod = (event) => {
    const newPeriod = event.target.value;
    setSelectedPeriod(newPeriod);
    if (selectedPlan) {
      setTotalPrice(selectedPlan.periods[newPeriod]);
    }
  };

  const handleProceedToPayment = () => {
    if (!selectedPlan || !totalPrice) return;
    navigate("/payment", {
      state: {
        planName: selectedPlan.name,
        totalPrice,
      },
    });
  };

  return (
    <div className="flex flex-col">
      {/* ---------- Hero Section (возвращаем исходный текст, убираем аватары и контур) ---------- */}
      <section className="bg-[#4C5FF7] rounded-2xl overflow-hidden mt-8 mx-4 lg:mx-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 items-center px-6 lg:px-12 py-16 gap-8">
          {/* Левый блок с текстом */}
          <div className="space-y-6 text-center lg:text-left">
            <h1 className="text-5xl lg:text-6xl font-extrabold text-white">
              Personal medical care by subscription
            </h1>
            <p className="text-lg lg:text-xl text-white/90 max-w-md mx-auto lg:mx-0">
              Basic, Standard and Premium — choose the level that suits you and
              your family.
            </p>
            <button
              onClick={() =>
                document
                  .getElementById("subscription-cards")
                  .scrollIntoView({ behavior: "smooth" })
              }
              className="mt-6 inline-flex items-center bg-white text-[#4C5FF7] font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition"
            >
              Choose a subscription
              <svg
                className="ml-2 w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                ></path>
              </svg>
            </button>
          </div>
          {/* Правый блок с одиночным изображением доктора, без дополнительного контейнера и теней */}
          <div className="flex justify-center lg:justify-end">
            <img
              src={appointmentImage}
              alt="Doctor pointing"
              className="w-full max-w-md h-auto object-cover rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* ---------- Subscription Cards ---------- */}
      <section
        id="subscription-cards"
        className="bg-gray-50 py-16 px-4 mt-12 lg:px-12"
      >
        <div className="max-w-7xl mx-auto text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800">
            Choose the perfect subscription plan
          </h2>
          <p className="text-gray-600 mt-2">
            The longer the period, the better the price. Save up to{" "}
            <span className="text-[#4C5FF7] font-semibold">20%</span> when
            paying annually!
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid gap-10 md:grid-cols-3">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`relative bg-white rounded-2xl p-8 shadow-xl transition-transform transform hover:shadow-2xl hover:scale-105 ${
                selectedPlan?.name === plan.name ? "ring-2 ring-[#4C5FF7]" : ""
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-semibold text-gray-800">
                  {plan.name}
                </h3>
                {plan.icon}
              </div>
              <p className="text-3xl font-extrabold text-[#4C5FF7] mb-6">
                {plan.periods["1 month"]} ₸ / month
              </p>
              <ul className="text-sm text-left text-gray-700 whitespace-pre-line mb-6 space-y-1">
                {plan.description}
              </ul>
              <div className="space-y-2 text-sm text-gray-600 mb-6">
                {Object.entries(plan.periods).map(([periodKey, price]) => (
                  <div className="flex justify-between" key={periodKey}>
                    <span>{periodKey}</span>
                    <span>{price} ₸</span>
                  </div>
                ))}
              </div>
              <button
                onClick={() => handleSelectPlan(plan)}
                className={`w-full ${
                  selectedPlan?.name === plan.name
                    ? "bg-white text-[#4C5FF7] border-2 border-[#4C5FF7]"
                    : "bg-[#4C5FF7] hover:bg-[#3b4bcc] text-white"
                } py-3 rounded-full font-semibold transition`}
              >
                {selectedPlan?.name === plan.name
                  ? "Selected"
                  : `Choose ${plan.name}`}
              </button>
              {selectedPlan?.name === plan.name && (
                <div className="mt-4 text-left">
                  <label
                    htmlFor="period"
                    className="text-sm text-gray-600 block mb-1"
                  >
                    Choose a period:
                  </label>
                  <select
                    id="period"
                    value={selectedPeriod}
                    onChange={handleSelectPeriod}
                    className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#4C5FF7]"
                  >
                    {Object.keys(plan.periods).map((periodKey) => (
                      <option key={periodKey} value={periodKey}>
                        {periodKey}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          ))}
        </div>

        {selectedPlan && (
          <div className="mt-12 max-w-md mx-auto text-center">
            <p className="text-lg font-semibold text-gray-800">
              Selected Plan:{" "}
              <span className="text-[#4C5FF7]">{selectedPlan.name}</span> —{" "}
              <span className="text-green-600">{totalPrice} ₸</span>
            </p>
            <button
              onClick={handleProceedToPayment}
              className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-full font-semibold transition"
            >
              Proceed to Payment
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default Subscription;
