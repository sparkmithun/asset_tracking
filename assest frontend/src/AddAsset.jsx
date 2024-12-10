import React, { useState } from 'react';
import axios from 'axios';
import { PlusSquare, SaveIcon, AlertCircle, CheckCircle } from 'lucide-react';

const AddAsset = () => {
  const [asset, setAsset] = useState({
    asset_type: '',
    brand: '',
    price: '',
    arrival_date: '',
    vendor_name: '',
    warranty_details: '',
    asset_id: '',
    department: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const departments = ['CSE', 'ISE', 'ECE', 'EEE', 'Civil', 'Mech'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAsset((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/assets', asset);
      setMessage('Asset added successfully!');
      setError('');
      setAsset({
        asset_type: '',
        brand: '',
        price: '',
        arrival_date: '',
        vendor_name: '',
        warranty_details: '',
        asset_id: '',
        department: ''
      });
    } catch (err) {
      setError('Error adding asset. Please try again.');
      setMessage('');
    }
  };

  return (
    <div className="ml-64 p-8 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <div className="flex items-center mb-6">
          <PlusSquare className="mr-3 text-blue-600" size={32} />
          <h2 className="text-2xl font-bold text-gray-800">Add New Asset</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Asset Type
              </label>
              <input
                type="text"
                name="asset_type"
                value={asset.asset_type}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter asset type"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Brand
              </label>
              <input
                type="text"
                name="brand"
                value={asset.brand}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter brand name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price
              </label>
              <input
                type="number"
                name="price"
                value={asset.price}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter price"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Arrival Date
              </label>
              <input
                type="date"
                name="arrival_date"
                value={asset.arrival_date}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vendor Name
              </label>
              <input
                type="text"
                name="vendor_name"
                value={asset.vendor_name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter vendor name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Department
              </label>
              <select
                name="department"
                value={asset.department}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">--Select Department--</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Asset ID
              </label>
              <input
                type="text"
                name="asset_id"
                value={asset.asset_id}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter unique asset ID"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Warranty Details
              </label>
              <textarea
                name="warranty_details"
                value={asset.warranty_details}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter warranty details"
              ></textarea>
            </div>
          </div>

          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="submit"
              className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <SaveIcon className="mr-2" size={20} />
              Add Asset
            </button>
          </div>
        </form>

        {message && (
          <div className="mt-4 flex items-center text-green-600">
            <CheckCircle className="mr-2" size={24} />
            {message}
          </div>
        )}
        {error && (
          <div className="mt-4 flex items-center text-red-600">
            <AlertCircle className="mr-2" size={24} />
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddAsset;