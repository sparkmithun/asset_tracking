import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { 
  Search, 
  RefreshCw, 
  Filter, 
  AlertTriangle 
} from 'lucide-react';

const ReportedAssets = () => {
  const [reportedAssets, setReportedAssets] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useState({
    asset_id: '',
    department: '',
    employee_name: '',
    branch: ''
  });

  // Fetch reported assets
  useEffect(() => {
    const fetchReportedAssets = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:3000/reported-assets');
        // Remove duplicates using Set with unique identifier
        const uniqueAssets = Array.from(
          new Map(response.data.map(asset => [asset.asset_id, asset])).values()
        );
        setReportedAssets(uniqueAssets);
        setError(null);
      } catch (err) {
        setError('Failed to fetch reported assets. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchReportedAssets();
  }, []);

  // Memoized filtering of assets with exact matching
  const filteredAssets = useMemo(() => {
    return reportedAssets.filter(asset => 
      (searchParams.asset_id === '' || 
       asset.asset_id.toLowerCase() === searchParams.asset_id.toLowerCase()) &&
      (searchParams.department === '' || 
       asset.department.toLowerCase() === searchParams.department.toLowerCase()) &&
      (searchParams.employee_name === '' || 
       asset.employee_name.toLowerCase() === searchParams.employee_name.toLowerCase()) &&
      (searchParams.branch === '' || 
       asset.branch.toLowerCase() === searchParams.branch.toLowerCase())
    );
  }, [reportedAssets, searchParams]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Reset search filters
  const handleResetFilters = () => {
    setSearchParams({
      asset_id: '',
      department: '',
      employee_name: '',
      branch: ''
    });
  };

  // Render loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen pl-64">
        <div className="animate-spin">
          <RefreshCw size={48} className="text-blue-500" />
        </div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen p-4 pl-64">
        <div className="text-center bg-red-50 p-8 rounded-lg border border-red-200">
          <AlertTriangle size={48} className="text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-red-700">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full pl-64 p-6 box-border overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold flex items-center">
            <Filter className="mr-3 text-blue-600" />
            Reported Assets
          </h2>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="text"
              name="asset_id"
              placeholder="Asset ID"
              value={searchParams.asset_id}
              onChange={handleInputChange}
              className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <input
              type="text"
              name="department"
              placeholder="Department"
              value={searchParams.department}
              onChange={handleInputChange}
              className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <input
              type="text"
              name="employee_name"
              placeholder="Employee Name"
              value={searchParams.employee_name}
              onChange={handleInputChange}
              className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <input
              type="text"
              name="branch"
              placeholder="Branch"
              value={searchParams.branch}
              onChange={handleInputChange}
              className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
          <div className="flex justify-between items-center mt-4">
            <button 
              onClick={handleResetFilters}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition-colors"
            >
              Reset Filters
            </button>
            <div className="text-gray-500">
              Showing {filteredAssets.length} of {reportedAssets.length} assets
            </div>
          </div>
        </div>

        {/* Assets List */}
        {filteredAssets.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAssets.map(asset => (
              <div 
                key={asset.asset_id} 
                className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-blue-600 mb-2">
                    Asset ID: {asset.asset_id}
                  </h3>
                  <p>
                    <strong>Department:</strong> {asset.department}
                  </p>
                  <p>
                    <strong>Employee Name:</strong> {asset.employee_name}
                  </p>
                  <p>
                    <strong>Branch:</strong> {asset.branch}
                  </p>
                  <p className="text-gray-600">
                    <strong>Problem Description:</strong> {asset.problem_description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center bg-gray-100 p-8 rounded-lg">
            <Search size={48} className="mx-auto mb-4 text-gray-400" />
            <p className="text-gray-600 text-xl">
              No reported assets found matching your search criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportedAssets;