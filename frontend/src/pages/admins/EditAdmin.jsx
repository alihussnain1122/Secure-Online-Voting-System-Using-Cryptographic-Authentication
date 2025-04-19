import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditAdmin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [city, setCity] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const { data } = await axios.get(`/api/admins/${id}`);
        setUsername(data.username);
        setCity(data.city || '');
      } catch (error) {
        console.error(error);
        setError('Failed to load admin data');
      }
    };

    fetchAdmin();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    const adminData = { username, password, city };

    try {
      await axios.put(`/api/admins/${id}`, adminData);
      setMessage('Admin updated successfully');
      setTimeout(() => {
        navigate('/admin/list');
      }, 1500);
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('Error updating admin');
      }
    }
  };

  return (
    <div className="h-screen w-full bg-blue-50 flex flex-col items-center justify-center relative">
      {/* Logo */}
      <img
        src="/src/assets/evm-logo.png"
        alt="EVM Logo"
        className="fixed top-4 left-4 w-16 h-16 z-50"
      />

      {/* Title */}
      <h1 className="text-5xl font-extrabold text-blue-900 mb-6 tracking-wide">
        SadiVote
      </h1>

      {/* Edit Admin Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white border-2 border-blue-700 rounded-2xl p-8 w-[90%] max-w-md shadow-xl space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-2">
          Edit Presiding Information
        </h2>

        {/* Username Field */}
        <div>
          <label className="block text-md font-medium text-blue-900 mb-1">
            Username
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            required
          />
        </div>

        {/* Password Field */}
        <div>
          <label className="block text-md font-medium text-blue-900 mb-1">
            New Password
          </label>
          <input
            type="password"
            className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter new password"
          />
        </div>

        {/* City Field */}
        <div>
          <label className="block text-md font-medium text-blue-900 mb-1">
            City
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city"
            required
          />
        </div>

        {/* Feedback Messages */}
        {message && (
          <p className="text-green-700 text-sm text-center">{message}</p>
        )}
        {error && (
          <p className="text-red-600 text-sm text-center">{error}</p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full shadow-md transition-all duration-300"
        >
          Update Officer
        </button>
      </form>
    </div>
  );
};

export default EditAdmin;
