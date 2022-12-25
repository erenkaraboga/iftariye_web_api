"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isHourStringsClose = exports.isInRange = exports.isNil = exports.dateToString = exports.isValidDate = exports.extractTimeFromDate = exports.prefix0 = void 0;
function prefix0(n) {
    if (n > 99 || n < -99)
        throw new Error("Can only process 2 digits integers!");
    return (n + "").padStart(2, "0");
}
exports.prefix0 = prefix0;
function extractTimeFromDate(d, timezoneOffset) {
    d.setMinutes(d.getMinutes() + timezoneOffset);
    var hour = d.getUTCHours();
    var minute = d.getUTCMinutes();
    return (prefix0(hour) + ":" + prefix0(minute));
}
exports.extractTimeFromDate = extractTimeFromDate;
function isValidDate(str) {
    if (isNil(str))
        return false;
    str = str;
    var regexMatch = str.match(/^\d{4}-\d{2}-\d{2}$/) !== null;
    if (!regexMatch)
        return false;
    var _a = str.split("-").map(function (x) { return Number(x); }), y = _a[0], m = _a[1], d = _a[2];
    if (y < 1000 || y > 3000 || m < 1 || m > 12 || d < 1 || d > 31)
        return false;
    return true;
}
exports.isValidDate = isValidDate;
function dateToString(date) {
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    return "".concat(year, "-").concat(prefix0(month), "-").concat(prefix0(day));
}
exports.dateToString = dateToString;
function isNil(value) {
    return value === null || value === undefined;
}
exports.isNil = isNil;
function isInRange(a, min, max) {
    return a >= min && a <= max;
}
exports.isInRange = isInRange;
function isHourStringsClose(s1, s2, minuteDiff) {
    if (minuteDiff === void 0) { minuteDiff = 5; }
    var _a = s1.split(":").map(function (x) { return Number(x); }), hour1 = _a[0], min1 = _a[1];
    var _b = s2.split(":").map(function (x) { return Number(x); }), hour2 = _b[0], min2 = _b[1];
    return Math.abs(hour1 * 60 + min1 - hour2 * 60 - min2) <= minuteDiff;
}
exports.isHourStringsClose = isHourStringsClose;
