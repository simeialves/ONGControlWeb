export function formatDate(dataInput) {
  return new Date(dataInput).toLocaleString().replace(", 00:00:00", "");
}
