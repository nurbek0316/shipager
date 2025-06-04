import React, { useContext, useMemo, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { doctorProfiles } from "../assets/doctor-profiles";

const Doctors = () => {
  const { doctors, loading, error } = useContext(AppContext);
  const navigate = useNavigate();

  const [selectedSpecs, setSelectedSpecs] = useState([]);
  const [selectedVisitType, setSelectedVisitType] = useState("all"); // "all", "online", "offline"
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  const specializations = useMemo(() => {
    const unique = new Set(doctors.map((doc) => doc.specialization));
    return Array.from(unique);
  }, [doctors]);

  const toggleSpec = (spec) => {
    setSelectedSpecs((prev) =>
      prev.includes(spec) ? prev.filter((s) => s !== spec) : [...prev, spec]
    );
  };

  const filteredDoctors = useMemo(() => {
    let result = [...doctors];

    // Filter by specialization
    if (selectedSpecs.length > 0) {
      result = result.filter((doc) =>
        selectedSpecs.includes(doc.specialization)
      );
    }

    // Filter by visit type
    if (selectedVisitType !== "all") {
      result = result.filter((doc) => 
        doc.visit_type === selectedVisitType || doc.visit_type === "both"
      );
    }

    // Sort if sortField is specified
    if (sortField) {
      result.sort((a, b) => {
        const aVal = parseFloat(a[sortField]);
        const bVal = parseFloat(b[sortField]);
        return sortOrder === "asc" ? aVal - bVal : bVal - aVal;
      });
    }

    return result;
  }, [doctors, selectedSpecs, selectedVisitType, sortField, sortOrder]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">Loading doctors...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-red-500">Error loading doctors: {error}</p>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-6">Find Your Doctor</h1>
        
        {/* Filters Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Visit Type Filter */}
            <div>
              <h2 className="text-lg font-semibold mb-3">Visit Type</h2>
              <div className="flex gap-4">
                <button
                  onClick={() => setSelectedVisitType("all")}
                  className={`px-4 py-2 rounded-full ${
                    selectedVisitType === "all"
                      ? "bg-indigo-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setSelectedVisitType("online")}
                  className={`px-4 py-2 rounded-full ${
                    selectedVisitType === "online"
                      ? "bg-indigo-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Online
                </button>
                <button
                  onClick={() => setSelectedVisitType("offline")}
                  className={`px-4 py-2 rounded-full ${
                    selectedVisitType === "offline"
                      ? "bg-indigo-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Offline
                </button>
              </div>
            </div>

            {/* Sort Controls */}
            <div>
              <h2 className="text-lg font-semibold mb-3">Sort by</h2>
              <div className="flex gap-4">
                <select
                  className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 border-0 focus:ring-2 focus:ring-indigo-500"
                  value={sortField || ""}
                  onChange={(e) => setSortField(e.target.value || null)}
                >
                  <option value="">None</option>
                  <option value="price">Price</option>
                  <option value="rating">Rating</option>
                </select>
                <select
                  className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 border-0 focus:ring-2 focus:ring-indigo-500"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                >
                  <option value="asc">Low to High ↑</option>
                  <option value="desc">High to Low ↓</option>
                </select>
              </div>
            </div>

            {/* Specialization Filter */}
            <div className="lg:col-span-3">
              <h2 className="text-lg font-semibold mb-3">Specialization</h2>
              <div className="flex flex-wrap gap-2">
                {specializations.map((spec) => (
                  <button
                    key={spec}
                    onClick={() => toggleSpec(spec)}
                    className={`px-4 py-2 rounded-full ${
                      selectedSpecs.includes(spec)
                        ? "bg-indigo-500 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {spec}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredDoctors.map((doctor) => (
          <div
            key={doctor.id}
            onClick={() => navigate(`/appoinment/${doctor.id}`)}
            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform hover:scale-105"
          >
            <div className="aspect-w-4 aspect-h-3 bg-gray-100">
              {doctor.gender ? (
                <img
                  src={doctorProfiles[doctor.gender]}
                  alt={`${doctor.gender} doctor`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  No Image
                </div>
              )}
            </div>
            
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-lg">{doctor.name}</h3>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  doctor.visit_type === "online" 
                    ? "bg-blue-100 text-blue-800"
                    : doctor.visit_type === "offline"
                    ? "bg-green-100 text-green-800"
                    : "bg-purple-100 text-purple-800"
                }`}>
                  {doctor.visit_type === "both" ? "Online & Offline" : doctor.visit_type}
                </span>
              </div>
              
              <p className="text-gray-600 text-sm mb-2">{doctor.specialization}</p>
              <p className="text-gray-500 text-sm mb-2">{doctor.clinic_name}</p>
              
              <div className="flex justify-between items-center mt-3">
                <span className="text-indigo-600 font-semibold">
                  ₸{parseInt(doctor.price).toLocaleString()}
                </span>
                <div className="flex items-center">
                  <span className="text-yellow-400">★</span>
                  <span className="text-gray-600 text-sm ml-1">{doctor.rating}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredDoctors.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No doctors found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default Doctors;
