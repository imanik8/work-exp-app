import { useState, useEffect } from 'react';
import { calculateDuration } from '../utils/dateUtils';
import { differenceInMonths } from 'date-fns';

export default function useExperienceCalculator(experiences) {
  const [totalExperience, setTotalExperience] = useState({ years: 0, months: 0 });

  useEffect(() => {
    if (experiences.length === 0) {
      setTotalExperience({ years: 0, months: 0 });
      return;
    }

    let totalMonths = 0;
    const sortedExperiences = [...experiences].sort(
      (a, b) => 
        new Date(a.startYear, a.startMonth) - new Date(b.startYear, b.startMonth)
    );

    let currentEndDate = null;

    sortedExperiences.forEach(exp => {
      const startDate = new Date(exp.startYear, exp.startMonth);
      const endDate = exp.isCurrent ? new Date() : new Date(exp.endYear, exp.endMonth);
      
      if (!currentEndDate || startDate > currentEndDate) {
        // Non-overlapping period
        const { years, months } = calculateDuration(
          exp.startYear,
          exp.startMonth,
          exp.endYear,
          exp.endMonth,
          exp.isCurrent
        );
        totalMonths += years * 12 + months;
      } else if (endDate > currentEndDate) {
        // Partially overlapping period
        const overlapMonths = differenceInMonths(endDate, currentEndDate);
        totalMonths += overlapMonths;
      }
      
      if (!currentEndDate || endDate > currentEndDate) {
        currentEndDate = endDate;
      }
    });

    setTotalExperience({
      years: Math.floor(totalMonths / 12),
      months: totalMonths % 12
    });
  }, [experiences]);

  return totalExperience;
}