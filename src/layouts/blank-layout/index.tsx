import React from 'react';
import { Outlet } from 'react-router';

const BlankLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Outlet></Outlet>
    </div>
  );
};

export default BlankLayout;
