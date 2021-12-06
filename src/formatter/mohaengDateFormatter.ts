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
  const yesterday = new Date(date.setDate(date.getDate() - 1));
  return yesterday;
}

export function getTwodaysAgo(date: Date) {
  const twoDaysAgo = new Date(date.setDate(date.getDate() - 2));
  return twoDaysAgo;
}

export function getTomorrow(date: Date) {
  const twoDaysAgo = new Date(date.setDate(date.getDate() + 1));
  return twoDaysAgo;
}

export function getTwoDaysLater(date: Date) {
  const twoDaysAgo = new Date(date.setDate(date.getDate() + 2));
  return twoDaysAgo;
}
