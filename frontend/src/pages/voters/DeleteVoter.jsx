import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const DeleteVoter = () => {
  const { id } = useParams();  // Retrieve voter ID from URL params
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({ cnic: '', voterId: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleDelete = async (e) => {
    e.preventDefault();

    if (!credentials.cnic || !credentials.voterId) {
      alert('Please fill in both CNIC and Voter ID.');
      return;
    }

    try {
      const token = localStorage.getItem('token');  // Retrieve token for authentication

      // First, verify the CNIC and Voter ID to ensure it's authorized to delete
      const response = await axios.post(
        `http://localhost:5000/api/voters/verify/${id}`,
        credentials,
        {
          headers: { Authorization: token },
        }
      );

      // If credentials are correct, proceed with deletion
      if (response.data.success) {
        await axios.delete(`http://localhost:5000/api/voters/${id}`, {
          headers: { Authorization: token },
        });
        alert('Voter deleted successfully!');
        navigate('/voters-list');  // Navigate back to the voter list
      } else {
        alert('Invalid CNIC or Voter ID. Cannot delete voter.');
      }
    } catch (err) {
      console.error('Error verifying or deleting voter:', err);
      alert('Something went wrong while deleting the voter.');
    }
  };

  return (
    <div className="bg-red-50 text-black min-h-screen flex flex-col items-center py-10 relative">
      
      {/* Logo - Top Left */}
      <div className="absolute top-6 left-6">
        <img src="/src/assets/evm-logo.png" alt="Logo" className="w-14 h-auto" />
      </div>

      {/* SadiVote Title - Centered above form */}
      <div className="mb-2">
        <h1 className="text-5xl font-extrabold text-red-700 mb-6 tracking-wide">SadiVote</h1>
      </div>

      {/* Form Box */}
      <div className="w-full max-w-xl border border-red-600 rounded-xl p-8 shadow-lg bg-white mt-2">
        <h2 className="text-2xl font-bold text-center text-red-600 mb-6">Delete Voter Details</h2>
        <form onSubmit={handleDelete} className="space-y-6">
          <div>
            <label htmlFor="cnic" className="block text-md font-medium text-red-900 mb-1">CNIC</label>
            <input
              id="cnic"
              name="cnic"
              type="text"
              value={credentials.cnic}
              onChange={handleChange}
              required
              className="w-full p-3 border border-red-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Enter CNIC (e.g. 12345-1234567-1)"
            />
          </div>

          <div>
            <label htmlFor="voterId" className="block text-md font-medium text-red-900 mb-1">Voter ID</label>
            <input
              id="voterId"
              name="voterId"
              type="text"
              value={credentials.voterId}
              onChange={handleChange}
              required
              className="w-full p-3 border border-red-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Enter Voter ID"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-full shadow-md transition-all duration-300"
          >
            Confirm & Delete
          </button>
        </form>
      </div>
    </div>
  );
};

export default DeleteVoter;
