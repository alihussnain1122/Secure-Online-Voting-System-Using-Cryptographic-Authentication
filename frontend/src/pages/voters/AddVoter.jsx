import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddVoter = () => {
  const [form, setForm] = useState({
    CNIC: '',
    voterID: '',
    name: '',
    phone: '',
    city: '',
    area: '',
    photo: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

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
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const data = new FormData();
      Object.entries(form).forEach(([key, value]) => data.append(key, value));

      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/auth/register', data, {
        headers: {
          Authorization: token,
          'Content-Type': 'multipart/form-data',
        },
      });

      setSuccess('Voter added successfully!');
      setForm({
        CNIC: '',
        voterID: '',
        name: '',
        phone: '',
        city: '',
        area: '',
        photo: null,
      });

      setTimeout(() => {
        navigate('/voter/list');  // Navigate to a voter list page or dashboard
      }, 1500);
    } catch (err) {
      setError('Error adding voter. Please try again.');
      console.error('Error adding voter:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-green-50 text-black min-h-screen py-10 px-6 relative">
      <div className="absolute top-4 left-4">
        <img src="/src/assets/evm-logo.png" alt="Logo" className="w-12 h-auto" />
      </div>

      <div className="text-center mb-4 mt-4">
        <h1 className="text-4xl font-extrabold text-green-900">SadiVote</h1>
      </div>

      <div className="border border-green-600 rounded-xl p-8 max-w-4xl mx-auto shadow-md">
        <h2 className="text-2xl font-bold text-center text-green-600 mb-6">Add New Voter</h2>
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
                value={form[field]}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
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
              value={form.area}
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

          {error && <p className="text-red-600 text-sm text-center">{error}</p>}
          {success && <p className="text-green-700 text-sm text-center">{success}</p>}

          <div className="w-full">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-green-600 text-white font-bold rounded-md shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {loading ? 'Adding Voter...' : 'Add Voter'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddVoter;
