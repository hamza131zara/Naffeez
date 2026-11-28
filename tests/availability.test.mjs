import test from "node:test";
import assert from "node:assert/strict";
import { getAvailableQuantity, isVariantSoldOut } from "../src/lib/catalog/availability.mjs";

test("available quantity subtracts reservations", () => {
  assert.equal(getAvailableQuantity(8, 3), 5);
});

test("fully reserved stock is unavailable", () => {
  assert.equal(getAvailableQuantity(4, 4), 0);
  assert.equal(isVariantSoldOut(getAvailableQuantity(4, 4)), true);
});

test("negative or inconsistent inventory is rejected", () => {
  assert.throws(() => getAvailableQuantity(-1, 0), RangeError);
  assert.throws(() => getAvailableQuantity(2, 3), RangeError);
});

test("fractional inventory is rejected", () => {
  assert.throws(() => getAvailableQuantity(2.5, 0), TypeError);
});

test("unknown stock is not falsely labelled sold out", () => {
  assert.equal(isVariantSoldOut(null), false);
});