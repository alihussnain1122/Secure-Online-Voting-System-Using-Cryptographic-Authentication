import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CheckCircle, XCircle, Search, LogOut } from 'lucide-react';
import logo from '../assets/evm-logo.png';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [votes, setVotes] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [searchCNIC, setSearchCNIC] = useState('');
  const [searchResult, setSearchResult] = useState(null);

  useEffect(() => {
    const fetchVotes = async () => {
      try {
        const response = await axios.get('/api/votes/results');
        setVotes(response.data);
      } catch (err) {
        console.error('Failed to fetch votes:', err);
      }
    };

    const fetchFeedback = async () => {
      try {
        const response = await axios.get('/api/feedbacks');
        setFeedbacks(response.data);
      } catch (err) {
        console.error('Failed to fetch feedback:', err);
      }
    };

    fetchVotes();
    fetchFeedback();
  }, []);

  const winner = votes.reduce((max, vote) => (vote.count > max.count ? vote : max), votes[0] || {});
  const loser = votes.reduce((min, vote) => (vote.count < min.count ? vote : min), votes[0] || {});

  const handleSearch = async () => {
    if (!searchCNIC) return;
    try {
      const res = await axios.get(`/api/voters/${searchCNIC}`);
      setSearchResult(res.data);
    } catch (err) {
      setSearchResult({
        error: err.response?.data?.error || 'Unable to fetch voter.',
      });
    }
  };

  const handleLogout = () => navigate('/');

  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-br from-gray-100 to-gray-300 px-6 py-10 flex flex-col items-center">

      {/* Header */}
      <div className="w-full max-w-6xl flex items-center justify-between mb-10">
        <img src={logo} alt="Sadi Vote Logo" className="h-16 w-auto" />
        <h1 className="text-4xl font-bold text-green-800 tracking-wide text-center flex-grow -ml-16">
          Sadi Vote - Presiding Officer Dashboard
        </h1>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-5 py-2.5 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all shadow-md"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>

      {/* Vote Results */}
      <div className="w-full max-w-5xl bg-white p-6 rounded-2xl shadow-lg mb-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">📊 Vote Results</h2>
        {votes.length === 0 ? (
          <p className="text-gray-500">No votes recorded yet.</p>
        ) : (
          <>
            <ul className="space-y-3 mb-6">
              {votes.map((v, i) => (
                <li key={i} className="flex justify-between text-lg font-medium text-gray-700">
                  <span>{v._id}</span>
                  <span className="text-blue-600">{v.count} Votes</span>
                </li>
              ))}
            </ul>

            {/* Graph */}
            <div className="w-full h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={votes}>
                  <XAxis dataKey="_id" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#4ade80" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </>
        )}
      </div>

      {/* Winner & Loser */}
      {votes.length > 0 && (
        <div className="w-full max-w-5xl bg-white p-6 rounded-2xl shadow-lg mb-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">🏆 Winner & ❌ Loser</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-lg">
            <div className="bg-green-50 p-4 rounded-lg flex justify-between items-center border border-green-200">
              <span className="font-semibold text-green-700">Winner:</span>
              <span className="text-green-600">{winner._id} ({winner.count} votes)</span>
            </div>
            <div className="bg-red-50 p-4 rounded-lg flex justify-between items-center border border-red-200">
              <span className="font-semibold text-red-700">Loser:</span>
              <span className="text-red-600">{loser._id} ({loser.count} votes)</span>
            </div>
          </div>
        </div>
      )}

      {/* Voter Search */}
      <div className="w-full max-w-5xl bg-white p-6 rounded-2xl shadow-lg mb-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">🔍 Search Voter by CNIC</h2>
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <input
            type="text"
            placeholder="Enter CNIC"
            value={searchCNIC}
            onChange={(e) => setSearchCNIC(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleSearch}
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
          >
            <Search size={20} />
            Search
          </button>
        </div>
        {searchResult && (
          <div className="mt-4 text-lg">
            {searchResult.error ? (
              <p className="text-red-600">{searchResult.error}</p>
            ) : (
              <div className="bg-gray-50 p-4 rounded-lg text-gray-700 space-y-1 border border-gray-200">
                <p><strong>Name:</strong> {searchResult.name}</p>
                <p><strong>Voter ID:</strong> {searchResult._id}</p>
                <p className="flex items-center gap-2">
                  <strong>Voted:</strong>
                  {searchResult.voted ? (
                    <span className="text-green-600 flex items-center gap-1">
                      <CheckCircle size={18} /> Yes
                    </span>
                  ) : (
                    <span className="text-red-600 flex items-center gap-1">
                      <XCircle size={18} /> No
                    </span>
                  )}
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Feedback Section */}
      <div className="w-full max-w-5xl bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">🗣️ Voter Feedback</h2>
        {feedbacks.length === 0 ? (
          <p className="text-gray-500">No feedback submitted yet.</p>
        ) : (
          <ul className="list-disc list-inside space-y-2 text-gray-700 text-lg">
            {feedbacks.map((fb, i) => (
              <li key={i} className="ml-2">{fb}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
