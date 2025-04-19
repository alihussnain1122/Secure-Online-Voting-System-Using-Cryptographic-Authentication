import React, { useState } from 'react';
import axios from 'axios';

const DeleteCandidate = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleDelete = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const res = await axios.post('/api/Candidate/delete', {
        username,
        password,
      });

      setSuccess(res.data.message);
      setUsername('');
      setPassword('');
    } catch (error) {
      console.error(error);
      setError(
        error.response?.data?.message || 'Error deleting Candidate. Please try again.'
      );
    }
  };

  return (
    <div className="h-screen w-full bg-red-50 flex flex-col items-center justify-center relative">
      {/* Logo */}
      <img
        src="/src/assets/evm-logo.png"
        alt="EVM Logo"
        className="fixed top-4 left-4 w-16 h-16 z-50"
      />

      {/* Title */}
      <h1 className="text-5xl font-extrabold text-red-700 mb-6 tracking-wide">
        SadiVote
      </h1>

      {/* Delete Candidate Form */}
      <form
        onSubmit={handleDelete}
        className="bg-white border-2 border-red-600 rounded-2xl p-8 w-[90%] max-w-md shadow-xl space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-red-600 mb-2">
          Delete Candidate
        </h2>

        {/* Username */}
        <div>
          <label className="block text-md font-medium text-red-900 mb-1">
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="Enter candidate username"
            required
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-md font-medium text-red-900 mb-1">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="Enter candidate password"
            required
          />
        </div>

        {/* Error / Success Messages */}
        {error && <p className="text-red-600 text-sm text-center">{error}</p>}
        {success && <p className="text-green-700 text-sm text-center">{success}</p>}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-red-600 text-white font-semibold text-lg rounded-full hover:bg-red-800 transition duration-300 shadow-md"
        >
          Delete Candidate
        </button>
      </form>
    </div>
  );
};

export default DeleteCandidate;
