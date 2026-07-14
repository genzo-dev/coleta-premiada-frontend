export function createSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD") // remove acentos
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[_\s]+/g, "-");
}
