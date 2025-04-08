import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const plans = [
  {
    name: "Basic",
    periods: {
      "1 month": 3000,
      "3 month": 8500,
      "6 month": 16200,
      "12 month": 28800,
    },
    description: "Suitable for basic needs and online consultations.",
  },
  {
    name: "Standard",
    periods: {
      "1 month": 6000,
      "3 month": 17100,
      "6 month": 32400,
      "12 month": 57600,
    },
    description: "Optimal for families and regular medical support.",
  },
  {
    name: "Premium",
    periods: {
      "1 month": 10000,
      "3 month": 28500,
      "6 month": 54000,
      "12 month": 96000,
    },
    description: "Maximum features and services, including offline reception.",
  },
];

const Subscription = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState("1 month");
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
    setTotalPrice(plan.periods[selectedPeriod]);
  };

  const handleSelectPeriod = (event) => {
    setSelectedPeriod(event.target.value);
    if (selectedPlan) {
      setTotalPrice(selectedPlan.periods[event.target.value]);
    }
  };

  const handleProceedToPayment = () => {
    navigate("/payment", { state: { plan: selectedPlan, totalPrice } });
  };

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-semibold text-center text-blue-700 mb-6">
          Choose the perfect subscription plan
        </h1>
        <p className="text-center text-gray-600 mb-10">
          The longer the period, the better the price. Save up to 20% when
          paying annually!
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className="bg-white border rounded-xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              <h2 className="text-xl font-bold text-blue-700 mb-4">
                {plan.name}
              </h2>
              <p className="text-2xl font-semibold text-gray-800 mb-4">
                {plan.periods["1 month"]} ₸
              </p>

              <div className="text-sm text-gray-600 space-y-2 mb-6">
                {Object.entries(plan.periods).map(([period, price]) => (
                  <p key={period} className="flex justify-between">
                    <span>{period}</span>
                    <span>{price} ₸</span>
                  </p>
                ))}
              </div>

              <button
                onClick={() => handleSelectPlan(plan)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-full mt-4"
              >
                {selectedPlan === plan ? "Hide Details" : "Choose " + plan.name}
              </button>

              {selectedPlan === plan && (
                <div className="mt-4">
                  <label htmlFor="period" className="text-sm text-gray-600">
                    Choose a period:
                  </label>
                  <select
                    id="period"
                    value={selectedPeriod}
                    onChange={handleSelectPeriod}
                    className="w-full border px-4 py-2 mt-2 rounded"
                  >
                    {Object.keys(plan.periods).map((period) => (
                      <option key={period} value={period}>
                        {period}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          ))}
        </div>

        {selectedPlan && (
          <div className="mt-6">
            <p className="text-lg font-semibold text-gray-800">
              Total: {totalPrice} ₸
            </p>
            <button
              onClick={handleProceedToPayment}
              className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-full transition duration-300"
            >
              Proceed to Payment
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Subscription;
