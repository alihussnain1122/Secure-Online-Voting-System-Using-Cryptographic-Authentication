// ReviewFeedback.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ReviewFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get('/api/feedbacks'); // API endpoint
        setFeedbacks(response.data.feedbacks);
        setLoading(false);
      } catch { 
        setError('Failed to fetch feedbacks.');
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  if (loading) {
    return <div>Loading feedback...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Review Feedback</h1>

      <div className="bg-white rounded-lg shadow-md p-6">
        {feedbacks.length === 0 ? (
          <p>No feedback available</p>
        ) : (
          <ul>
            {feedbacks.map((feedback) => (
              <li key={feedback._id} className="border-b py-4">
                <p className="text-xl font-semibold">{feedback.voterId.name}</p>
                <p className="text-gray-600">{feedback.feedbackText}</p>
                <p className="text-sm text-gray-400">{new Date(feedback.submittedAt).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ReviewFeedback;
