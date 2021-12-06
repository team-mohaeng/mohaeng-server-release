export function getYear(date: Date) {
  return date.getFullYear().toString();
}

export function getMonth(date: Date) {
  let month = (date.getMonth() + 1).toString();
  month = parseInt(month) >= 10 ? month : '0' + month;

  return month.toString();
}

export function getDay(date: Date) {
  let day = date.getDate().toString();
  day = parseInt(day) >= 10 ? day : '0' + day;

  return day.toString();
}

export function getYesterday(date: Date) {
  const yesterday = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1).toLocaleDateString();
  return yesterday;
}

export function getTwoDaysAgo(date: Date) {
  const twoDaysAgo = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 2).toLocaleDateString();
  return twoDaysAgo;
}

export function getPastDate(date: String) {
  const year = date.split(". ")[0];
  const month = date.split(". ")[1];
  let day = date.split(". ")[2].split(".")[0];
  day = parseInt(day) >= 10 ? day : '0' + day;
  return [year, month, day];
}