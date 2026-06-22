import { ZodFormattedError } from "zod";

export function getZodErrorMessages<T>(error: ZodFormattedError<T>): string[] {
  return Object.values(error)
    .map((field) => {
      if (Array.isArray(field)) return field;
      if (typeof field === "object" && field !== null && "_errors" in field) {
        return (field as { _errors: string[] })._errors;
      }
      return [];
    })
    .flat()
    .filter(Boolean);
}
