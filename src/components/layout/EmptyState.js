import React from 'react';
import { Briefcase } from 'lucide-react';
import Button from '../common/Button';

const EmptyState = ({ onAddExperience }) => {
  return (
    <div className="text-center py-12 animate-fade-in">
      <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
        <Briefcase className="w-12 h-12 text-gray-400" />
      </div>
      <h3 className="text-xl font-semibold text-gray-600 mb-2">No Experience Added Yet</h3>
      <p className="text-gray-500 mb-6">Start building your professional timeline</p>
      <Button onClick={onAddExperience} size="lg">
        Add Your First Experience
      </Button>
    </div>
  );
};

export default EmptyState;