import React, { useState, useEffect } from "react";
import axios from "axios";

const AllocationDetails = ({ allocationId }) => {
  const [allocations, setAllocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllocations = async () => {
      setLoading(true);
      setError(null);

      try {
        const url = allocationId
          ? `http://localhost:3000/allocated-assets?allocation_id=${allocationId}`
          : `http://localhost:3000/allocated-assets`;
        const response = await axios.get(url);

        if (response.data) {
          setAllocations(response.data);
        } else {
          setAllocations([]);
        }
      } catch (err) {
        setError(
          err.response?.data?.message ||
          err.message ||
          "Error fetching allocation details."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAllocations();
  }, [allocationId]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div
        className="w-full max-w-4xl p-6 bg-white rounded shadow-md overflow-x-auto"
        style={{ marginLeft: "50px" }}
      >
        <h2 className="text-2xl font-bold mb-4 text-center">
          Asset Allocation Details
        </h2>

        {loading && <p className="text-blue-500">Loading allocation details...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}
        {!loading && !error && allocations.length === 0 && (
          <p className="text-gray-600">No allocation details found.</p>
        )}

        {!loading && allocations.length > 0 && (
          <table className="table-auto border-collapse w-full">
            <thead>
              <tr>
                <th className="border px-4 py-2">Allocation ID</th>
                <th className="border px-4 py-2">Asset ID</th>
                <th className="border px-4 py-2">Asset Type</th>
                <th className="border px-4 py-2">Brand</th>
                <th className="border px-4 py-2">Employee Name</th>
                <th className="border px-4 py-2">Department</th>
                <th className="border px-4 py-2">Location Type</th>
                <th className="border px-4 py-2">Branch</th>
                <th className="border px-4 py-2">Classroom/Lab</th>
                <th className="border px-4 py-2">Allocation Date</th>
              </tr>
            </thead>
            <tbody>
              {allocations.map((allocation) => (
                <tr key={allocation.allocation_id}>
                  <td className="border px-4 py-2">{allocation.allocation_id}</td>
                  <td className="border px-4 py-2">{allocation.asset_id}</td>
                  <td className="border px-4 py-2">{allocation.asset_type}</td>
                  <td className="border px-4 py-2">{allocation.brand}</td>
                  <td className="border px-4 py-2">{allocation.employee_name}</td>
                  <td className="border px-4 py-2">{allocation.department}</td>
                  <td className="border px-4 py-2">{allocation.location_type}</td>
                  <td className="border px-4 py-2">{allocation.branch}</td>
                  <td className="border px-4 py-2">
                    {allocation.classroom_lab_name}
                  </td>
                  <td className="border px-4 py-2">
                    {new Date(allocation.allocation_date).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AllocationDetails;
