"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidDate = exports.dayOfYear = exports.roundedMinute = exports.dateByAddingSeconds = exports.dateByAddingMinutes = exports.dateByAddingDays = void 0;
var Astronomical_1 = __importDefault(require("./Astronomical"));
var Rounding_1 = require("./Rounding");
function dateByAddingDays(date, days) {
    var year = date.getFullYear();
    var month = date.getMonth();
    var day = date.getDate() + days;
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    return new Date(year, month, day, hours, minutes, seconds);
}
exports.dateByAddingDays = dateByAddingDays;
function dateByAddingMinutes(date, minutes) {
    return dateByAddingSeconds(date, minutes * 60);
}
exports.dateByAddingMinutes = dateByAddingMinutes;
function dateByAddingSeconds(date, seconds) {
    return new Date(date.getTime() + seconds * 1000);
}
exports.dateByAddingSeconds = dateByAddingSeconds;
function roundedMinute(date, rounding) {
    if (rounding === void 0) { rounding = Rounding_1.Rounding.Nearest; }
    var seconds = date.getUTCSeconds();
    var offset = seconds >= 30 ? 60 - seconds : -1 * seconds;
    if (rounding === Rounding_1.Rounding.Up) {
        offset = 60 - seconds;
    }
    else if (rounding === Rounding_1.Rounding.None) {
        offset = 0;
    }
    return dateByAddingSeconds(date, offset);
}
exports.roundedMinute = roundedMinute;
function dayOfYear(date) {
    var returnedDayOfYear = 0;
    var feb = Astronomical_1.default.isLeapYear(date.getFullYear()) ? 29 : 28;
    var months = [31, feb, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    for (var i = 0; i < date.getMonth(); i++) {
        returnedDayOfYear += months[i];
    }
    returnedDayOfYear += date.getDate();
    return returnedDayOfYear;
}
exports.dayOfYear = dayOfYear;
function isValidDate(date) {
    return date instanceof Date && !isNaN(date.valueOf());
}
exports.isValidDate = isValidDate;
