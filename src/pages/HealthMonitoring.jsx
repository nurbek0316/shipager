import React from 'react';

const mockHealthData = {
  vitals: {
    bloodPressure: [
      { date: '2025-06-02', systolic: 120, diastolic: 80 },
      { date: '2025-05-25', systolic: 118, diastolic: 79 },
      { date: '2025-05-15', systolic: 122, diastolic: 82 }
    ],
    heartRate: [
      { date: '2025-06-02', value: 72 },
      { date: '2025-05-25', value: 75 },
      { date: '2025-05-15', value: 70 }
    ],
    weight: [
      { date: '2025-06-02', value: 70.5 },
      { date: '2025-05-25', value: 70.7 },
      { date: '2025-05-15', value: 70.4 }
    ]
  },
  medications: [
    {
      name: 'Vitamin D3',
      dosage: '2000 IU',
      frequency: 'Daily',
      timeOfDay: 'Morning',
      status: 'Active'
    },
    {
      name: 'Omega-3',
      dosage: '1000 mg',
      frequency: 'Daily',
      timeOfDay: 'With meals',
      status: 'Active'
    }
  ],
  symptoms: [
    {
      date: '2025-06-01',
      type: 'Headache',
      severity: 'Mild',
      duration: '2 hours'
    },
    {
      date: '2025-05-20',
      type: 'Fatigue',
      severity: 'Moderate',
      duration: 'All day'
    }
  ]
};

const HealthMonitoring = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Health Monitoring</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Vital Signs Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Vital Signs</h2>
          
          <div className="space-y-6">
            {/* Blood Pressure */}
            <div>
              <h3 className="font-medium text-gray-700 mb-2">Blood Pressure</h3>
              <div className="space-y-2">
                {mockHealthData.vitals.bloodPressure.map((bp, index) => (
                  <div key={index} className="flex justify-between items-center border-b pb-2">
                    <span className="text-gray-600">{bp.date}</span>
                    <span className="font-medium">{bp.systolic}/{bp.diastolic} mmHg</span>
                  </div>
                ))}
              </div>
              <button className="mt-2 text-indigo-600 hover:text-indigo-700 text-sm">
                + Add new measurement
              </button>
            </div>

            {/* Heart Rate */}
            <div>
              <h3 className="font-medium text-gray-700 mb-2">Heart Rate</h3>
              <div className="space-y-2">
                {mockHealthData.vitals.heartRate.map((hr, index) => (
                  <div key={index} className="flex justify-between items-center border-b pb-2">
                    <span className="text-gray-600">{hr.date}</span>
                    <span className="font-medium">{hr.value} bpm</span>
                  </div>
                ))}
              </div>
              <button className="mt-2 text-indigo-600 hover:text-indigo-700 text-sm">
                + Add new measurement
              </button>
            </div>

            {/* Weight */}
            <div>
              <h3 className="font-medium text-gray-700 mb-2">Weight</h3>
              <div className="space-y-2">
                {mockHealthData.vitals.weight.map((w, index) => (
                  <div key={index} className="flex justify-between items-center border-b pb-2">
                    <span className="text-gray-600">{w.date}</span>
                    <span className="font-medium">{w.value} kg</span>
                  </div>
                ))}
              </div>
              <button className="mt-2 text-indigo-600 hover:text-indigo-700 text-sm">
                + Add new measurement
              </button>
            </div>
          </div>
        </div>

        {/* Medications and Symptoms */}
        <div className="space-y-6">
          {/* Medications Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Medications</h2>
              <button className="text-indigo-600 hover:text-indigo-700">
                + Add medication
              </button>
            </div>
            <div className="space-y-4">
              {mockHealthData.medications.map((med, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{med.name}</h3>
                      <p className="text-sm text-gray-600">
                        {med.dosage} - {med.frequency}
                      </p>
                      <p className="text-sm text-gray-600">{med.timeOfDay}</p>
                    </div>
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-sm rounded">
                      {med.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Symptoms Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Symptoms</h2>
              <button className="text-indigo-600 hover:text-indigo-700">
                + Log symptom
              </button>
            </div>
            <div className="space-y-4">
              {mockHealthData.symptoms.map((symptom, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">{symptom.type}</span>
                      <span className="text-gray-600">{symptom.date}</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Severity: {symptom.severity}
                    </p>
                    <p className="text-sm text-gray-600">
                      Duration: {symptom.duration}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthMonitoring; 