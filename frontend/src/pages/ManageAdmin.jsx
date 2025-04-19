// ManageAdmins.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ManageAdmins = () => {
  const navigate = useNavigate();
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/admins', {
          headers: {
            Authorization: token,
          },
        });
        setAdmins(res.data);
      } catch (err) {
        console.error('Error fetching admins:', err);
      }
    };

    fetchAdmins();
  }, []);

  return (
    <div className="min-h-screen bg-white p-8 flex flex-col items-center">
      {/* Header */}
      <div className="w-full flex justify-between items-center mb-10">
        {/* Logo */}
        <div className="flex items-center">
          <img
            src="src/assets/evm-logo.png"
            alt="Logo"
            className="w-12 h-12 mr-4"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center w-full max-w-6xl p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Manage Admins</h2>

        {/* Action Buttons */}
        <div className="w-full border-4 border-green-600 p-6 rounded-lg flex flex-wrap gap-6 mb-8 justify-center">
          <button
            onClick={() => navigate('/add-admin')}
            className="bg-green-600 text-white px-8 py-3 rounded-md text-xl hover:bg-green-700 transform transition-all duration-200"
          >
            Add Admin
          </button>
          <button
            onClick={() => navigate('/edit-admin')}
            className="bg-yellow-500 text-white px-8 py-3 rounded-md text-xl hover:bg-yellow-600 transform transition-all duration-200"
          >
            Edit Admin
          </button>
          <button
            onClick={() => navigate('/delete-admin')}
            className="bg-red-600 text-white px-8 py-3 rounded-md text-xl hover:bg-red-700 transform transition-all duration-200"
          >
            Delete Admin
          </button>
        </div>

        {/* Admin Table */}
        <div className="w-full bg-gray-100 rounded-lg shadow-md p-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Admin List</h3>

          {admins.length === 0 ? (
            <p className="text-gray-600">No admins found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">#</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Username</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">City</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-300">
                  {admins.map((admin, index) => (
                    <tr key={admin._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{index + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{admin.username}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{admin.city}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageAdmins;