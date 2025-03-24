import React, { useContext, useEffect, useRef, useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const NavBar = () => {
  const navigate = useNavigate();
  const { token, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400 relative">
      <img
        onClick={() => navigate("/")}
        className="w-44 cursor-pointer"
        src={assets.logo}
        alt="Logo"
      />

      {/* Навигационные ссылки */}
      <ul className="hidden md:flex items-start gap-5 font-medium">
        {[
          { name: "HOME", to: "/" },
          { name: "ALL DOCTORS", to: "/doctors" },
          { name: "ABOUT", to: "/about" },
          { name: "CONTACT", to: "/contact" },
        ].map((item, index) => (
          <NavLink
            key={index}
            to={item.to}
            className={({ isActive }) =>
              `relative py-1 transition duration-300 ease-in-out 
         ${
           isActive ? "text-indigo-600" : "text-gray-800 hover:text-indigo-500"
         }`
            }
          >
            {item.name}
            {/* Линия снизу */}
            <span
              className={`absolute left-0 -bottom-1 h-[2px] w-full transition-all duration-300 ${
                window.location.pathname === item.to
                  ? "bg-indigo-500 scale-x-100"
                  : "bg-indigo-500 scale-x-0"
              } origin-left`}
            ></span>
          </NavLink>
        ))}
      </ul>

      {/* Аватар или кнопка Login */}
      <div className="flex items-center gap-4 relative">
        {token ? (
          <div className="relative" ref={menuRef}>
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setIsOpen((prev) => !prev)}
            >
              <img
                className="w-8 h-8 rounded-full"
                src={assets.profile_pic}
                alt="Profile"
              />
              <img
                className="w-2.5"
                src={assets.dropdown_icon}
                alt="Dropdown"
              />
            </div>

            {/* Выпадающее меню */}
            {isOpen && (
              <div className="absolute top-full right-0 mt-3 w-44 bg-stone-100 rounded-lg shadow-lg text-gray-700 text-sm flex flex-col gap-2 p-4 z-50">
                <p
                  onClick={() => {
                    navigate("/my-profile");
                    setIsOpen(false);
                  }}
                  className="hover:text-black cursor-pointer"
                >
                  My Profile
                </p>
                <p
                  onClick={() => {
                    navigate("/my-appointments");
                    setIsOpen(false);
                  }}
                  className="hover:text-black cursor-pointer"
                >
                  My Appointments
                </p>
                <p
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                    navigate("/login");
                  }}
                  className="hover:text-black cursor-pointer"
                >
                  Logout
                </p>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-indigo-500 text-white px-8 py-3 rounded-full cursor-pointer font-light hidden md:block"
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default NavBar;
