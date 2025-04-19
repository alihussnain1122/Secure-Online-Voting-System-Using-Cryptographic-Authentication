import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CastVote = () => {
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const navigate = useNavigate();

  // Fetch candidates from backend (you can replace the API with your actual backend)
  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/candidates');
        setCandidates(response.data);
      } catch (error) {
        console.error('Error fetching candidates:', error);
      }
    };

    fetchCandidates();
  }, []);

  const handleVoteSubmit = async () => {
    if (selectedCandidate) {
      try {
        // Send the vote to the backend (replace with your actual voting API)
        await axios.post('http://localhost:5000/api/vote', { candidateId: selectedCandidate.id });
        console.log(`Vote cast for: ${selectedCandidate.name}`);
        navigate('/thank-you');  // Redirect to Thank You page after voting
      } catch (error) {
        console.error('Error casting vote:', error);
        alert('Error casting your vote. Please try again later.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 relative">
      
      {/* Top Logo Section */}
      <div className="absolute top-6 left-6">
        <img src="/src/assets/evm-logo.png" alt="Logo" className="h-12 w-auto" />
      </div>

      {/* Title */}
      <div className="text-center mb-8 mt-20">
        <h1 className="text-4xl font-bold text-[#009639]">PakRaaz</h1>
      </div>

      {/* Beautiful Welcome Text */}
      <div className="text-center mb-6">
        <p className="text-xl font-semibold text-gray-800">We value your voice!</p>
        <p className="text-lg text-gray-600">Please take a moment to cast your vote and make a difference.</p>
      </div>

      {/* Vote Card */}
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-lg space-y-6 mb-10">
        <h2 className="text-2xl font-semibold text-gray-800">Choose Your Candidate</h2>

        <div className="space-y-4">
          {candidates.length > 0 ? (
            candidates.map((candidate) => (
              <div key={candidate.id} className="flex items-center space-x-4">
                <input
                  type="radio"
                  id={candidate.id}
                  name="candidate"
                  value={candidate.id}
                  className="h-6 w-6 accent-[#009639] border-2 border-gray-400"
                  onChange={() => setSelectedCandidate(candidate)}
                />
                <label htmlFor={candidate.id} className="text-lg text-gray-700">
                  {candidate.name} <span className="text-sm text-gray-500">({candidate.party})</span>
                </label>
              </div>
            ))
          ) : (
            <p className="text-lg text-gray-500">No candidates available.</p>
          )}
        </div>
      </div>

      {/* Submit button */}
      <button
        className={`px-8 py-4 bg-[#009639] text-white text-xl rounded-full shadow-md hover:bg-[#006d32] transition duration-300 transform ${!selectedCandidate ? 'cursor-not-allowed opacity-50' : 'hover:scale-105'}`}
        onClick={handleVoteSubmit}
        disabled={!selectedCandidate}  // Disable button if no candidate is selected
      >
        Submit Vote
      </button>
    </div>
  );
};

export default CastVote;
