import React from "react";
import Footer from "../components/Footer";
import profilePic from "../assets/profile_pic.png";

const MyProfile = () => {
  return (
    <>
      <div className="px-6 md:px-10 py-10 max-w-xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">My Profile</h1>

        <div className="flex justify-center mb-6">
          <img
            src={profilePic}
            alt="Profile"
            className="w-32 h-32 rounded-md object-cover border"
          />
        </div>

        <h2 className="text-xl font-semibold text-center mb-4">
          Nurbek Mauletkhan
        </h2>
        <hr className="mb-6 border-gray-300" />

        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">
            Contact Information
          </h3>
          <div className="text-gray-800 space-y-1">
            <p>
              <span className="font-medium">Email id:</span>{" "}
              <a
                href="mailto:Nurbek2004@gmail.com"
                className="text-blue-600 hover:underline"
              >
                Nurbek2004@gmail.com
              </a>
            </p>
            <p>
              <span className="font-medium">Phone:</span> +1 123 456 7890
            </p>
            <p>
              <span className="font-medium">Address:</span> Almaty, Tole bi 59
            </p>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">
            Basic Information
          </h3>
          <div className="text-gray-800 space-y-1">
            <p>
              <span className="font-medium">Gender:</span> Male
            </p>
            <p>
              <span className="font-medium">Birthday:</span> 20 July, 2004
            </p>
          </div>
        </div>

        <div className="flex gap-4 justify-center mt-6">
          <button className="px-6 py-2 border border-blue-500 rounded-full text-blue-600 hover:bg-blue-50 transition">
            Edit
          </button>
          <button className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition">
            Save information
          </button>
        </div>
      </div>
    </>
  );
};

export default MyProfile;
