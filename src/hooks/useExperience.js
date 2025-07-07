import { useState } from 'react';

const useExperience = () => {
  const [experiences, setExperiences] = useState([]);
  const [showForm, setShowForm] = useState(true);

  const addExperience = (experienceData) => {
    const newExperience = {
      ...experienceData,
      id: Date.now(),
      achievements: experienceData.achievements.filter(achievement => achievement.trim() !== '')
    };
    setExperiences(prev => [...prev, newExperience]);
    setShowForm(false);
  };

  const removeExperience = (id) => {
    setExperiences(prev => prev.filter(exp => exp.id !== id));
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return {
    experiences,
    showForm,
    addExperience,
    removeExperience,
    toggleForm
  };
};

export default useExperience;