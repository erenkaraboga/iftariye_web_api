"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var DateUtils_1 = require("./DateUtils");
var PrayerTimes_1 = __importDefault(require("./PrayerTimes"));
var SunnahTimes = /** @class */ (function () {
    function SunnahTimes(prayerTimes) {
        var date = prayerTimes.date;
        var nextDay = (0, DateUtils_1.dateByAddingDays)(date, 1);
        var nextDayPrayerTimes = new PrayerTimes_1.default(prayerTimes.coordinates, nextDay, prayerTimes.calculationParameters);
        var nightDuration = (nextDayPrayerTimes.fajr.getTime() - prayerTimes.maghrib.getTime()) /
            1000.0;
        this.middleOfTheNight = (0, DateUtils_1.roundedMinute)((0, DateUtils_1.dateByAddingSeconds)(prayerTimes.maghrib, nightDuration / 2));
        this.lastThirdOfTheNight = (0, DateUtils_1.roundedMinute)((0, DateUtils_1.dateByAddingSeconds)(prayerTimes.maghrib, nightDuration * (2 / 3)));
    }
    return SunnahTimes;
}());
exports.default = SunnahTimes;
