import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditCandidate = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { id } = useParams(); // Get Candidate id from the URL
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCandidate = async () => {
      try {
        const { data } = await axios.get(`/api/Candidates/${id}`);
        setUsername(data.username);
        // Do not show password, let Candidate reset it
      } catch (error) {
        console.error(error);
        alert('Error fetching Candidate data');
      }
    };
    fetchCandidate();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const CandidateData = { username, password };

    try {
      await axios.put(`/api/Candidates/${id}`, CandidateData);
      alert('Candidate updated successfully');
      navigate('/candidates'); // Redirect to Candidate list
    } catch (error) {
      alert('Error updating Candidate');
      console.error(error);
    }
  };

  return (
    <div className="h-screen w-full bg-blue-50 flex flex-col items-center justify-center relative">
      {/* Logo in top-left */}
      <img
        src="/src/assets/evm-logo.png"
        alt="EVM Logo"
        className="fixed top-4 left-4 w-16 h-16 z-50"
      />

      {/* Title */}
      <h1 className="text-5xl font-extrabold text-blue-900 mb-6 tracking-wide">
        SadiVote
      </h1>

      {/* Edit Candidate Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white border-2 border-blue-700 rounded-2xl p-8 w-[90%] max-w-md shadow-xl space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-2">
          Edit Candidate information
        </h2>

        {/* Username Field */}
        <div>
          <label className="block text-md font-medium text-blue-900 mb-1">
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter candidate username"
            required
          />
        </div>

        {/* Password Field */}
        <div>
          <label className="block text-md font-medium text-blue-900 mb-1">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            placeholder="Enter new password"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full shadow-md transition-all duration-300"
          >
          Update Candidate
        </button>
      </form>
    </div>
  );
};

export default EditCandidate;
