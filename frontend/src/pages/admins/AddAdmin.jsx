import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddAdmin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [city, setCity] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const adminData = { username, password, city };

    try {
      await axios.post('/api/admins', adminData);
      setSuccess('Admin added successfully!');
      setUsername('');
      setPassword('');
      setCity('');
      setTimeout(() => {
        navigate('/manage-admins');
      }, 1500);
    } catch (error) {
      setError('Error adding admin. Please try again.');
      console.error(error);
    }
  };

  return (
    <div className="h-screen w-full bg-green-50 flex flex-col items-center justify-center relative">
      {/* Logo */}
      <img
        src="/src/assets/evm-logo.png"
        alt="EVM Logo"
        className="fixed top-4 left-4 w-16 h-16 z-50"
      />

      {/* Title */}
      <h1 className="text-5xl font-extrabold text-green-800 mb-6 tracking-wide">
        Pak Raaz
      </h1>

      {/* Add Admin Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white border-2 border-green-700 rounded-2xl p-8 w-[90%] max-w-md shadow-xl space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-green-700 mb-2">
          Add New Presiding Officer
        </h2>

        {/* Username Field */}
        <div>
          <label className="block text-md font-medium text-green-900 mb-1">
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border border-green-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800"
            placeholder="Enter admin username"
            required
          />
        </div>

        {/* Password Field */}
        <div>
          <label className="block text-md font-medium text-green-900 mb-1">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-green-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800"
            placeholder="Enter password"
            required
          />
        </div>

        {/* City Field */}
        <div>
          <label className="block text-md font-medium text-green-900 mb-1">
            City
          </label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full px-4 py-2 border border-green-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-800"
            placeholder="Enter city"
            required
          />
        </div>

        {/* Error / Success Messages */}
        {error && <p className="text-red-600 text-sm text-center">{error}</p>}
        {success && <p className="text-green-700 text-sm text-center">{success}</p>}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-green-700 text-white font-semibold text-lg rounded-full hover:bg-green-900 transition duration-300 shadow-md"
        >
          Add Officer
        </button>
      </form>
    </div>
  );
};

export default AddAdmin;
