import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const VoterDashboard = () => {
  const navigate = useNavigate();
  const [voter, setVoter] = useState(null);

  useEffect(() => {
    const fetchVoter = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/api/voter/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setVoter(res.data);
      } catch (err) {
        console.error('Failed to load voter data:', err);
      }
    };

    fetchVoter();
  }, []);

  const handleVoteClick = () => {
    navigate('/cast-vote');
  };

  const handleExitClick = () => {
    navigate('/');
  };

  if (!voter) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-gray-600">
        Loading your dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-gray-100">
      {/* Left Panel – Voter Info */}
      <div className="flex flex-col justify-center items-start p-10 space-y-8">
        <h1 className="text-4xl font-bold text-green-700">
          Welcome, {voter.name}
        </h1>

        <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">🪪 Your Voter Details</h2>
          <p className="text-lg mb-2">
            <span className="font-semibold">CNIC:</span> {voter.cnic}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Constituency:</span> {voter.constituency}
          </p>
        </div>

        <div className="flex flex-col space-y-4 w-full max-w-sm">
          <button
            onClick={handleVoteClick}
            className="px-8 py-4 bg-[#009639] text-white text-xl rounded-full hover:bg-[#006d32] transition"
          >
            Cast Vote
          </button>
          <button
            onClick={handleExitClick}
            className="px-8 py-4 bg-red-600 text-white text-xl rounded-full hover:bg-red-700 transition"
          >
            Exit
          </button>
        </div>
      </div>

      {/* Right Panel – Instructional Video */}
      <div className="hidden lg:flex items-center justify-center bg-black">
        <video
          src="/videos/src/assets/Mac.mp4"
          autoPlay
          loop
          muted
          controls
          className="w-full h-full object-cover rounded-l-2xl shadow-lg"
        />
      </div>
    </div>
  );
};

export default VoterDashboard;
