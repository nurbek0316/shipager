import React from "react";
import { Link } from "react-router-dom";

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
            <li>
              <Link to="/" className="hover:text-indigo-600 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link to="/clinic-appointment" className="hover:text-indigo-600 transition-colors">
                Clinic appointment
              </Link>
            </li>
            <li>
              <Link to="/analyzes" className="hover:text-indigo-600 transition-colors">
                Analyzes
              </Link>
            </li>
            <li>
              <Link to="/subscription" className="hover:text-indigo-600 transition-colors">
                Subscription
              </Link>
            </li>
            <li>
              <Link to="/health-monitoring" className="hover:text-indigo-600 transition-colors">
                Health monitoring
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-black font-semibold mb-4">GET IN TOUCH</h3>
          <div className="flex gap-4 mb-2">
            <a
              href="https://vk.com"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform hover:scale-110"
            >
              <img src="/src/assets/vk.svg" alt="VK" className="w-6 h-6" />
            </a>
            <a
              href="https://t.me"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform hover:scale-110"
            >
              <img src="/src/assets/tg.svg" alt="Telegram" className="w-6 h-6" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform hover:scale-110"
            >
              <img src="/src/assets/yt.svg" alt="YouTube" className="w-6 h-6" />
            </a>
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
