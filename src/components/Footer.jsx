import React from "react";

const Footer = () => {
  return (
    <footer className="mt-20 pt-12 border-t border-gray-200 text-sm text-gray-600">
      <div className="flex flex-col sm:flex-row justify-between gap-10 sm:gap-20">
        <div className="max-w-sm">
          <div className="flex items-center gap-2 mb-4">
            <img
              src="src\assets\main.svg"
              alt="Shipager Logo"
              className="w-8 h-8"
            />
            <span className="text-indigo-600 font-semibold text-lg">
              Shipager
            </span>
          </div>
          <p>
            Shipager is your reliable health care assistant. Our app makes it
            easy to make an appointment with a doctor, arrange a home visit,
            track your health and receive results in one place.
          </p>
        </div>

        <div>
          <h3 className="text-black font-semibold mb-4">COMPANY</h3>
          <ul className="flex flex-col gap-2">
            <li>Home</li>
            <li>Clinic appointment</li>
            <li>Analyzes</li>
            <li>Subscription</li>
            <li>Health monitoring</li>
          </ul>
        </div>

        <div>
          <h3 className="text-black font-semibold mb-4">GET IN TOUCH</h3>
          <div className="flex gap-4 mb-2">
            <img src="/vk.svg" alt="VK" className="w-5 h-5" />
            <img src="/tg.svg" alt="Telegram" className="w-5 h-5" />
            <img src="/yt.svg" alt="YouTube" className="w-5 h-5" />
          </div>
          <p>shipager@gmail.com</p>
        </div>
      </div>

      <p className="text-center mt-10 text-gray-400 text-xs">
        © {new Date().getFullYear()} Shipager. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
