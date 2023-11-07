import dayjs from "dayjs";

export default function formatDate(
  date: string | number | Date | dayjs.Dayjs | null | undefined
) {
  if (!date) return "N/A";

  return dayjs(date).format("DD.MM.YYYY.");
}
