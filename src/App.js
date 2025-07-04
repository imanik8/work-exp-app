import React, { useState } from 'react';
import Header from './components/Header';
import ExperienceForm from './components/ExperienceForm';
import ExperienceList from './components/ExperienceList';
import TotalExperience from './components/TotalExperience';
import DeleteConfirmationModal from './components/DeleteConfirmationModal';
import useExperienceCalculator from './hooks/useExperienceCalculator';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.css';

function App() {
  const [experiences, setExperiences] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState(null);
  const totalExperience = useExperienceCalculator(experiences);

  const addExperience = (newExperience) => {
    setExperiences([
      ...experiences,
      {
        id: Date.now(),
        ...newExperience
      }
    ]);
  };

  const handleDeleteClick = (experience) => {
    setSelectedExperience(experience);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setExperiences(experiences.filter(exp => exp.id !== selectedExperience.id));
    setShowDeleteModal(false);
  };

  return (
    <div className="app-container">
      <Header />
      <div className="container">
        <TotalExperience total={totalExperience} />
        <ExperienceForm addExperience={addExperience} />
        <ExperienceList 
          experiences={experiences} 
          deleteExperience={handleDeleteClick} 
        />
      </div>
      
      <DeleteConfirmationModal 
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
        company={selectedExperience?.company || ''}
      />
    </div>
  );
}

export default App;