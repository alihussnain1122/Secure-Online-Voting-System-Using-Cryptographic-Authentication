import React, { useState, useEffect } from "react";
import axios from "axios";

const FeedBack = () => {
  const [userData, setUserData] = useState(null); // To store logged-in user's data
  const [feedback, setFeedback] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  // Fetch user data from backend when the component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/user/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming JWT token is stored in localStorage
          },
        });
        setUserData(response.data); // Set the user data
      } catch (error) {
        console.error("Error fetching user data:", error);
        setResponseMessage("Error fetching user details. Please try again.");
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    setFeedback(e.target.value); // Update feedback
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!feedback.trim()) {
      setResponseMessage("Feedback cannot be empty.");
      return;
    }

    const feedbackData = {
      feedback,
      userId: userData?.id, // Assuming 'id' is the user's unique identifier
    };

    try {
      const response = await axios.post("http://localhost:5000/api/feedback", feedbackData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setResponseMessage(response.data.message || "Feedback submitted successfully!");
      setFeedback(""); // Clear the feedback field
    } catch (error) {
        console.error("Error submitting feedback:", error); // Log error details for debugging
      
        // Check if the error response has a specific message (e.g., from the backend)
        if (error.response && error.response.data && error.response.data.message) {
          setResponseMessage(error.response.data.message); // Display specific error message from backend
        } else {
          setResponseMessage("An unexpected error occurred while submitting your feedback. Please try again later.");
        }
      }
      
  };

  if (!userData) {
    return <div>Loading...</div>; // Show a loading state until user data is fetched
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Feedback Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Your Feedback:</label>
          <textarea
            name="feedback"
            value={feedback}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Submit Feedback</button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};

export default FeedBack;
