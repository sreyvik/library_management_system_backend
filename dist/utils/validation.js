export const parseId = (value) => {
    const parsed = Number.parseInt(value, 10);
    return Number.isNaN(parsed) ? null : parsed;
};
export const validateRequiredField = (value, fieldName) => {
    if (value === undefined || value === null) {
        throw new Error(`${fieldName} is required`);
    }
    if (typeof value === "string" && value.trim() === "") {
        throw new Error(`${fieldName} is required`);
    }
};
export const validateEmail = (email, fieldName = "email") => {
    validateRequiredField(email, fieldName);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        throw new Error(`${fieldName} is invalid`);
    }
};
export const validateNumber = (value, fieldName) => {
    if (value === undefined || Number.isNaN(Number(value))) {
        throw new Error(`${fieldName} is required`);
    }
};
