import React from 'react';
import { useNavigate } from 'react-router-dom';

const ManageCandidates = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white p-8 flex flex-col items-center">
      {/* Header */}
      <div className="w-full flex justify-between items-center mb-10">
        {/* Logo and Title */}
        <div className="flex items-center">
          <img
            src="src/assets/evm-logo.png" // Replace with your actual logo path
            alt="Logo"
            className="w-12 h-12 mr-4"
          />
          {/* <div className="flex flex-col justify-center items-center">
            <h1 className="text-4xl font-bold text-green-600">Sadi Vote</h1>
            <p className="text-xl font-medium text-gray-600">Election Commission</p>
          </div> */}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center w-full max-w-4xl p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Manage Candidates</h2>

        {/* Buttons Container with Green Border */}
        <div className="w-full border-4 border-green-600 p-6 rounded-lg flex flex-wrap gap-6 mb-8 justify-center">
          <button
            onClick={() => navigate('/add-candidate')}
            className="bg-green-600 text-white px-8 py-3 rounded-md text-xl hover:bg-green-700 transform transition-all duration-200"
          >
            Add Candidate
          </button>
          <button
            onClick={() => navigate('/edit-candidate')}
            className="bg-yellow-500 text-white px-8 py-3 rounded-md text-xl hover:bg-yellow-600 transform transition-all duration-200"
          >
            Edit Candidate
          </button>
          <button
            onClick={() => navigate('/delete-candidate')}
            className="bg-red-600 text-white px-8 py-3 rounded-md text-xl hover:bg-red-700 transform transition-all duration-200"
          >
            Delete Candidate
          </button>
        </div>

        {/* Candidate List / Table Placeholder */}
        <div className="w-full bg-gray-100 rounded-lg shadow-md p-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Candidate List</h3>
          <p className="text-gray-600">Here you can manage candidates by adding, editing, or deleting.</p>
        </div>
      </div>
    </div>
  );
};

export default ManageCandidates;
