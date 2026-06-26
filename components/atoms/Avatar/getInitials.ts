/**
 * Derives up to three uppercase initials from a name by taking the first
 * letter of each space-separated word. Empty segments (from double or trailing
 * spaces) are skipped so the result never contains stray/undefined characters.
 */
export const getInitials = (name: string): string =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 3)
    .reduce((total, word) => `${total}${word[0].toUpperCase()}`, "");
