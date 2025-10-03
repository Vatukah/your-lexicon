

export default function normalizeSearchInput(input) {
  if (!input) return "";
  return input
    .trim()
    .toLowerCase()
    .normalize("NFKD")                // unify Unicode
    .replace(/[\u0300-\u036f]/g, "") // remove accents
    .replace(/[^\w\s'-]/g, "");      // remove unwanted special chars
}


