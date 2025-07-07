import React, { useState, useEffect } from 'react';
import { Plus, Building2, MapPin, Calendar, Award, Trash2 } from 'lucide-react';
import Input from '../common/Input';
import Button from '../common/Button';

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
          <Input
            label="Position"
            name="position"
            value={formData.position}
            onChange={handleInputChange}
            placeholder="e.g., Software Engineer"
            required
          />
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