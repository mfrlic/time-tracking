import formatDate from "./formatDate";
import dayjs from "dayjs";

describe("formatDate", () => {
  it("formats a valid date as expected", () => {
    const testDate = new Date("2023-11-07T12:34:56");

    const formattedDate = formatDate(testDate);

    const expectedFormattedDate = dayjs(testDate).format("DD.MM.YYYY.");

    expect(formattedDate).toBe(expectedFormattedDate);
  });

  it("handles null date correctly", () => {
    const formattedDate = formatDate(null);

    expect(formattedDate).toBe("N/A");
  });
});
