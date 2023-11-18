export function formatDate(text: any, returnYear = false) {
  const date = new Date(text);
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  if (returnYear) return year;

  return day + "/" + (month + 1) + "/" + year;
}
