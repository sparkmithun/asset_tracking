import React, { useState } from 'react';
import axios from 'axios';
import { BarChart2, SaveIcon, AlertCircle, CheckCircle } from 'lucide-react';

const AssetAllocation = () => {
  const [allocation, setAllocation] = useState({
    asset_id: '',
    asset_type: '',
    brand: '',
    employee_id: '',
    employee_name: '',
    department: '',
    location_type: '',
    branch: '',
    classroom_lab_name: '',
    allocation_date: '',
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const departments = ['CSE', 'ISE', 'ECE', 'EEE', 'Civil', 'Mech'];
  const locationTypes = ['Classroom', 'Lab', 'Office', 'Library'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAllocation((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/allocate-asset', allocation);
      setMessage('Asset allocated successfully!');
      setError('');
      setAllocation({
        asset_id: '',
        asset_type: '',
        brand: '',
        employee_id: '',
        employee_name: '',
        department: '',
        location_type: '',
        branch: '',
        classroom_lab_name: '',
        allocation_date: '',
      });
    } catch (err) {
      setError('Error allocating asset. Please try again.');
      setMessage('');
    }
  };

  return (
    <div className="ml-64 p-8 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <div className="flex items-center mb-6">
          <BarChart2 className="mr-3 text-blue-600" size={32} />
          <h2 className="text-2xl font-bold text-gray-800">Asset Allocation</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Asset ID
              </label>
              <input
                type="text"
                name="asset_id"
                value={allocation.asset_id}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Asset ID"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Asset Type
              </label>
              <input
                type="text"
                name="asset_type"
                value={allocation.asset_type}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Asset Type"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Brand
              </label>
              <input
                type="text"
                name="brand"
                value={allocation.brand}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Brand"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Employee ID
              </label>
              <input
                type="text"
                name="employee_id"
                value={allocation.employee_id}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Employee ID"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Employee Name
              </label>
              <input
                type="text"
                name="employee_name"
                value={allocation.employee_name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Employee Name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Department
              </label>
              <select
                name="department"
                value={allocation.department}
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location Type
              </label>
              <select
                name="location_type"
                value={allocation.location_type}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">--Select Location Type--</option>
                {locationTypes.map((location) => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Branch
              </label>
              <input
                type="text"
                name="branch"
                value={allocation.branch}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Branch"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Classroom/Lab Name
              </label>
              <input
                type="text"
                name="classroom_lab_name"
                value={allocation.classroom_lab_name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Classroom/Lab Name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Allocation Date
              </label>
              <input
                type="date"
                name="allocation_date"
                value={allocation.allocation_date}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="submit"
              className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <SaveIcon className="mr-2" size={20} />
              Allocate Asset
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

export default AssetAllocation;