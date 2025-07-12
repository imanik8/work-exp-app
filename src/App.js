import React from 'react';
import useExperience from './hooks/useExperience';
import Header from './components/layout/Header';
import EmptyState from './components/layout/EmptyState';
import SummaryCard from './components/cards/SummaryCard';
import ExperienceCard from './components/cards/ExperienceCard';
import ExperienceForm from './components/forms/ExperienceForm';
import Button from './components/common/Button';
import { Plus } from 'lucide-react';

const App = () => {
  const { experiences, showForm, addExperience, removeExperience, toggleForm } = useExperience();

  return (
    <div className="min-h-screen bg-gradient-to-br from-linkedin-50 via-white to-linkedin-100">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Header />
        
        <SummaryCard experiences={experiences} />

        {showForm && (
          <ExperienceForm
            onSubmit={addExperience}
            onCancel={toggleForm}
            showCancel={experiences.length > 0}
          />
        )}

        {experiences.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800">Your Work Experience</h2>
              {!showForm && (
                <Button onClick={toggleForm}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Experience
                </Button>
              )}
            </div>

            {experiences.map((exp, index) => (
              <ExperienceCard
                key={exp.id}
                experience={exp}
                onRemove={removeExperience}
                index={index}
              />
            ))}
          </div>
        )}

        {experiences.length === 0 && !showForm && (
          <EmptyState onAddExperience={toggleForm} />
        )}
      </div>
    </div>
  );
};

export default App;