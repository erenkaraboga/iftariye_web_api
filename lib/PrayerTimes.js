"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var SolarTime_1 = __importDefault(require("./SolarTime"));
var TimeComponents_1 = __importDefault(require("./TimeComponents"));
var Prayer_1 = __importDefault(require("./Prayer"));
var Astronomical_1 = __importDefault(require("./Astronomical"));
var DateUtils_1 = require("./DateUtils");
var Madhab_1 = require("./Madhab");
var PolarCircleResolution_1 = require("./PolarCircleResolution");
var PrayerTimes = /** @class */ (function () {
    // eslint-disable-next-line complexity
    function PrayerTimes(coordinates, date, calculationParameters) {
        var _a, _b, _c;
        this.coordinates = coordinates;
        this.date = date;
        this.calculationParameters = calculationParameters;
        var solarTime = new SolarTime_1.default(date, coordinates);
        var fajrTime;
        var sunriseTime;
        var dhuhrTime;
        var asrTime;
        var sunsetTime;
        var maghribTime;
        var ishaTime;
        var nightFraction;
        dhuhrTime = new TimeComponents_1.default(solarTime.transit).utcDate(date.getFullYear(), date.getMonth(), date.getDate());
        sunriseTime = new TimeComponents_1.default(solarTime.sunrise).utcDate(date.getFullYear(), date.getMonth(), date.getDate());
        sunsetTime = new TimeComponents_1.default(solarTime.sunset).utcDate(date.getFullYear(), date.getMonth(), date.getDate());
        var tomorrow = (0, DateUtils_1.dateByAddingDays)(date, 1);
        var tomorrowSolarTime = new SolarTime_1.default(tomorrow, coordinates);
        var polarCircleResolver = calculationParameters.polarCircleResolution;
        if ((!(0, DateUtils_1.isValidDate)(sunriseTime) ||
            !(0, DateUtils_1.isValidDate)(sunsetTime) ||
            isNaN(tomorrowSolarTime.sunrise)) &&
            polarCircleResolver !== PolarCircleResolution_1.PolarCircleResolution.Unresolved) {
            var resolved = (0, PolarCircleResolution_1.polarCircleResolvedValues)(polarCircleResolver, date, coordinates);
            solarTime = resolved.solarTime;
            tomorrowSolarTime = resolved.tomorrowSolarTime;
            var dateComponents = [
                date.getFullYear(),
                date.getMonth(),
                date.getDate(),
            ];
            dhuhrTime = (_a = new TimeComponents_1.default(solarTime.transit)).utcDate.apply(_a, dateComponents);
            sunriseTime = (_b = new TimeComponents_1.default(solarTime.sunrise)).utcDate.apply(_b, dateComponents);
            sunsetTime = (_c = new TimeComponents_1.default(solarTime.sunset)).utcDate.apply(_c, dateComponents);
        }
        // eslint-disable-next-line prefer-const
        asrTime = new TimeComponents_1.default(solarTime.afternoon((0, Madhab_1.shadowLength)(calculationParameters.madhab))).utcDate(date.getFullYear(), date.getMonth(), date.getDate());
        var tomorrowSunrise = new TimeComponents_1.default(tomorrowSolarTime.sunrise).utcDate(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate());
        var night = (Number(tomorrowSunrise) - Number(sunsetTime)) / 1000;
        fajrTime = new TimeComponents_1.default(solarTime.hourAngle(-1 * calculationParameters.fajrAngle, false)).utcDate(date.getFullYear(), date.getMonth(), date.getDate());
        // special case for moonsighting committee above latitude 55
        if (calculationParameters.method === "MoonsightingCommittee" &&
            coordinates.latitude >= 55) {
            nightFraction = night / 7;
            fajrTime = (0, DateUtils_1.dateByAddingSeconds)(sunriseTime, -nightFraction);
        }
        var safeFajr = (function () {
            if (calculationParameters.method === "MoonsightingCommittee") {
                return Astronomical_1.default.seasonAdjustedMorningTwilight(coordinates.latitude, (0, DateUtils_1.dayOfYear)(date), date.getFullYear(), sunriseTime);
            }
            else {
                var portion = calculationParameters.nightPortions().fajr;
                nightFraction = portion * night;
                return (0, DateUtils_1.dateByAddingSeconds)(sunriseTime, -nightFraction);
            }
        })();
        if (isNaN(fajrTime.getTime()) || safeFajr > fajrTime) {
            fajrTime = safeFajr;
        }
        if (calculationParameters.ishaInterval > 0) {
            ishaTime = (0, DateUtils_1.dateByAddingMinutes)(sunsetTime, calculationParameters.ishaInterval);
        }
        else {
            ishaTime = new TimeComponents_1.default(solarTime.hourAngle(-1 * calculationParameters.ishaAngle, true)).utcDate(date.getFullYear(), date.getMonth(), date.getDate());
            // special case for moonsighting committee above latitude 55
            if (calculationParameters.method === "MoonsightingCommittee" &&
                coordinates.latitude >= 55) {
                nightFraction = night / 7;
                ishaTime = (0, DateUtils_1.dateByAddingSeconds)(sunsetTime, nightFraction);
            }
            var safeIsha = (function () {
                if (calculationParameters.method === "MoonsightingCommittee") {
                    return Astronomical_1.default.seasonAdjustedEveningTwilight(coordinates.latitude, (0, DateUtils_1.dayOfYear)(date), date.getFullYear(), sunsetTime, calculationParameters.shafaq);
                }
                else {
                    var portion = calculationParameters.nightPortions().isha;
                    nightFraction = portion * night;
                    return (0, DateUtils_1.dateByAddingSeconds)(sunsetTime, nightFraction);
                }
            })();
            if (isNaN(ishaTime.getTime()) || safeIsha < ishaTime) {
                ishaTime = safeIsha;
            }
        }
        maghribTime = sunsetTime;
        if (calculationParameters.maghribAngle) {
            var angleBasedMaghrib = new TimeComponents_1.default(solarTime.hourAngle(-1 * calculationParameters.maghribAngle, true)).utcDate(date.getFullYear(), date.getMonth(), date.getDate());
            if (sunsetTime < angleBasedMaghrib && ishaTime > angleBasedMaghrib) {
                maghribTime = angleBasedMaghrib;
            }
        }
        var fajrAdjustment = (calculationParameters.adjustments.fajr || 0) +
            (calculationParameters.methodAdjustments.fajr || 0);
        var sunriseAdjustment = (calculationParameters.adjustments.sunrise || 0) +
            (calculationParameters.methodAdjustments.sunrise || 0);
        var dhuhrAdjustment = (calculationParameters.adjustments.dhuhr || 0) +
            (calculationParameters.methodAdjustments.dhuhr || 0);
        var asrAdjustment = (calculationParameters.adjustments.asr || 0) +
            (calculationParameters.methodAdjustments.asr || 0);
        var maghribAdjustment = (calculationParameters.adjustments.maghrib || 0) +
            (calculationParameters.methodAdjustments.maghrib || 0);
        var ishaAdjustment = (calculationParameters.adjustments.isha || 0) +
            (calculationParameters.methodAdjustments.isha || 0);
        this.fajr = (0, DateUtils_1.roundedMinute)((0, DateUtils_1.dateByAddingMinutes)(fajrTime, fajrAdjustment), calculationParameters.rounding);
        this.sunrise = (0, DateUtils_1.roundedMinute)((0, DateUtils_1.dateByAddingMinutes)(sunriseTime, sunriseAdjustment), calculationParameters.rounding);
        this.dhuhr = (0, DateUtils_1.roundedMinute)((0, DateUtils_1.dateByAddingMinutes)(dhuhrTime, dhuhrAdjustment), calculationParameters.rounding);
        this.asr = (0, DateUtils_1.roundedMinute)((0, DateUtils_1.dateByAddingMinutes)(asrTime, asrAdjustment), calculationParameters.rounding);
        this.sunset = (0, DateUtils_1.roundedMinute)(sunsetTime, calculationParameters.rounding);
        this.maghrib = (0, DateUtils_1.roundedMinute)((0, DateUtils_1.dateByAddingMinutes)(maghribTime, maghribAdjustment), calculationParameters.rounding);
        this.isha = (0, DateUtils_1.roundedMinute)((0, DateUtils_1.dateByAddingMinutes)(ishaTime, ishaAdjustment), calculationParameters.rounding);
    }
    PrayerTimes.prototype.timeForPrayer = function (prayer) {
        if (prayer === Prayer_1.default.Fajr) {
            return this.fajr;
        }
        else if (prayer === Prayer_1.default.Sunrise) {
            return this.sunrise;
        }
        else if (prayer === Prayer_1.default.Dhuhr) {
            return this.dhuhr;
        }
        else if (prayer === Prayer_1.default.Asr) {
            return this.asr;
        }
        else if (prayer === Prayer_1.default.Maghrib) {
            return this.maghrib;
        }
        else if (prayer === Prayer_1.default.Isha) {
            return this.isha;
        }
        else {
            return null;
        }
    };
    PrayerTimes.prototype.currentPrayer = function (date) {
        if (date === void 0) { date = new Date(); }
        if (date >= this.isha) {
            return Prayer_1.default.Isha;
        }
        else if (date >= this.maghrib) {
            return Prayer_1.default.Maghrib;
        }
        else if (date >= this.asr) {
            return Prayer_1.default.Asr;
        }
        else if (date >= this.dhuhr) {
            return Prayer_1.default.Dhuhr;
        }
        else if (date >= this.sunrise) {
            return Prayer_1.default.Sunrise;
        }
        else if (date >= this.fajr) {
            return Prayer_1.default.Fajr;
        }
        else {
            return Prayer_1.default.None;
        }
    };
    PrayerTimes.prototype.nextPrayer = function (date) {
        if (date === void 0) { date = new Date(); }
        if (date >= this.isha) {
            return Prayer_1.default.None;
        }
        else if (date >= this.maghrib) {
            return Prayer_1.default.Isha;
        }
        else if (date >= this.asr) {
            return Prayer_1.default.Maghrib;
        }
        else if (date >= this.dhuhr) {
            return Prayer_1.default.Asr;
        }
        else if (date >= this.sunrise) {
            return Prayer_1.default.Dhuhr;
        }
        else if (date >= this.fajr) {
            return Prayer_1.default.Sunrise;
        }
        else {
            return Prayer_1.default.Fajr;
        }
    };
    return PrayerTimes;
}());
exports.default = PrayerTimes;
