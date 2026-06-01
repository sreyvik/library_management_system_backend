export const parseDate = (dateString) => {
    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) {
        throw new Error("Invalid date format");
    }
    return date;
};
export const formatDate = (date) => {
    if (typeof date === "string") {
        return date;
    }
    return date.toISOString().split("T")[0];
};
export const addDays = (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
};
export const isOverdue = (dueDate, currentDate = new Date()) => {
    return currentDate > dueDate;
};
