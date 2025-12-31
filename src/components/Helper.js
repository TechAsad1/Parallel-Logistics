export function formatDate(date) {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}/${month}/${day}`;
};

export function formatDateString(date) {
  const d = new Date(date);
  const day = d.getDate();
  const year = d.getFullYear();

  // Array of month abbreviations
  const months = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
  const month = months[d.getMonth()];

  return `${day}/${month}/${year}`;
}

