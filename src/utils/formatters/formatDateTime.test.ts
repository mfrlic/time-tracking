import { formatDateTime } from ".";

describe("formatDateTime", () => {
  it('should return "N/A" when date is null or undefined', () => {
    expect(formatDateTime(null)).toBe("N/A");
    expect(formatDateTime(undefined)).toBe("N/A");
  });

  it("should format date and time correctly", () => {
    const mockDate1 = new Date("2023-11-05T12:34:56");
    const mockDate2 = new Date("2001-01-01T01:01:01");
    expect(formatDateTime(mockDate1)).toBe("05.11.2023. 12:34");
    expect(formatDateTime(mockDate2)).toBe("01.01.2001. 01:01");
  });
});
