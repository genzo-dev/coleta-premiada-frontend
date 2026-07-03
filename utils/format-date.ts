import { format, parseISO, isValid, parse } from "date-fns";

type DateInput = string | Date | null | undefined;

function toDate(value: DateInput) {
  if (!value) return null;

  const date = typeof value === "string" ? parseISO(value) : value;

  return isValid(date) ? date : null;
}

export function formatDateToInput(value?: DateInput) {
  const date = toDate(value);
  if (!date) return "";

  return format(date, "yyyy-MM-dd");
}

export function formatDateToDisplay(value?: DateInput) {
  const date = toDate(value);
  if (!date) return "-";

  return format(date, "dd/MM/yyyy");
}
