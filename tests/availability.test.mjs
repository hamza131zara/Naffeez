import test from "node:test";
import assert from "node:assert/strict";

function availableQuantity(onHand, reserved) {
  if (!Number.isInteger(onHand) || !Number.isInteger(reserved)) {
    throw new TypeError("Inventory quantities must be integers.");
  }
  if (onHand < 0 || reserved < 0 || reserved > onHand) {
    throw new RangeError("Inventory quantities are outside the permitted range.");
  }
  return onHand - reserved;
}

test("available quantity subtracts reservations", () => {
  assert.equal(availableQuantity(8, 3), 5);
});

test("fully reserved stock is unavailable", () => {
  assert.equal(availableQuantity(4, 4), 0);
});

test("negative or inconsistent inventory is rejected", () => {
  assert.throws(() => availableQuantity(-1, 0), RangeError);
  assert.throws(() => availableQuantity(2, 3), RangeError);
});

test("fractional inventory is rejected", () => {
  assert.throws(() => availableQuantity(2.5, 0), TypeError);
});