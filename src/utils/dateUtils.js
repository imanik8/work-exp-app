import { differenceInMonths, format } from 'date-fns';

export const formatDate = (year, month) => {
  return format(new Date(year, month), 'MMM yyyy');
};

export const calculateDuration = (startYear, startMonth, endYear, endMonth, isCurrent) => {
  const startDate = new Date(startYear, startMonth);
  const endDate = isCurrent ? new Date() : new Date(endYear, endMonth);
  
  const totalMonths = differenceInMonths(endDate, startDate) + 1;
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  
  return { years, months };
};