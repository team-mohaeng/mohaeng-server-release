"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getYesterday = exports.getDay = exports.getMonth = exports.getYear = void 0;
function getYear(date) {
    return date.getFullYear().toString();
}
exports.getYear = getYear;
function getMonth(date) {
    let month = (date.getMonth() + 1).toString();
    month = parseInt(month) >= 10 ? month : '0' + month;
    return month.toString();
}
exports.getMonth = getMonth;
function getDay(date) {
    let day = date.getDate().toString();
    day = parseInt(day) >= 10 ? day : '0' + day;
    return day.toString();
}
exports.getDay = getDay;
function getYesterday(date) {
    let yesterday = (date.getDate() - 1).toString();
    yesterday = parseInt(yesterday) >= 10 ? yesterday : '0' + yesterday;
    return yesterday.toString();
}
exports.getYesterday = getYesterday;
//# sourceMappingURL=mohaengDateFormatter.js.map