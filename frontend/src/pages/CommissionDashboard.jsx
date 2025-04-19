import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '/src/assets/evm-logo.png'; // Make sure this path is correct

const CommissionDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  const dashboardOptions = [
    { title: 'Manage Admins (Add / Edit / Delete)', route: '/manage-admins' },
    { title: 'Manage Voters (Add / Edit / Delete)', route: '/manage-voters' },
    { title: 'Manage Candidates (Add / Edit / Delete)', route: '/manage-candidates' },
    { title: 'View Registered Voters', route: '/voters-list' },
    { title: 'Feedback & Complaints', route: '/review-feedback' },
    { title: 'Search Voter', route: '/search-voter' },
    { title: 'Search Presiding Officer', route: '/search-officer' },
    { title: 'Vote Results by Polling Station', route: '/vote-results-by-station' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-green-50 to-white p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-12">
        {/* Left Logo */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-center sm:justify-start">
          <img src={logo} alt="ECP Logo" className="h-14 w-14 object-contain" />
        </div>

        {/* Center Name */}
        <h1 className="text-3xl sm:text-4xl font-bold text-green-800 text-center w-full drop-shadow-sm">
          Election Commission of Pakistan
        </h1>

        {/* Right Logout */}
        <div className="w-full sm:w-auto mt-4 sm:mt-0 flex justify-center sm:justify-end">
          <button
            onClick={handleLogout}
            className="bg-black text-white px-6 py-2 rounded-lg text-lg hover:bg-green-800 transition duration-300 shadow-md"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {dashboardOptions.map((item, index) => (
          <DashboardCard
            key={index}
            title={item.title}
            onClick={() => navigate(item.route)}
          />
        ))}
      </div>
    </div>
  );
};

// Dashboard Card Component
const DashboardCard = ({ title, onClick }) => (
  <div
    onClick={onClick}
    className="cursor-pointer bg-white rounded-xl shadow-md p-6 hover:shadow-xl transform hover:-translate-y-1 transition duration-300 border-t-4 border-green-600"
  >
    <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
  </div>
);

export default CommissionDashboard;
