import React from 'react';
import { motion } from 'framer-motion';

const TotalExperience = ({ total }) => {
  const { years, months } = total;
  
  const totalString = 
    (years > 0 ? `${years} ${years === 1 ? 'year' : 'years'}` : '') +
    (months > 0 ? ` ${months} ${months === 1 ? 'month' : 'months'}` : '');
  
  return (
    <motion.div 
      className="glass-card p-4 mb-5 text-center fade-in"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h5 className="text-light mb-2">Total Professional Experience</h5>
      <motion.div 
        className="display-4 fw-bold text-white"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
      >
        {totalString || '0 months'}
      </motion.div>
      <div className="text-light opacity-75 mt-2">
        {years > 0 && (
          <span>{years} {years === 1 ? 'year' : 'years'} </span>
        )}
        {months > 0 && (
          <span>{months} {months === 1 ? 'month' : 'months'}</span>
        )}
      </div>
    </motion.div>
  );
};

export default TotalExperience;