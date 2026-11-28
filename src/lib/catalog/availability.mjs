export function getAvailableQuantity(onHand, reserved) {
  if (!Number.isInteger(onHand) || !Number.isInteger(reserved)) {
    throw new TypeError("Inventory quantities must be integers.");
  }
  if (onHand < 0 || reserved < 0 || reserved > onHand) {
    throw new RangeError("Inventory quantities are outside the permitted range.");
  }
  return onHand - reserved;
}

export function isVariantSoldOut(availableQuantity) {
  return availableQuantity === 0;
}