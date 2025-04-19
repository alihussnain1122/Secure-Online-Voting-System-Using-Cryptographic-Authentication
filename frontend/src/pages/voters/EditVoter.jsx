import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditVoter = ({ voterId }) => {
  const [form, setForm] = useState({
    CNIC: '',
    voterID: '',
    name: '',
    phone: '',
    city: '',
    area: '',
    photo: null,
  });

  // Fetch existing voter data based on voterId
  useEffect(() => {
    const fetchVoterData = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`http://localhost:5000/api/voters/${voterId}`, {
          headers: {
            Authorization: token,
          },
        });
        setForm(res.data); // Pre-fill the form with the fetched data
      } catch (err) {
        console.error('Error fetching voter data:', err);
      }
    };

    if (voterId) {
      fetchVoterData();
    }
  }, [voterId]);

  const handleChange = async (e) => {
    const { name, value, files } = e.target;

    if (name === 'city') {
      setForm((prev) => ({ ...prev, city: value }));

      // Fetch area using OpenStreetMap Nominatim API
      try {
        const res = await fetch(`https://nominatim.openstreetmap.org/search?city=${value}&format=json`);
        const data = await res.json();
        if (data.length > 0) {
          const displayArea = data[0].display_name;
          setForm((prev) => ({ ...prev, area: displayArea }));
        } else {
          setForm((prev) => ({ ...prev, area: 'Area not found' }));
        }
      } catch (err) {
        console.error('Error fetching area from OSM:', err);
        setForm((prev) => ({ ...prev, area: 'Error fetching area' }));
      }
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: files ? files[0] : value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      Object.entries(form).forEach(([key, value]) => data.append(key, value));

      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/voters/${voterId}`, data, {
        headers: {
          Authorization: token,
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Voter updated successfully!');
    } catch (err) {
      console.error('Error updating voter:', err);
      if (err.response) {
        alert(`Error: ${err.response.data.message || 'Failed to update voter.'}`);
      } else {
        alert('Network error or server not responding.');
      }
    }
  };

  return (
    <div className="bg-blue-50 text-black min-h-screen py-10 px-6 relative">
      <div className="absolute top-4 left-4">
        <img src="/src/assets/evm-logo.png" alt="Logo" className="w-12 h-auto" />
      </div>

      <div className="text-center mb-4 mt-4">
        <h1 className="text-4xl font-extrabold text-blue-900">SadiVote</h1>
      </div>

      <div className="border border-blue-600 rounded-xl p-8 max-w-4xl mx-auto shadow-md">
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">Edit Voter Information</h2>
        <form onSubmit={handleSubmit} className="flex flex-wrap gap-6 justify-between">
          {['CNIC', 'voterID', 'name', 'phone', 'city'].map((field) => (
            <div key={field} className="flex-1 min-w-[250px]">
              <label htmlFor={field} className="block text-lg font-medium text-black">
                {field === 'CNIC' ? 'CNIC' :
                 field === 'voterID' ? 'Voter ID' :
                 field === 'name' ? 'Full Name' :
                 field === 'phone' ? 'Phone Number' : 'City'}
              </label>
              <input
                id={field}
                name={field}
                type="text"
                value={form[field] || ''}
                onChange={handleChange}
                className="w-full p-3 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={`Enter ${field}`}
                required
              />
            </div>
          ))}

          <div className="flex-1 min-w-[250px]">
            <label htmlFor="area" className="block text-lg font-medium text-black">Area (Auto-filled)</label>
            <input
              id="area"
              name="area"
              type="text"
              value={form.area || ''}
              readOnly
              className="w-full p-3 border bg-gray-100 border-gray-300 rounded-md"
            />
          </div>

          <div className="flex-1 min-w-[250px]">
            <label htmlFor="photo" className="block text-lg font-medium text-black">Upload Photo</label>
            <input
              id="photo"
              type="file"
              name="photo"
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>

          <div className="w-full">
            <button
              type="submit"
              className="w-full py-3 bg-blue-700 text-white font-bold rounded-md shadow-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Update Voter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditVoter;
