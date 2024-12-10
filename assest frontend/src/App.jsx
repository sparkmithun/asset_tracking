import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddAsset from './AddAsset';
import AssetAllocation from './AssetAllocation';
import TransferAsset from './TransferAsset';
import ReportAsset from './ReportAsset';
import ReportedAssets from './ReportedAssets';
import Homexx from './Home';
import Homepage from './Homepage';
import AllocationDetails from './AllocationDetails';

function App() {
  return (
    <Router>
      <div className="app">
        <main>
          <Routes>
            <Route path="/" element={<Homepage/>}>

              <Route index element={<Homexx/>} />
              <Route path="/add-asset" element={<AddAsset />} />
              <Route path="/asset-allocation" element={<AssetAllocation />} />
              <Route path="/allocation-details" element={<AllocationDetails />} />
              <Route path="/transfer-asset" element={<TransferAsset />} />
              <Route path="/report-asset" element={<ReportAsset />} />
              <Route path="/reported-assets" element={<ReportedAssets />} />
            </Route>
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;