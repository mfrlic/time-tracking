function normalizeString(str?: string | null) {
  return str
    ? str
        .trim()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
    : "";
}

export default function normalizedSearch(
  query: string,
  str: string | null | undefined
) {
  if (!str) return false;

  return normalizeString(str).startsWith(normalizeString(query));
}
