const test = require("node:test");
const assert = require("node:assert/strict");

const { BorrowingEntity } = require("../../dist/models/borrow.model.js");

test("BorrowingEntity.createNew calculates due date correctly", () => {
  const borrowing = BorrowingEntity.createNew(1, 2, "2026-05-22", 7);

  assert.equal(borrowing.memberId, 1);
  assert.equal(borrowing.bookId, 2);
  assert.equal(borrowing.borrowDate, "2026-05-22");
  assert.equal(borrowing.dueDate, "2026-05-29");
  assert.equal(borrowing.status, "Borrowed");
  assert.equal(borrowing.returnDate, null);
});

test("BorrowingEntity.createNew throws for invalid borrow date", () => {
  assert.throws(
    () => BorrowingEntity.createNew(1, 2, "invalid-date"),
    /Invalid borrow date/
  );
});

test("BorrowingEntity can detect overdue status", () => {
  const borrowing = new BorrowingEntity(
    1,
    1,
    2,
    new Date("2026-05-01"),
    new Date("2026-05-05"),
    null,
    "Borrowed"
  );

  assert.equal(borrowing.isOverdue(new Date("2026-05-10")), true);
  assert.equal(borrowing.getCurrentStatus(new Date("2026-05-10")), "Late");
});

test("BorrowingEntity markReturned updates return date and status", () => {
  const borrowing = new BorrowingEntity(
    1,
    1,
    2,
    new Date("2026-05-01"),
    new Date("2026-05-05"),
    null,
    "Borrowed"
  );

  const returnDate = new Date("2026-05-03");
  borrowing.markReturned(returnDate);

  assert.equal(borrowing.isReturned(), true);
  assert.equal(borrowing.status, "Returned");
  assert.deepEqual(borrowing.returnDate, returnDate);
});
