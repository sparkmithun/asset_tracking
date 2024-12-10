import React from 'react';
import { 
  Home, 
  PlusSquare, 
  BarChart, 
  ArrowRightLeft, 
  Flag, 
  AlignVerticalSpaceAround 
} from 'lucide-react';

const Sidebar = () => {
    const sidebarItems = [
      { icon: <Home />, text: 'Home', link: '/' },
      { icon: <PlusSquare />, text: 'Add Asset', link: '/add-asset' },
      { icon: <BarChart />, text: 'Asset Allocation', link: '/asset-allocation' },
      { icon: <BarChart />, text: 'Allocation Details', link: '/allocation-details' },
      { icon: <ArrowRightLeft />, text: 'Transfer Asset', link: '/transfer-asset' },
      { icon: <Flag />, text: 'Report Asset', link: '/report-asset' },
      { icon: <AlignVerticalSpaceAround />, text: 'Reported Assets', link: '/reported-assets' }
    ];

    return (
      <div className="w-64 bg-gray-800 text-white h-screen fixed left-0 top-0 pt-8 shadow-lg">
        <div className="px-4 mb-8">
          <h2 className="text-2xl font-bold text-center">DASHBOARD</h2>
        </div>
        <nav>
          {sidebarItems.map((item, index) => (
            <a 
              key={index} 
              href={item.link} 
              className="flex items-center p-4 hover:bg-gray-700 transition-colors duration-200"
            >
              <span className="mr-3">{item.icon}</span>
              {item.text}
            </a>
          ))}
        </nav>
      </div>
    );
};

export default Sidebar;