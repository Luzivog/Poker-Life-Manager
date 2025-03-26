/**
 * Formats a date for display in the session details
 */
export const formatDate = (date: Date | string): string => {
  return new Date(date).toLocaleDateString(undefined, {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};


export const calculateDurationMs = (start: Date, end: Date): number => {
  return new Date(end).getTime() - new Date(start).getTime();
};

/**
 * Calculates the duration between two dates and formats it as hours and minutes
 */
export const calculateDurationString = (start: Date, end: Date): string => {
  const durationMs = calculateDurationMs(start, end);
  const hours = Math.floor(durationMs / (1000 * 60 * 60));
  const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
  
  return `${hours}h ${minutes}m`;
};