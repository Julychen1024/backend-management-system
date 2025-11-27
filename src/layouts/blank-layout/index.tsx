import React from 'react';

interface BlankLayoutProps {
  children?: React.ReactNode;
}

const BlankLayout: React.FC<BlankLayoutProps> = ({ children }) => {
  return <div className="min-h-screen bg-gray-50">{children}</div>;
};

export default BlankLayout;
