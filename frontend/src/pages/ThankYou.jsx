import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '/src/assets/evm-logo.png'; // Adjust path as per your project

const ThankYou = () => {
  const navigate = useNavigate();

  const handleDownload = async (type) => {
    const url = `/api/vote/download-${type}`;
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        const fileName = data[type]?.fileName;
        if (fileName) {
          const downloadLink = document.createElement('a');
          downloadLink.href = `/uploads/${fileName}`;
          downloadLink.download = fileName;
          document.body.appendChild(downloadLink);
          downloadLink.click();
          document.body.removeChild(downloadLink);
        }
      } else {
        console.error(`Failed to download ${type}`);
      }
    } catch (error) {
      console.error(`Error downloading ${type}:`, error);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black relative px-6 py-8 flex flex-col items-center justify-center">
      {/* Top Left Logo */}
      <div className="absolute top-6 left-6">
        <img src={logo} alt="Voting App Logo" className="w-16 h-16" />
      </div>

      {/* Center Content */}
      <div className="text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold text-green-500 tracking-wider">
          Thank You for Voting!
        </h1>
        <p className="text-lg md:text-xl text-black max-w-xl mx-auto">
          Your vote has been recorded successfully. Together, we shape the future. 🗳️
        </p>

        {/* Buttons */}
        <div className="space-y-4 mt-8 flex flex-col items-center">
          <button
            onClick={() => handleDownload('receipt')}
            className="w-64 py-3 border border-green-500 text-green-500 hover:bg-green-500 hover:text-black transition duration-300 rounded-full"
          >
            Download Vote Receipt
          </button>

          <button
            onClick={() => handleDownload('certificate')}
            className="w-64 py-3 border border-green-500 text-green-500 hover:bg-green-500 hover:text-black transition duration-300 rounded-full"
          >
            Download Voting Certificate
          </button>

          <button
            onClick={() => navigate('/select')}
            className="w-64 py-3 border border-black-500 text-black hover:bg-black hover:text-white transition duration-300 rounded-full"
          >
            Exit to Main Menu
          </button>

          {/* Give Feedback Button */}
          <button
            onClick={() => navigate('/feedback')}
            className="w-64 py-3 border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition duration-300 rounded-full"
          >
            Give Feedback
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
