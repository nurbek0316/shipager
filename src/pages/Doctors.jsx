import React, { useContext, useMemo, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Doctors = () => {
  const { doctors, loading, error } = useContext(AppContext);
  const navigate = useNavigate();

  const [selectedSpecs, setSelectedSpecs] = useState([]);
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

    if (selectedSpecs.length > 0) {
      result = result.filter((doc) => selectedSpecs.includes(doc.specialization));
    }

    if (sortField) {
      result.sort((a, b) => {
        const aVal = parseFloat(a[sortField]);
        const bVal = parseFloat(b[sortField]);
        return sortOrder === "asc" ? aVal - bVal : bVal - aVal;
      });
    }

    return result;
  }, [doctors, selectedSpecs, sortField, sortOrder]);

  if (loading) return <div className="text-center mt-10">Loading doctors...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">Failed to load doctors.</div>;

  return (
    <div className="flex flex-col lg:flex-row p-6 gap-10">
      {/* Doctor Cards */}
      <div className="flex-1">
        <h1 className="text-3xl font-medium text-gray-800 mb-8 text-center lg:text-left">
          All Doctors
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredDoctors.length === 0 ? (
            <p className="col-span-full text-center text-gray-500">
              No doctors found with selected filters.
            </p>
          ) : (
            filteredDoctors.map((item, index) => (
              <div
                key={index}
                onClick={() => navigate(`/appoinment/${item.id}`)}
                className="border border-gray-200 rounded-2xl p-5 hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer bg-white"
              >
                <div className="bg-blue-50 w-full h-40 flex items-center justify-center text-gray-400 rounded-xl mb-4">
                  <span className="text-sm">No Image</span>
                </div>
                <p className="text-lg font-semibold text-gray-800 mb-1">{item.name}</p>
                <p className="text-blue-600 text-sm mb-1">{item.specialization}</p>
                <p className="text-gray-500 text-sm mb-1">{item.address}</p>
                <p className="text-gray-500 text-sm mb-1">
                  Experience: {item.experience} years
                </p>
                <div className="flex justify-between items-center mt-3">
                  <p className="text-gray-800 font-semibold">{item.price} ₸</p>
                  <p className="text-sm text-yellow-500">⭐ {item.rating}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Sidebar Filters */}
      <div className="w-full lg:w-72 bg-white border border-gray-200 rounded-2xl p-5 h-fit shadow-sm">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Filters</h2>

        {/* Specialization */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Specialization</h3>
          <div className="flex flex-col gap-2 max-h-48 overflow-y-auto pr-1">
            {specializations.map((spec, idx) => (
              <label key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                <input
                  type="checkbox"
                  checked={selectedSpecs.includes(spec)}
                  onChange={() => toggleSpec(spec)}
                  className="accent-blue-500"
                />
                {spec}
              </label>
            ))}
          </div>
        </div>

        {/* Sort by */}
        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-700 mb-1">Sort by</h3>
          <select
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            value={sortField || ""}
            onChange={(e) => setSortField(e.target.value || null)}
          >
            <option value="">None</option>
            <option value="price">Price</option>
            <option value="rating">Rating</option>
          </select>
        </div>

        {/* Sort order */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-1">Order</h3>
          <select
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="asc">Ascending ↑</option>
            <option value="desc">Descending ↓</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Doctors;
