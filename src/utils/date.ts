export const parseDate = (dateString: string): Date => {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) {
    throw new Error("Invalid date format");
  }
  return date;
};

export const formatDate = (date: Date | string): string => {
  if (typeof date === "string") {
    return date;
  }
  return date.toISOString().split("T")[0];
};

export const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

export const isOverdue = (dueDate: Date, currentDate: Date = new Date()): boolean => {
  return currentDate > dueDate;
};
