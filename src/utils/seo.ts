export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");
}

export function normalizeCuisine(c: string): string {
  return c
    .toLowerCase()
    .replace(/^cuisine\s+/i, "")
    .replace(/\s+/g, "-");
}
