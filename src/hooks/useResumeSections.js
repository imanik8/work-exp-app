import { useEffect, useState } from 'react';

const STORAGE_KEY = 'resume_sections_data';

const DEFAULT_DATA = {
  education: [],
  certifications: [],
  projects: []
};

const normalize = (data) => ({
  education: Array.isArray(data?.education) ? data.education : [],
  certifications: Array.isArray(data?.certifications) ? data.certifications : [],
  projects: Array.isArray(data?.projects) ? data.projects : []
});

const useResumeSections = () => {
  const [sections, setSections] = useState(DEFAULT_DATA);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setSections(normalize(JSON.parse(stored)));
    } catch (error) {
      console.error('Failed to load resume sections:', error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sections));
    } catch (error) {
      console.error('Failed to save resume sections:', error);
    }
  }, [sections]);

  const updateSections = (updates) => {
    setSections((current) => ({ ...current, ...updates }));
  };

  const clearSections = () => {
    setSections(DEFAULT_DATA);
    localStorage.removeItem(STORAGE_KEY);
  };

  return { ...sections, updateSections, clearSections };
};

export default useResumeSections;
