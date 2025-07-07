import React from 'react';
import { Briefcase } from 'lucide-react';

const Header = () => {
  return (
    <div className="text-center mb-12 animate-fade-in">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full mb-4 shadow-lg">
        <Briefcase className="w-8 h-8 text-white" />
      </div>
      <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
        Work Experience Tracker
      </h1>
      <p className="text-gray-600 text-lg">Track and showcase your professional journey</p>
    </div>
  );
};

export default Header;