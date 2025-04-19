import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Please fill in both fields');
      return;
    }
    // Simulate login
    navigate('/admin-dashboard');
  };

  return (
    <div className="h-screen w-full bg-white flex flex-col items-center justify-center relative">
      {/* Logo in top-left */}
      <img
        src="/src/assets/evm-logo.png"
        alt="EVM Logo"
        className="fixed top-4 left-4 w-16 h-16 z-50"
      />

      {/* Title */}
      <h1 className="text-5xl font-extrabold text-green-800 mb-6 tracking-wide">
        PakRaaz
      </h1>

      {/* Login Form */}
      <form
        onSubmit={handleLogin}
        className="bg-white border-2 border-green-700 rounded-2xl p-8 w-[90%] max-w-md shadow-xl space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-black mb-2">
          Presiding Officer Login
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
            placeholder="Enter admin password"
          />
        </div>

        {/* Error Message */}
        {error && <p className="text-red-600 text-sm text-center">{error}</p>}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-green-700 text-white font-semibold text-lg rounded-full hover:bg-green-900 transition duration-300 shadow-md"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
