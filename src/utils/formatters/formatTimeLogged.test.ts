import { formatTimeLogged } from ".";

describe("formatTimeLogged", () => {
  const hour = 60 * 60 * 1000;
  const minute = 60 * 1000;
  const second = 1000;

  it("should format time correctly for 0 milliseconds", () => {
    expect(formatTimeLogged(0)).toBe("00:00:00");
  });

  it("should format time correctly for 1 second", () => {
    expect(formatTimeLogged(second)).toBe("00:00:01");
  });

  it("should format time correctly for 1 minute", () => {
    expect(formatTimeLogged(minute)).toBe("00:01:00");
  });

  it("should format time correctly for 1 hour", () => {
    expect(formatTimeLogged(hour)).toBe("01:00:00");
  });

  it("should format time correctly for a specific time duration", () => {
    expect(formatTimeLogged(hour + minute + second)).toBe("01:01:01");
  });

  it("should handle leading zeros for hours, minutes, and seconds", () => {
    expect(formatTimeLogged(hour + second)).toBe("01:00:01");
  });
});
