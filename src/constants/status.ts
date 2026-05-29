export const BORROWING_STATUS = {
  BORROWED: "Borrowed",
  RETURNED: "Returned",
  LATE: "Late",
} as const;

export const RESERVATION_STATUS = {
  PENDING: "Pending",
  CONFIRMED: "Confirmed",
  FULFILLED: "Fulfilled",
  CANCELLED: "Cancelled",
} as const;

export type BorrowingStatus = typeof BORROWING_STATUS[keyof typeof BORROWING_STATUS];
export type ReservationStatus = typeof RESERVATION_STATUS[keyof typeof RESERVATION_STATUS];
