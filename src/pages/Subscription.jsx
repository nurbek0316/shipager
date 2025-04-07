import React from "react";
import { useNavigate } from "react-router-dom";

const plans = [
  {
    name: "Basic",
    price: "3 000 ₸",
    periods: {
      "3 month": "~8 550 ₸ (-5%)",
      "6 month": "~16 200 ₸ (-10%)",
      "12 month": "~28 800 ₸ (-20%)",
    },
    description:
      "Suitable for basic needs and online consultations. Savings on annual payments of up to 20%.",
  },
  {
    name: "Standard",
    price: "6 000 ₸",
    periods: {
      "3 month": "~17 100 ₸ (-5%)",
      "6 month": "~32 400 ₸ (-10%)",
      "12 month": "~57 600 ₸ (-20%)",
    },
    description:
      "Optimal for families and regular medical support. The benefit is up to 8,400 ₸ per year.",
  },
  {
    name: "Premium",
    price: "10 000 ₸",
    periods: {
      "3 month": "~28 500 ₸ (-5%)",
      "6 month": "~54 000 ₸ (-10%)",
      "12 month": "~96 000 ₸ (-20%)",
    },
    description:
      "Maximum features and services, including offline reception. Ideal for high-net-worth clients.",
  },
];

const Subscription = () => {
  const navigate = useNavigate();

  const handleSubscribe = (plan) => {
    navigate("/payment", { state: { plan } });
  };

  return (
    <>
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
                  {plan.price}
                </p>
                <div className="text-sm text-gray-600 space-y-2 mb-6">
                  {Object.entries(plan.periods).map(([period, price]) => (
                    <p key={period} className="flex justify-between">
                      <span>{period}</span>
                      <span>{price}</span>
                    </p>
                  ))}
                </div>
                <p className="text-gray-700 text-sm mb-6">{plan.description}</p>
                <button
                  onClick={() => handleSubscribe(plan)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-full transition duration-300"
                >
                  Choose {plan.name}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Subscription;
