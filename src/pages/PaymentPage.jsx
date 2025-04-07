import React, { useState } from "react";
import axios from "axios";

const SubscriptionPaymentForm = () => {
  const [formData, setFormData] = useState({
    iin: "",
    phone: "+7",
    name: "",
    email: "",
    amount: "1500.00",
    description: "Оплата годовой подписки",
    accountId: `user-${Math.floor(Math.random() * 10000)}`, 
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);

  const validateForm = () => {
    const newErrors = {};

    if (!/^\d{12}$/.test(formData.iin)) {
      newErrors.iin = "ИИН должен содержать 12 цифр";
    }

    if (!/^\+7\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Введите номер в формате +7XXXXXXXXXX";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Введите корректный email";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setPaymentStatus(null);

    try {
      const response = await axios.post(
        "https://authorization-service-4b7m.onrender.com/auth/createPayment",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Вариант 1: Если API возвращает URL для перенаправления
      if (response.data.paymentUrl) {
        window.location.href = response.data.paymentUrl;
        return;
      }

      
      setPaymentStatus("success");
      console.log("Платеж создан:", response.data);
    } catch (error) {
      console.error("Ошибка платежа:", error);
      setPaymentStatus("error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    
    if (name === "phone" && !value.startsWith("+7")) {
      setFormData({
        ...formData,
        [name]: "+7" + value.replace(/[^\d]/g, "").slice(0, 10),
      });
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Оформление подписки
      </h2>

      {paymentStatus === "success" ? (
        <div className="p-4 mb-4 text-green-700 bg-green-100 rounded">
          Платеж успешно создан! Проверьте ваш email для дальнейших инструкций.
        </div>
      ) : paymentStatus === "error" ? (
        <div className="p-4 mb-4 text-red-700 bg-red-100 rounded">
          Ошибка при создании платежа. Пожалуйста, попробуйте позже.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ФИО
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ИИН
            </label>
            <input
              type="text"
              name="iin"
              value={formData.iin}
              onChange={handleChange}
              maxLength="12"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.iin ? "border-red-500" : ""
              }`}
              required
            />
            {errors.iin && (
              <p className="mt-1 text-sm text-red-600">{errors.iin}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Телефон
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.phone ? "border-red-500" : ""
              }`}
              required
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.email ? "border-red-500" : ""
              }`}
              required
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                isLoading ? "opacity-75 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? "Обработка..." : "Оплатить 1500 ₸"}
            </button>
          </div>

          <p className="text-xs text-gray-500 mt-4">
            Нажимая кнопку, вы соглашаетесь с условиями подписки
          </p>
        </form>
      )}
    </div>
  );
};

export default SubscriptionPaymentForm;
