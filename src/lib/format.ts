const PKR_FORMATTER = new Intl.NumberFormat("en-PK", {
  style: "currency",
  currency: "PKR",
  maximumFractionDigits: 0
});

/** Database money values are integer paisa. */
export function formatPKR(minorUnits: number): string {
  if (!Number.isFinite(minorUnits)) return "Price unavailable";
  return PKR_FORMATTER.format(Math.round(minorUnits / 100));
}

export function formatDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("en-PK", {
    day: "numeric",
    month: "short",
    year: "numeric"
  }).format(date);
}