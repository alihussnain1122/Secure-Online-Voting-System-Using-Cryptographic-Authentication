import React, { useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const VoteResultsByStation = () => {
  const [city, setCity] = useState('');
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');

  const fetchResults = async () => {
    try {
      const res = await axios.get(`/api/votes/results-by-city?city=${city}`);
      setResults(res.data); // Expected to return { candidates: [{ name, votes }], totalVotes }
      setError('');
    } catch (err) {
      setResults(null);
      setError(err.response?.data?.message || 'No results found for this city.');
    }
  };

  const chartData = results && {
    labels: results.candidates.map((c) => c.name),
    datasets: [
      {
        label: 'Votes',
        data: results.candidates.map((c) => c.votes),
        backgroundColor: 'rgba(34, 197, 94, 0.7)', // green-500
        borderColor: 'rgba(22, 163, 74, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 relative">
      {/* Top Left Logo */}
      <div className="absolute top-4 left-4">
        <img src="/src/assets/evm-logo.png" alt="Logo" className="w-12 h-auto" />
      </div>

      {/* Center Title */}
      <div className="text-center mb-6">
        <h1 className="text-4xl font-extrabold text-green-900">SadiVote</h1>
      </div>

      {/* Search Box */}
      <div className="max-w-xl mx-auto bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-2xl font-semibold text-green-800 mb-4 text-center">📊 Vote Results by City</h2>

        <div className="flex items-center gap-4 mb-4">
          <input
            type="text"
            placeholder="Enter City Name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="flex-1 px-4 py-3 border rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            onClick={fetchResults}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md text-lg"
          >
            Show Results
          </button>
        </div>

        {error && <p className="text-red-500 text-center">{error}</p>}

        {results && (
          <div className="mt-6">
            <Bar data={chartData} />
            <p className="mt-4 text-center text-lg font-bold text-green-800">
              🏆 Winner: {results.winner}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VoteResultsByStation;
