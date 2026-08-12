import { useEffect, useState } from 'react';
import { analyzeJobDescription } from '../utils/jobMatchUtils';

const STORAGE_KEY = 'job_match_data';

const useJobMatch = (profileData) => {
  const [jobDescription, setJobDescription] = useState('');
  const [analysis, setAnalysis] = useState(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const data = JSON.parse(stored);
        setJobDescription(data.jobDescription || '');
        setAnalysis(data.analysis || null);
      }
    } catch (error) {
      console.error('Failed to load job match data:', error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ jobDescription, analysis }));
    } catch (error) {
      console.error('Failed to save job match data:', error);
    }
  }, [jobDescription, analysis]);

  const analyze = () => {
    const trimmed = jobDescription.trim();
    if (!trimmed) return null;
    const result = analyzeJobDescription(trimmed, profileData);
    setAnalysis(result);
    return result;
  };

  const clear = () => {
    setJobDescription('');
    setAnalysis(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  return { jobDescription, setJobDescription, analysis, analyze, clear };
};

export default useJobMatch;
