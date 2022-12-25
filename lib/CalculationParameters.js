"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Madhab_1 = require("./Madhab");
var HighLatitudeRule_1 = __importDefault(require("./HighLatitudeRule"));
var PolarCircleResolution_1 = require("./PolarCircleResolution");
var Rounding_1 = require("./Rounding");
var Shafaq_1 = require("./Shafaq");
var CalculationParameters = /** @class */ (function () {
    function CalculationParameters(
    // Name of the method, can be used to apply special behavior in calculations.
    // This property should not be manually modified.
    method, 
    // Angle of the sun below the horizon used for calculating Fajr.
    fajrAngle, 
    // Angle of the sun below the horizon used for calculating Isha.
    ishaAngle, 
    // Minutes after Maghrib to determine time for Isha
    // if this value is greater than 0 then ishaAngle is not used.
    ishaInterval, 
    // Angle of the sun below the horizon used for calculating Maghrib.
    // Only used by the Tehran method to account for lightness in the sky.
    maghribAngle) {
        if (fajrAngle === void 0) { fajrAngle = 0; }
        if (ishaAngle === void 0) { ishaAngle = 0; }
        if (ishaInterval === void 0) { ishaInterval = 0; }
        if (maghribAngle === void 0) { maghribAngle = 0; }
        this.method = method;
        this.fajrAngle = fajrAngle;
        this.ishaAngle = ishaAngle;
        this.ishaInterval = ishaInterval;
        this.maghribAngle = maghribAngle;
        // Madhab to determine how Asr is calculated.
        this.madhab = Madhab_1.Madhab.Shafi;
        // Rule to determine the earliest time for Fajr and latest time for Isha
        // needed for high latitude locations where Fajr and Isha may not truly exist
        // or may present a hardship unless bound to a reasonable time.
        this.highLatitudeRule = HighLatitudeRule_1.default.MiddleOfTheNight;
        // Manual adjustments (in minutes) to be added to each prayer time.
        this.adjustments = {
            fajr: 0,
            sunrise: 0,
            dhuhr: 0,
            asr: 0,
            maghrib: 0,
            isha: 0,
        };
        // Adjustments set by a calculation method. This value should not be manually modified.
        this.methodAdjustments = {
            fajr: 0,
            sunrise: 0,
            dhuhr: 0,
            asr: 0,
            maghrib: 0,
            isha: 0,
        };
        // Rule to determine how to resolve prayer times inside the Polar Circle
        // where daylight or night may persist for more than 24 hours depending
        // on the season
        this.polarCircleResolution = PolarCircleResolution_1.PolarCircleResolution.Unresolved;
        // How seconds are rounded when calculating prayer times
        this.rounding = Rounding_1.Rounding.Nearest;
        // Used by the MoonsightingCommittee method to determine how to calculate Isha
        this.shafaq = Shafaq_1.Shafaq.General;
        if (this.method === null) {
            // we don't want a breaking change
            this.method = "Other";
        }
    }
    CalculationParameters.prototype.nightPortions = function () {
        switch (this.highLatitudeRule) {
            case HighLatitudeRule_1.default.MiddleOfTheNight:
                return { fajr: 1 / 2, isha: 1 / 2 };
            case HighLatitudeRule_1.default.SeventhOfTheNight:
                return { fajr: 1 / 7, isha: 1 / 7 };
            case HighLatitudeRule_1.default.TwilightAngle:
                return { fajr: this.fajrAngle / 60, isha: this.ishaAngle / 60 };
            default:
                throw "Invalid high latitude rule found when attempting to compute night portions: ".concat(this.highLatitudeRule);
        }
    };
    return CalculationParameters;
}());
exports.default = CalculationParameters;
