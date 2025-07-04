import React, { useState } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { FaPlus, FaTrash } from 'react-icons/fa';

const ExperienceForm = ({ addExperience }) => {
  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [location, setLocation] = useState('');
  const [startYear, setStartYear] = useState(new Date().getFullYear());
  const [startMonth, setStartMonth] = useState(0);
  const [endYear, setEndYear] = useState(new Date().getFullYear());
  const [endMonth, setEndMonth] = useState(0);
  const [isCurrent, setIsCurrent] = useState(false);
  const [achievements, setAchievements] = useState(['']);
  const [validated, setValidated] = useState(false);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const years = Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    
    if (form.checkValidity()) {
      addExperience({
        company,
        position,
        location,
        startYear,
        startMonth,
        endYear: isCurrent ? null : endYear,
        endMonth: isCurrent ? null : endMonth,
        isCurrent,
        achievements: achievements.filter(a => a.trim() !== '')
      });
      
      // Reset form
      setCompany('');
      setPosition('');
      setLocation('');
      setAchievements(['']);
      setValidated(false);
    } else {
      setValidated(true);
    }
  };

  const addAchievement = () => {
    setAchievements([...achievements, '']);
  };

  const removeAchievement = (index) => {
    if (achievements.length > 1) {
      const newAchievements = [...achievements];
      newAchievements.splice(index, 1);
      setAchievements(newAchievements);
    }
  };

  const handleAchievementChange = (index, value) => {
    const newAchievements = [...achievements];
    newAchievements[index] = value;
    setAchievements(newAchievements);
  };

  return (
    <motion.div 
      className="glass-card p-4 mb-5 slide-up"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <h3 className="text-white mb-4">Add Work Experience</h3>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} md={6} controlId="company">
            <Form.Label className="text-light">Company</Form.Label>
            <Form.Control
              required
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="glass-input"
            />
          </Form.Group>
          
          <Form.Group as={Col} md={6} controlId="position">
            <Form.Label className="text-light">Position</Form.Label>
            <Form.Control
              required
              type="text"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              className="glass-input"
            />
          </Form.Group>
        </Row>
        
        <Form.Group className="mb-3" controlId="location">
          <Form.Label className="text-light">Location</Form.Label>
          <Form.Control
            required
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="glass-input"
          />
        </Form.Group>
        
        <Row className="mb-3">
          <Form.Group as={Col} md={6} controlId="startDate">
            <Form.Label className="text-light">Start Date</Form.Label>
            <Row>
              <Col>
                <Form.Select 
                  value={startMonth}
                  onChange={(e) => setStartMonth(parseInt(e.target.value))}
                  className="glass-input"
                >
                  {months.map((month, index) => (
                    <option key={index} value={index}>{month}</option>
                  ))}
                </Form.Select>
              </Col>
              <Col>
                <Form.Select 
                  value={startYear}
                  onChange={(e) => setStartYear(parseInt(e.target.value))}
                  className="glass-input"
                >
                  {years.map((year) => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </Form.Select>
              </Col>
            </Row>
          </Form.Group>
          
          <Form.Group as={Col} md={6} controlId="endDate">
            <Form.Label className="text-light">
              End Date {isCurrent && <span className="badge bg-success ms-2">Current</span>}
            </Form.Label>
            {!isCurrent ? (
              <Row>
                <Col>
                  <Form.Select 
                    value={endMonth}
                    onChange={(e) => setEndMonth(parseInt(e.target.value))}
                    className="glass-input"
                  >
                    {months.map((month, index) => (
                      <option key={index} value={index}>{month}</option>
                    ))}
                  </Form.Select>
                </Col>
                <Col>
                  <Form.Select 
                    value={endYear}
                    onChange={(e) => setEndYear(parseInt(e.target.value))}
                    className="glass-input"
                  >
                    {years.map((year) => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </Form.Select>
                </Col>
              </Row>
            ) : (
              <div className="text-light py-2">Present</div>
            )}
          </Form.Group>
        </Row>
        
        <Form.Group className="mb-3" controlId="isCurrent">
          <Form.Check 
            type="checkbox"
            label="I currently work here"
            checked={isCurrent}
            onChange={(e) => setIsCurrent(e.target.checked)}
            className="text-light"
          />
        </Form.Group>
        
        <div className="mb-4">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <Form.Label className="text-light">Achievements</Form.Label>
            <Button 
              variant="outline-light" 
              size="sm" 
              onClick={addAchievement}
              className="glass-btn"
            >
              <FaPlus /> Add
            </Button>
          </div>
          
          {achievements.map((achievement, index) => (
            <div key={index} className="d-flex align-items-center mb-2">
              <Form.Control
                value={achievement}
                onChange={(e) => handleAchievementChange(index, e.target.value)}
                className="glass-input me-2"
                placeholder={`Achievement #${index + 1}`}
              />
              <Button 
                variant="danger" 
                onClick={() => removeAchievement(index)}
                disabled={achievements.length <= 1}
                className="glass-btn"
              >
                <FaTrash />
              </Button>
            </div>
          ))}
        </div>
        
        <div className="d-grid">
          <Button 
            variant="primary" 
            type="submit"
            className="glass-btn py-3 fw-bold"
          >
            Add Experience
          </Button>
        </div>
      </Form>
    </motion.div>
  );
};

export default ExperienceForm;