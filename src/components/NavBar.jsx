import React, { useContext, useEffect, useRef, useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const NavBar = () => {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { to: "/", label: "HOME" },
    { to: "/doctors", label: "ALL DOCTORS" },
    { to: "/about", label: "ABOUT" },
    { to: "/contact", label: "CONTACT" },
    { to: "/subscription", label: "SUBSCRIPTION" },
  ];

  const profileMenuItems = [
    { to: "/my-profile", label: "My Profile" },
    { to: "/my-cards", label: "My Cards" },
    { to: "/analyzes", label: "My Analyzes" },
    { to: "/health-monitoring", label: "Health Monitoring" },
    { to: "/my-appointments", label: "My Appointments" },
  ];

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-gray-300 relative">
      <img
        onClick={() => navigate("/")}
        className="w-44 cursor-pointer"
        src={assets.logo}
        alt="Logo"
      />

      <ul className="hidden md:flex items-start gap-6 font-medium">
        {navLinks.map(({ to, label }) => (
          <NavLink key={to} to={to}>
            {({ isActive }) => (
              <li
                className={`py-1 border-b-2 transition-all duration-300 ${
                  isActive
                    ? "border-indigo-500 text-indigo-600"
                    : "border-transparent hover:border-indigo-500 hover:text-indigo-600"
                }`}
              >
                {label}
              </li>
            )}
          </NavLink>
        ))}
      </ul>

      <div className="flex items-center gap-4 relative">
        {token ? (
          <div ref={menuRef} className="relative">
            <div
              onClick={() => setIsOpen((prev) => !prev)}
              className="flex items-center gap-2 cursor-pointer"
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

            {isOpen && (
              <div className="absolute top-full right-0 mt-3 w-44 bg-stone-100 rounded-lg shadow-lg text-gray-700 text-sm flex flex-col gap-2 p-4 z-50">
                {profileMenuItems.map(({ to, label }) => (
                  <p
                    key={to}
                    onClick={() => {
                      navigate(to);
                      setIsOpen(false);
                    }}
                    className="cursor-pointer hover:text-black"
                  >
                    {label}
                  </p>
                ))}
                <div className="h-px bg-gray-200 my-1"></div>
                <p
                  onClick={() => {
                    logout();
                    navigate("/login");
                  }}
                  className="cursor-pointer hover:text-black text-red-600 hover:text-red-700"
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
