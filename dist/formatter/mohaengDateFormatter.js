"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTwoDaysLater = exports.getTomorrow = exports.getTwodaysAgo = exports.getYesterday = exports.getDay = exports.getMonth = exports.getYear = void 0;
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
    const yesterday = new Date(date.setDate(date.getDate() - 1));
    return yesterday;
}
exports.getYesterday = getYesterday;
function getTwodaysAgo(date) {
    const twoDaysAgo = new Date(date.setDate(date.getDate() - 2));
    return twoDaysAgo;
}
exports.getTwodaysAgo = getTwodaysAgo;
function getTomorrow(date) {
    const twoDaysAgo = new Date(date.setDate(date.getDate() + 1));
    return twoDaysAgo;
}
exports.getTomorrow = getTomorrow;
function getTwoDaysLater(date) {
    const twoDaysAgo = new Date(date.setDate(date.getDate() + 2));
    return twoDaysAgo;
}
exports.getTwoDaysLater = getTwoDaysLater;
//# sourceMappingURL=mohaengDateFormatter.js.map