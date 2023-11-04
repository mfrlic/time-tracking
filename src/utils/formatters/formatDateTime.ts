import dayjs from "dayjs";

export default function formatDateTime(
  date: string | number | Date | dayjs.Dayjs | null | undefined
): string {
  if (!date) return "N/A";

  return dayjs(date).format("DD.MM.YYYY. HH:mm:ss");
}
