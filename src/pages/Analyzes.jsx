import React, { useState, useMemo } from 'react';

const mockAnalyzes = [
  {
    id: 1,
    name: 'Complete Blood Count (CBC)',
    date: '2025-05-15',
    status: 'Completed',
    results: {
      hemoglobin: { value: '14.2', unit: 'g/dL', range: '13.5-17.5' },
      whiteBloodCells: { value: '7.5', unit: '×10⁹/L', range: '4.5-11.0' },
      platelets: { value: '250', unit: '×10⁹/L', range: '150-450' }
    }
  },
  {
    id: 2,
    name: 'Lipid Panel',
    date: '2025-05-10',
    status: 'Completed',
    results: {
      totalCholesterol: { value: '185', unit: 'mg/dL', range: '<200' },
      ldl: { value: '110', unit: 'mg/dL', range: '<130' },
      hdl: { value: '45', unit: 'mg/dL', range: '>40' }
    }
  },
  {
    id: 3,
    name: 'Urinalysis',
    date: '2025-05-20',
    status: 'Pending',
    results: null
  }
];

const Analyzes = () => {
  const [selectedAnalysis, setSelectedAnalysis] = useState(null);
  const [dateFilter, setDateFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const filteredAnalyzes = useMemo(() => {
    return mockAnalyzes.filter(analysis => {
      // Apply date filter
      if (dateFilter && analysis.date < dateFilter) {
        return false;
      }

      // Apply status filter
      if (statusFilter && analysis.status.toLowerCase() !== statusFilter.toLowerCase()) {
        return false;
      }

      return true;
    });
  }, [dateFilter, statusFilter]);

  const renderResults = (results) => {
    if (!results) return null;
    return (
      <div className="mt-4 bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-3">Results</h3>
        <div className="space-y-2">
          {Object.entries(results).map(([key, data]) => (
            <div key={key} className="grid grid-cols-4 gap-4 py-2 border-b">
              <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
              <span>{data.value}</span>
              <span>{data.unit}</span>
              <span className="text-gray-600">Normal range: {data.range}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const handleDateFilterChange = (e) => {
    setDateFilter(e.target.value);
    setSelectedAnalysis(null); // Reset selected analysis when filter changes
  };

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
    setSelectedAnalysis(null); // Reset selected analysis when filter changes
  };

  const handleClearFilters = () => {
    setDateFilter('');
    setStatusFilter('');
    setSelectedAnalysis(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">My Analyzes</h1>
      
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Schedule New Analysis</h2>
            <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors">
              Schedule Analysis
            </button>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Filters</h2>
              {(dateFilter || statusFilter) && (
                <button 
                  onClick={handleClearFilters}
                  className="text-sm text-indigo-600 hover:text-indigo-700"
                >
                  Clear filters
                </button>
              )}
            </div>
            <div className="space-y-4">
              <label className="block">
                <span className="text-gray-700">From Date</span>
                <input 
                  type="date" 
                  value={dateFilter}
                  onChange={handleDateFilterChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" 
                />
              </label>
              <label className="block">
                <span className="text-gray-700">Status</span>
                <select 
                  value={statusFilter}
                  onChange={handleStatusFilterChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                >
                  <option value="">All</option>
                  <option value="completed">Completed</option>
                  <option value="pending">Pending</option>
                </select>
              </label>
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow">
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Analysis History</h2>
                <span className="text-sm text-gray-600">
                  {filteredAnalyzes.length} result{filteredAnalyzes.length !== 1 ? 's' : ''}
                </span>
              </div>
              <div className="space-y-4">
                {filteredAnalyzes.length > 0 ? (
                  filteredAnalyzes.map((analysis) => (
                    <div
                      key={analysis.id}
                      className="border rounded-lg p-4 cursor-pointer hover:border-indigo-500 transition-colors"
                      onClick={() => setSelectedAnalysis(analysis)}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-semibold">{analysis.name}</h3>
                          <p className="text-sm text-gray-600">Date: {analysis.date}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          analysis.status === 'Completed' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {analysis.status}
                        </span>
                      </div>
                      {selectedAnalysis?.id === analysis.id && renderResults(analysis.results)}
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No analyzes found matching your filters
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analyzes; 