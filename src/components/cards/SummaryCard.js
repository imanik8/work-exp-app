import React from 'react';
import { Clock } from 'lucide-react';
import { getTotalExperience } from '../../utils/dateUtils';

const SummaryCard = ({ experiences }) => {
  if (experiences.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-100 animate-slide-up">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="bg-gradient-to-r from-green-400 to-emerald-500 p-3 rounded-full">
            <Clock className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800">Total Experience</h3>
            <p className="text-3xl font-bold bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
              {getTotalExperience(experiences)}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-gray-500">Companies Worked</p>
          <p className="text-2xl font-bold text-gray-800">{experiences.length}</p>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;