export const parseId = (value: string): number | null => {
  const parsed = Number.parseInt(value, 10);
  return Number.isNaN(parsed) ? null : parsed;
};

export const validateRequiredField = (value: unknown, fieldName: string): void => {
  if (value === undefined || value === null) {
    throw new Error(`${fieldName} is required`);
  }

  if (typeof value === "string" && value.trim() === "") {
    throw new Error(`${fieldName} is required`);
  }
};

export const validateEmail = (email: string, fieldName: string = "email"): void => {
  validateRequiredField(email, fieldName);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error(`${fieldName} is invalid`);
  }
};

export const validateNumber = (value: unknown, fieldName: string): void => {
  if (value === undefined || Number.isNaN(Number(value))) {
    throw new Error(`${fieldName} is required`);
  }
};
