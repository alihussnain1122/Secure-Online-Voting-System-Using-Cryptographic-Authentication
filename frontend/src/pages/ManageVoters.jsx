// ManageVoters.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ManageVoters = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white p-8 flex flex-col items-center">
      {/* Header */}
      <div className="w-full flex  mb-10">
        {/* Logo */}
        <div className="flex ">
          <img
            src="src/assets/evm-logo.png" // Replace with your actual logo path
            alt="Logo"
            className="w-12 h-12 mr-4"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center w-full max-w-4xl p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Manage Voters</h2>

        {/* Buttons Container with Green Border */}
        <div className="w-full border-4 border-green-600 p-6 rounded-lg flex flex-wrap gap-6 mb-8 justify-center">
          <button
            onClick={() => navigate('/add-voter')}
            className="bg-green-600 text-white px-8 py-3 rounded-md text-xl hover:bg-green-700 transform transition-all duration-200"
          >
            Add Voter
          </button>
          <button
            onClick={() => navigate('/edit-voter')}
            className="bg-yellow-500 text-white px-8 py-3 rounded-md text-xl hover:bg-yellow-600 transform transition-all duration-200"
          >
            Edit Voter
          </button>
          <button
            onClick={() => navigate('/delete-voter')}
            className="bg-red-600 text-white px-8 py-3 rounded-md text-xl hover:bg-red-700 transform transition-all duration-200"
          >
            Delete Voter
          </button>
        </div>

        {/* Voter List / Table Placeholder */}
        <div className="w-full bg-gray-100 rounded-lg shadow-md p-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Voter List</h3>
          <p className="text-gray-600">Here you can manage voters by adding, editing, or deleting.</p>
        </div>
      </div>
    </div>
  );
};

export default ManageVoters;
