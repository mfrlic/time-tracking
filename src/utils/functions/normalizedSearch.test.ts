import { normalizedSearch } from ".";

describe("normalizedSearch", () => {
  it("should return false for null, undefined or empty string", () => {
    expect(normalizedSearch("query", null)).toBe(false);
    expect(normalizedSearch("query", undefined)).toBe(false);
    expect(normalizedSearch("query", "")).toBe(false);
  });

  it("should perform a case-insensitive and accent-insensitive search", () => {
    const query = "    čAJ S MlijeKoM   ";
    const str = "Čaj s mlijekom";
    expect(normalizedSearch(query, str)).toBe(true);
  });

  it("should return false if the query is not found in the string", () => {
    const query = "apple";
    const str = "Banana";
    expect(normalizedSearch(query, str)).toBe(false);
  });
});
