import React from 'react';
import { Card, Badge, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { FaTrash } from 'react-icons/fa';
import { formatDate, calculateDuration } from '../utils/dateUtils';

const ExperienceCard = ({ experience, index, onDelete }) => {
  const { 
    company, 
    position, 
    location, 
    startYear, 
    startMonth, 
    endYear, 
    endMonth, 
    isCurrent,
    achievements
  } = experience;
  
  const { years, months } = calculateDuration(
    startYear, 
    startMonth, 
    endYear, 
    endMonth, 
    isCurrent
  );
  
  const durationString = 
    (years > 0 ? `${years} ${years === 1 ? 'year' : 'years'}` : '') +
    (months > 0 ? ` ${months} ${months === 1 ? 'month' : 'months'}` : '');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="mb-4"
    >
      <Card className="glass-card border-0 overflow-hidden">
        <Card.Body>
          <div className="d-flex justify-content-between">
            <div>
              <Card.Title className="text-white fw-bold">{position}</Card.Title>
              <Card.Subtitle className="mb-2 text-light">
                {company} • {location}
              </Card.Subtitle>
            </div>
            <Button 
              variant="danger" 
              size="sm" 
              onClick={() => onDelete(experience)}
              className="glass-btn align-self-start"
            >
              <FaTrash />
            </Button>
          </div>
          
          <div className="d-flex align-items-center mt-2 mb-3">
            <Badge bg="light" text="dark" className="me-2">
              {formatDate(startYear, startMonth)} - {isCurrent ? 'Present' : formatDate(endYear, endMonth)}
            </Badge>
            <Badge bg="info">
              {durationString}
            </Badge>
            {isCurrent && <Badge bg="success" className="ms-2">Current</Badge>}
          </div>
          
          {achievements.length > 0 && (
            <div className="mt-3">
              <h6 className="text-white">Achievements:</h6>
              <ul className="text-light">
                {achievements.map((achievement, i) => (
                  <li key={i}>{achievement}</li>
                ))}
              </ul>
            </div>
          )}
        </Card.Body>
      </Card>
    </motion.div>
  );
};

export default ExperienceCard;