export function sanitizeInput(input: string): string {
  if (!input) throw new Error("Empty query not allowed.");

  // Trim, strip weird characters, basic length limit
  let cleaned = input.trim().replace(/[^\w\s.,?!-]/g, "");
  if (cleaned.length > 500) cleaned = cleaned.substring(0, 500);

  return cleaned;
}