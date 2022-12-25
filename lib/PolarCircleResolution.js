"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.polarCircleResolvedValues = exports.PolarCircleResolution = void 0;
var Coordinates_1 = __importDefault(require("./Coordinates"));
var SolarTime_1 = __importDefault(require("./SolarTime"));
var DateUtils_1 = require("./DateUtils");
exports.PolarCircleResolution = {
    AqrabBalad: "AqrabBalad",
    AqrabYaum: "AqrabYaum",
    Unresolved: "Unresolved",
};
var LATITUDE_VARIATION_STEP = 0.5; // Degrees to add/remove at each resolution step
var UNSAFE_LATITUDE = 65; // Based on https://en.wikipedia.org/wiki/Midnight_sun
var isValidSolarTime = function (solarTime) {
    return !isNaN(solarTime.sunrise) && !isNaN(solarTime.sunset);
};
var aqrabYaumResolver = function (coordinates, date, daysAdded, direction) {
    if (daysAdded === void 0) { daysAdded = 1; }
    if (direction === void 0) { direction = 1; }
    if (daysAdded > Math.ceil(365 / 2)) {
        return null;
    }
    var testDate = new Date(date.getTime());
    testDate.setDate(testDate.getDate() + direction * daysAdded);
    var tomorrow = (0, DateUtils_1.dateByAddingDays)(testDate, 1);
    var solarTime = new SolarTime_1.default(testDate, coordinates);
    var tomorrowSolarTime = new SolarTime_1.default(tomorrow, coordinates);
    if (!isValidSolarTime(solarTime) || !isValidSolarTime(tomorrowSolarTime)) {
        return aqrabYaumResolver(coordinates, date, daysAdded + (direction > 0 ? 0 : 1), -direction);
    }
    return {
        date: date,
        tomorrow: tomorrow,
        coordinates: coordinates,
        solarTime: solarTime,
        tomorrowSolarTime: tomorrowSolarTime,
    };
};
var aqrabBaladResolver = function (coordinates, date, latitude) {
    var solarTime = new SolarTime_1.default(date, __assign(__assign({}, coordinates), { latitude: latitude }));
    var tomorrow = (0, DateUtils_1.dateByAddingDays)(date, 1);
    var tomorrowSolarTime = new SolarTime_1.default(tomorrow, __assign(__assign({}, coordinates), { latitude: latitude }));
    if (!isValidSolarTime(solarTime) || !isValidSolarTime(tomorrowSolarTime)) {
        return Math.abs(latitude) >= UNSAFE_LATITUDE
            ? aqrabBaladResolver(coordinates, date, latitude - Math.sign(latitude) * LATITUDE_VARIATION_STEP)
            : null;
    }
    return {
        date: date,
        tomorrow: tomorrow,
        coordinates: new Coordinates_1.default(latitude, coordinates.longitude),
        solarTime: solarTime,
        tomorrowSolarTime: tomorrowSolarTime,
    };
};
var polarCircleResolvedValues = function (resolver, date, coordinates) {
    var defaultReturn = {
        date: date,
        tomorrow: (0, DateUtils_1.dateByAddingDays)(date, 1),
        coordinates: coordinates,
        solarTime: new SolarTime_1.default(date, coordinates),
        tomorrowSolarTime: new SolarTime_1.default((0, DateUtils_1.dateByAddingDays)(date, 1), coordinates),
    };
    switch (resolver) {
        case exports.PolarCircleResolution.AqrabYaum: {
            return aqrabYaumResolver(coordinates, date) || defaultReturn;
        }
        case exports.PolarCircleResolution.AqrabBalad: {
            var latitude = coordinates.latitude;
            return (aqrabBaladResolver(coordinates, date, latitude - Math.sign(latitude) * LATITUDE_VARIATION_STEP) || defaultReturn);
        }
        default: {
            return defaultReturn;
        }
    }
};
exports.polarCircleResolvedValues = polarCircleResolvedValues;
