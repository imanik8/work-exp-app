export const calculateDuration = (start, end, isCurrent) => {
  const startDate = new Date(start);
  const endDate = isCurrent ? new Date() : new Date(end);
  const months = (endDate.getFullYear() - startDate.getFullYear()) * 12 + 
                 (endDate.getMonth() - startDate.getMonth());
  
  if (months < 12) {
    return `${months} month${months !== 1 ? 's' : ''}`;
  }
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  
  let duration = `${years} year${years !== 1 ? 's' : ''}`;
  if (remainingMonths > 0) {
    duration += ` ${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
  }
  return duration;
};

export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', { 
    month: 'short', 
    year: 'numeric' 
  });
};

export const getTotalExperience = (experiences) => {
  if (experiences.length === 0) return "0 months";
  
  let totalMonths = 0;
  experiences.forEach(exp => {
    const startDate = new Date(exp.startDate);
    const endDate = exp.current ? new Date() : new Date(exp.endDate);
    const months = (endDate.getFullYear() - startDate.getFullYear()) * 12 + 
                   (endDate.getMonth() - startDate.getMonth());
    totalMonths += months;
  });

  if (totalMonths < 12) {
    return `${totalMonths} month${totalMonths !== 1 ? 's' : ''}`;
  }
  const years = Math.floor(totalMonths / 12);
  const remainingMonths = totalMonths % 12;
  
  let duration = `${years} year${years !== 1 ? 's' : ''}`;
  if (remainingMonths > 0) {
    duration += ` ${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
  }
  return duration;
};