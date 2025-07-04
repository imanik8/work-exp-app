import React from 'react';
import { motion } from 'framer-motion';

const Header = () => (
  <motion.div 
    className="text-center py-5 fade-in"
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
  >
    <h1 className="display-4 fw-bold text-white">
      <span className="gradient-text">Work Experience Tracker</span>
    </h1>
    <p className="lead text-light opacity-75">
      Calculate your professional journey in one place
    </p>
  </motion.div>
);

export default Header;