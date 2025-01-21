import { format } from "date-fns";

export function formatDate(date: Date) {
  return format(date, "MMM d, yyyy h:mm aaaaa'm'");
}

export function formatSessionTimes({
  startTime,
  endTime,
}: {
  startTime: Date;
  endTime: Date | null;
}) {
  return `${formatDate(startTime)} - ${
    endTime ? formatDate(endTime) : "Current"
  }`;
}
