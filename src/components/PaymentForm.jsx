import React, { useState } from "react";
import axios from "axios";

const PaymentForm = () => {
  const [form, setForm] = useState({
    iin: "",
    phone: "",
    amount: "1500.00",
    description: "Оплата консультации врача",
    accountId: "acc-54321",
    name: "Иван Иванов",
    email: "ivan@example.com",
    backLink: "https://shipager.kz/payment-success",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePayment = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "https://authorization-service-4b7m.onrender.com/auth/createPayment",
        form,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        const paymentId = response.data.data;
        window.location.href = `https://authorization-service-4b7m.onrender.com/auth/pay?id=${paymentId}`; // Редирект на страницу оплаты
      } else {
        setError("Ошибка при создании платежа.");
      }
    } catch (err) {
      console.error("Ошибка при отправке запроса:", err);
      setError("Не удалось создать платёж.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded-xl shadow-lg mt-10">
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
        Оформление оплаты
      </h2>

      <div className="space-y-6">
        <div>
          <label
            htmlFor="iin"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            ИИН
          </label>
          <input
            id="iin"
            type="text"
            placeholder="Введите ваш ИИН"
            value={form.iin}
            onChange={(e) => setForm({ ...form, iin: e.target.value })}
            className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Телефон
          </label>
          <input
            id="phone"
            type="text"
            placeholder="Введите ваш телефон"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Введите ваш email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <div>
          <button
            onClick={handlePayment}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md transition duration-300"
          >
            {loading ? "Создание платежа..." : "Оплатить"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
