import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Home, 
  PlusSquare, 
  BarChart, 
  ArrowRightLeft, 
  Flag, 
  AlignVerticalSpaceAround 
} from 'lucide-react';

const Homexx = () => {
  const departments = ['CSE', 'ISE', 'ECE', 'EEE', 'Civil', 'Mech'];

  // Sidebar component
//   const Sidebar = () => {
//     const sidebarItems = [
//       { icon: <Home />, text: 'Home', link: '/' },
//       { icon: <PlusSquare />, text: 'Add Asset', link: '/add-asset' },
//       { icon: <BarChart />, text: 'Asset Allocation', link: '/asset-allocation' },
//       { icon: <ArrowRightLeft />, text: 'Transfer Asset', link: '/transfer-asset' },
//       { icon: <Flag />, text: 'Report Asset', link: '/report-asset' },
//       { icon: <AlignVerticalSpaceAround />, text: 'Reported Assets', link: '/reported-assets' }
//     ];

//     return (
//       <div className="w-64 bg-gray-800 text-white h-screen fixed left-0 top-0 pt-8 shadow-lg">
//         <div className="px-4 mb-8">
//           <h2 className="text-2xl font-bold text-center">DASHBOARD</h2>
//         </div>
//         <nav>
//           {sidebarItems.map((item, index) => (
//             <a 
//               key={index} 
//               href={item.link} 
//               className="flex items-center p-4 hover:bg-gray-700 transition-colors duration-200"
//             >
//               <span className="mr-3">{item.icon}</span>
//               {item.text}
//             </a>
//           ))}
//         </nav>
//       </div>
//     );
//   };

  // Main HomePage component with state management
  const HomePage = () => {
    const [activeDepartment, setActiveDepartment] = useState(null);
    const [assets, setAssets] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch assets when a department is selected
    useEffect(() => {
      const fetchAssetsByDepartment = async () => {
        if (!activeDepartment) {
          setAssets([]);
          return;
        }

        setLoading(true);
        setError(null);

        try {
          const response = await axios.get(`http://localhost:3000/assets/department/${activeDepartment}`);
          setAssets(response.data);
        } catch (err) {
          setError('Failed to fetch assets. Please try again later.');
          setAssets([]);
        } finally {
          setLoading(false);
        }
      };

      fetchAssetsByDepartment();
    }, [activeDepartment]);  // Only re-run when activeDepartment changes

    return (
      <div className="ml-64 p-8">
        <h2 className="text-3xl font-bold mb-6">Welcome to the Asset Tracking System</h2>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Click on a Department to View Asset Breakdown:</h3>
          <div className="grid grid-cols-3 gap-4">
            {departments.map((dept) => (
              <button 
                key={dept}
                onClick={() => setActiveDepartment(dept === activeDepartment ? null : dept)}
                className={`p-4 rounded-lg transition-all duration-300 ${
                  activeDepartment === dept 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 hover:bg-blue-100'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>

          {loading && (
            <p className="mt-6 text-blue-600">
              Loading assets for {activeDepartment}...
            </p>
          )}

          {error && (
            <p className="mt-6 text-red-600">{error}</p>
          )}

          {activeDepartment && !loading && !error && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="text-lg font-medium mb-2">
                Asset Breakdown for {activeDepartment}
              </h4>
              <div className="grid grid-cols-1 gap-4">
                {assets.length > 0 ? (
                  assets.map((asset) => (
                    <div 
                      key={asset.asset_id} 
                      className="p-4 border border-gray-300 rounded-md"
                    >
                      <h5 className="font-bold">
                        {asset.asset_id} - {asset.asset_type}
                      </h5>
                      <p><strong>Brand:</strong> {asset.brand}</p>
                      <p><strong>Location:</strong> {asset.location}</p>
                      <p><strong>Employee Name:</strong> {asset.employee_name}</p>
                      <p><strong>Status:</strong> {asset.status}</p>
                    </div>
                  ))
                ) : (
                  <p>No assets found for {activeDepartment}.</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* <Sidebar /> */}
      <HomePage />
    </div>
  );
};

export default Homexx;