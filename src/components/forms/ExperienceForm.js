import React, { useState, useEffect } from 'react';
import { Plus, Building2, MapPin, Calendar, Award, Trash2 } from 'lucide-react';
import Input from '../common/Input';
import Button from '../common/Button';

// Common job titles for fast autocomplete
const jobTitles = [
  'Software Engineer', 'Senior Software Engineer', 'Lead Software Engineer',
  'Software Developer', 'Full Stack Developer', 'Frontend Developer', 'Backend Developer',
  'Mobile Developer', 'iOS Developer', 'Android Developer', 'React Developer',
  'Vue.js Developer', 'Angular Developer', 'Node.js Developer', 'Python Developer',
  'Java Developer', 'C# Developer', 'PHP Developer', 'Ruby Developer', 'Go Developer',
  'DevOps Engineer', 'Cloud Engineer', 'Data Engineer', 'Machine Learning Engineer',
  'AI Engineer', 'QA Engineer', 'Test Engineer', 'Security Engineer', 'Network Engineer',
  'Data Scientist', 'Data Analyst', 'Business Analyst', 'Product Manager',
  'Engineering Manager', 'Technical Lead', 'Team Lead', 'Scrum Master',
  'Project Manager', 'Program Manager', 'CTO', 'VP of Engineering',
  'UX Designer', 'UI Designer', 'Product Designer', 'Graphic Designer',
  'Marketing Manager', 'Digital Marketing Manager', 'Sales Manager',
  'Business Development Manager', 'Consultant', 'Operations Manager',
  'Financial Analyst', 'HR Manager', 'Recruiter', 'Lawyer', 'Attorney',
  'Nurse', 'Physician', 'Teacher', 'Professor', 'Research Scientist',
  'Content Writer', 'Editor', 'Customer Service Representative',
  'Administrative Assistant', 'Executive Assistant', 'Manager', 'Director',
  'CEO', 'Founder', 'Entrepreneur', 'Freelancer', 'Contractor'
];

// Function to filter job titles based on search query
const filterJobTitles = (query) => {
  if (!query || query.length < 2) return [];
  const lowercaseQuery = query.toLowerCase();
  return jobTitles
    .filter(title => title.toLowerCase().includes(lowercaseQuery))
    .slice(0, 10);
};

