"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPastDate = exports.getTwoDaysAgo = exports.getYesterday = exports.getDay = exports.getMonth = exports.getYear = void 0;
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
    const yesterday = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1).toLocaleDateString();
    return yesterday;
}
exports.getYesterday = getYesterday;
function getTwoDaysAgo(date) {
    const twoDaysAgo = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 2).toLocaleDateString();
    return twoDaysAgo;
}
exports.getTwoDaysAgo = getTwoDaysAgo;
function getPastDate(date) {
    const year = date.split(". ")[0];
    const month = date.split(". ")[1];
    const day = date.split(". ")[2].split(".")[0];
    return [year, month, day];
}
exports.getPastDate = getPastDate;
//# sourceMappingURL=mohaengDateFormatter.js.map