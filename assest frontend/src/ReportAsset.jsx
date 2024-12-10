import React, { useState } from 'react';
import axios from 'axios';
import { SaveIcon, AlertCircle, CheckCircle } from 'lucide-react';

const ReportAsset = () => {
  const [asset, setAsset] = useState({
    asset_id: '',
    asset_type: '',
    brand: '',
    branch: '',
    location: '',
    employee_id: '',
    employee_name: '',
    department: '',
    problem_description: '',
    reported_by: '',
    contact_info: '',
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const departments = ['CSE', 'ISE', 'ECE', 'EEE', 'Civil', 'Mech'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAsset((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleReportAsset = async (e) => {
    e.preventDefault();

    try {
      // Send the POST request to the backend
      const response = await axios.post('http://localhost:3000/report-assets', asset);

      // Set success message and reset error
      setMessage(response.data.message);
      setError('');
      
      // Reset form after successful submission
      setAsset({
        asset_id: '',
        asset_type: '',
        brand: '',
        branch: '',
        location: '',
        employee_id: '',
        employee_name: '',
        department: '',
        problem_description: '',
        reported_by: '',
        contact_info: '',
      });
    } catch (error) {
      // Set error message
      setError(error.response?.data?.error || 'Error reporting asset. Please try again.');
      setMessage('');
    }
  };

  return (
    <div className="ml-64 p-8 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <div className="flex items-center mb-6">
          <SaveIcon className="mr-3 text-blue-600" size={32} />
          <h2 className="text-2xl font-bold text-gray-800">Report Asset</h2>
        </div>

        <form onSubmit={handleReportAsset} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Asset ID</label>
              <input
                type="text"
                name="asset_id"
                value={asset.asset_id}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Asset ID"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Asset Type</label>
              <input
                type="text"
                name="asset_type"
                value={asset.asset_type}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Asset Type"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
              <input
                type="text"
                name="brand"
                value={asset.brand}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Brand"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Branch</label>
              <input
                type="text"
                name="branch"
                value={asset.branch}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Branch"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <input
                type="text"
                name="location"
                value={asset.location}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Location"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Employee ID</label>
              <input
                type="text"
                name="employee_id"
                value={asset.employee_id}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Employee ID"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Employee Name</label>
              <input
                type="text"
                name="employee_name"
                value={asset.employee_name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Employee Name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
              <select
                name="department"
                value={asset.department}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">--Select Department--</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Problem Description</label>
              <textarea
                name="problem_description"
                value={asset.problem_description}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Describe the problem"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Reported By</label>
              <input
                type="text"
                name="reported_by"
                value={asset.reported_by}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Your Name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Contact Info</label>
              <input
                type="text"
                name="contact_info"
                value={asset.contact_info}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Contact Info"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="submit"
              className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <SaveIcon className="mr-2" size={20} />
              Report Asset
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

export default ReportAsset;
