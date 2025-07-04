import React from 'react';
import ExperienceCard from './ExperienceCard';
import { motion } from 'framer-motion';

const ExperienceList = ({ experiences, deleteExperience }) => {
  if (experiences.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
    >
      <h3 className="text-white mb-4">Your Experience</h3>
      {experiences.map((exp, index) => (
        <ExperienceCard 
          key={exp.id} 
          experience={exp} 
          index={index}
          onDelete={deleteExperience} 
        />
      ))}
    </motion.div>
  );
};

export default ExperienceList;