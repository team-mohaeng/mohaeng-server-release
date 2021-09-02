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