const ExperienceForm = ({ onSubmit, onCancel, showCancel }) => {
  const [formData, setFormData] = useState({
    company: '',
    companyDomain: '',
    companyLogo: '',
    position: '',
    location: '',
    startDate: '',
    endDate: '',
    current: false,
    description: '',
    achievements: ['']
  });
  const [companyQuery, setCompanyQuery] = useState('');
  const [companySuggestions, setCompanySuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [positionQuery, setPositionQuery] = useState('');
  const [positionSuggestions, setPositionSuggestions] = useState([]);
  const [showPositionSuggestions, setShowPositionSuggestions] = useState(false);

  useEffect(() => {
    if (companyQuery.length < 2) {
      setCompanySuggestions([]);
      return;
    }
    const controller = new AbortController();
    fetch(`https://autocomplete.clearbit.com/v1/companies/suggest?query=${encodeURIComponent(companyQuery)}`, { signal: controller.signal })
      .then(res => res.json())
      .then(data => setCompanySuggestions(data))
      .catch(() => setCompanySuggestions([]));
    return () => controller.abort();
  }, [companyQuery]);

  useEffect(() => {
    if (positionQuery.length < 2) {
      setPositionSuggestions([]);
      return;
    }
    
    // First, use fast local search for instant results
    const localSuggestions = filterJobTitles(positionQuery);
    setPositionSuggestions(localSuggestions);
    
    // Then, optionally fetch from API for more comprehensive results
    // Only if we have less than 5 local suggestions and query is longer
    if (localSuggestions.length < 5 && positionQuery.length >= 3) {
      const controller = new AbortController();
              fetch(`https://jsearch.p.rapidapi.com/search?query=${encodeURIComponent(positionQuery)}&num_pages=1`, {
          headers: {
            'X-RapidAPI-Host': 'jsearch.p.rapidapi.com',
            'X-RapidAPI-Key': process.env.REACT_APP_JSEARCH_API_KEY
          },
        signal: controller.signal
      })
        .then(res => res.json())
        .then(data => {
          if (data.data && Array.isArray(data.data)) {
            // Extract unique job titles from API results
            const apiTitles = [...new Set(data.data.map(job => job.job_title).filter(Boolean))];
            // Combine local and API results, removing duplicates
            const allTitles = [...new Set([...localSuggestions, ...apiTitles])];
            setPositionSuggestions(allTitles.slice(0, 15)); // Show more results when API is used
          }
        })
        .catch(() => {
          // If API fails, keep local suggestions
          console.log('API search failed, using local suggestions only');
        });
      return () => controller.abort();
    }
  }, [positionQuery]);

  const handleCompanyInput = (e) => {
    const value = e.target.value;
    setCompanyQuery(value);
    setFormData(prev => ({ ...prev, company: value, companyDomain: '', companyLogo: '' }));
    setShowSuggestions(true);
  };

  const handleCompanySelect = (company) => {
    setFormData(prev => ({
      ...prev,
      company: company.name,
      companyDomain: company.domain,
      companyLogo: company.logo
    }));
    setCompanyQuery(company.name);
    setShowSuggestions(false);
  };

  const handlePositionInput = (e) => {
    const value = e.target.value;
    setPositionQuery(value);
    setFormData(prev => ({ ...prev, position: value }));
    setShowPositionSuggestions(true);
  };

  const handlePositionSelect = (title) => {
    setFormData(prev => ({ ...prev, position: title }));
    setPositionQuery(title);
    setShowPositionSuggestions(false);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAchievementChange = (index, value) => {
    const newAchievements = [...formData.achievements];
    newAchievements[index] = value;
    setFormData(prev => ({ ...prev, achievements: newAchievements }));
  };

  const addAchievement = () => {
    setFormData(prev => ({
      ...prev,
      achievements: [...prev.achievements, '']
    }));
  };

  const removeAchievement = (index) => {
    if (formData.achievements.length > 1) {
      const newAchievements = formData.achievements.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, achievements: newAchievements }));
    }
  };

  const handleSubmit = () => {
    let updatedFormData = { ...formData };
    if (!formData.companyLogo && companySuggestions.length > 0) {
      // Try to match the company name to a suggestion
      const match = companySuggestions.find(
        c => c.name.toLowerCase() === formData.company.toLowerCase()
      ) || companySuggestions[0];
      if (match) {
        updatedFormData.companyLogo = match.logo;
        updatedFormData.companyDomain = match.domain;
        updatedFormData.company = match.name;
      }
    }
    if (updatedFormData.company && updatedFormData.position && updatedFormData.startDate) {
      onSubmit(updatedFormData);
      setFormData({
        company: '',
        companyDomain: '',
        companyLogo: '',
        position: '',
        location: '',
        startDate: '',
        endDate: '',
        current: false,
        description: '',
        achievements: ['']
      });
      setCompanyQuery('');
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100 animate-slide-up">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <Plus className="w-6 h-6 mr-2 text-indigo-600" />
        Add Work Experience
      </h2>
      
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="relative">
            <Input
              label="Company Name"
              name="company"
              value={companyQuery}
              onChange={handleCompanyInput}
              placeholder="e.g., Google, Microsoft"
              icon={Building2}
              iconImg={formData.companyLogo || null}
              autoComplete="off"
              required
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            />
            {showSuggestions && companySuggestions.length > 0 && (
              <ul className="absolute z-10 bg-white border border-gray-200 w-full mt-1 rounded shadow-lg max-h-48 overflow-y-auto top-full left-0">
                {companySuggestions.map((c) => (
                  <li
                    key={c.domain}
                    className="flex items-center px-4 py-2 cursor-pointer hover:bg-indigo-50"
                    onMouseDown={() => handleCompanySelect(c)}
                  >
                    <img src={c.logo} alt={c.name} className="w-6 h-6 mr-2 bg-white rounded" onError={e => { e.target.style.display = 'none'; }} />
                    <span>{c.name}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="relative">
            <Input
              label="Position"
              name="position"
              value={positionQuery}
              onChange={handlePositionInput}
              placeholder="e.g., Software Engineer"
              required
              autoComplete="off"
              onFocus={() => setShowPositionSuggestions(true)}
              onBlur={() => setTimeout(() => setShowPositionSuggestions(false), 200)}
            />
            {showPositionSuggestions && positionSuggestions.length > 0 && (
              <ul className="absolute z-10 bg-white border border-gray-200 w-full mt-1 rounded shadow-lg max-h-48 overflow-y-auto top-full left-0">
                {positionSuggestions.map((title, index) => (
                  <li
                    key={index}
                    className="flex items-center px-4 py-2 cursor-pointer hover:bg-indigo-50"
                    onMouseDown={() => handlePositionSelect(title)}
                  >
                    <span>{title}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <Input
          label="Location"
          name="location"
          value={formData.location}
          onChange={handleInputChange}
          placeholder="e.g., San Francisco, CA"
          icon={MapPin}
        />

        <div className="grid md:grid-cols-2 gap-6">
          <Input
            label="Start Date"
            name="startDate"
            type="date"
            value={formData.startDate}
            onChange={handleInputChange}
            icon={Calendar}
            required
          />
          <div className="space-y-2">
            <Input
              label="End Date"
              name="endDate"
              type="date"
              value={formData.endDate}
              onChange={handleInputChange}
              icon={Calendar}
              disabled={formData.current}
            />
            <label className="flex items-center mt-2">
              <input
                type="checkbox"
                name="current"
                checked={formData.current}
                onChange={handleInputChange}
                className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
              />
              <span className="ml-2 text-sm text-gray-600">Currently working here</span>
            </label>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Job Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
            placeholder="Brief description of your role and responsibilities..."
          />
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700 flex items-center">
            <Award className="w-4 h-4 mr-2" />
            Key Achievements
          </label>
          {formData.achievements.map((achievement, index) => (
            <div key={index} className="flex space-x-2">
              <input
                type="text"
                value={achievement}
                onChange={(e) => handleAchievementChange(index, e.target.value)}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                placeholder="e.g., Increased team productivity by 25%"
              />
              {formData.achievements.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeAchievement(index)}
                  className="px-3 py-3 text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addAchievement}
            className="flex items-center text-indigo-600 hover:text-indigo-700 font-medium transition-colors duration-200"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Achievement
          </button>
        </div>

        <div className="flex space-x-4 pt-4">
          <Button onClick={handleSubmit} className="flex-1">
            Add Experience
          </Button>
          {showCancel && (
            <Button onClick={onCancel} variant="secondary">
              Cancel
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExperienceForm;