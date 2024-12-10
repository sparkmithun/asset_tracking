import React, { useState } from 'react';
import axios from 'axios';
import { SaveIcon, AlertCircle, CheckCircle } from 'lucide-react';

const TransferAsset = () => {
  const [asset, setAsset] = useState({
    asset_id: '',
    status: 'active',
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAsset((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleTransferAsset = async (e) => {
    e.preventDefault();

    try {
      // Send the POST request to the backend
      const response = await axios.post('http://localhost:3000/transfer-asset', asset);

      // Set success message and reset error
      setMessage(response.data.message);
      setError('');
      
      // Reset form after successful submission
      setAsset({
        asset_id: '',
        status: 'active',
      });
    } catch (error) {
      // Set error message
      setError(error.response?.data?.error || 'Error transferring asset. Please try again.');
      setMessage('');
    }
  };

  return (
    <div className="ml-64 p-8 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <div className="flex items-center mb-6">
          <SaveIcon className="mr-3 text-blue-600" size={32} />
          <h2 className="text-2xl font-bold text-gray-800">Transfer Asset</h2>
        </div>

        <form onSubmit={handleTransferAsset} className="space-y-6">
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                name="status"
                value={asset.status}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="depricated">Deprecated</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="submit"
              className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <SaveIcon className="mr-2" size={20} />
              Transfer Asset
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

export default TransferAsset;
