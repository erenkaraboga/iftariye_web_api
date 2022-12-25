"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Astronomical_1 = __importDefault(require("./Astronomical"));
var MathUtils_1 = require("./MathUtils");
var SolarCoordinates_1 = __importDefault(require("./SolarCoordinates"));
var SolarTime = /** @class */ (function () {
    function SolarTime(date, coordinates) {
        var julianDay = Astronomical_1.default.julianDay(date.getFullYear(), date.getMonth() + 1, date.getDate(), 0);
        this.observer = coordinates;
        this.solar = new SolarCoordinates_1.default(julianDay);
        this.prevSolar = new SolarCoordinates_1.default(julianDay - 1);
        this.nextSolar = new SolarCoordinates_1.default(julianDay + 1);
        var m0 = Astronomical_1.default.approximateTransit(coordinates.longitude, this.solar.apparentSiderealTime, this.solar.rightAscension);
        var solarAltitude = -50.0 / 60.0;
        this.approxTransit = m0;
        this.transit = Astronomical_1.default.correctedTransit(m0, coordinates.longitude, this.solar.apparentSiderealTime, this.solar.rightAscension, this.prevSolar.rightAscension, this.nextSolar.rightAscension);
        this.sunrise = Astronomical_1.default.correctedHourAngle(m0, solarAltitude, coordinates, false, this.solar.apparentSiderealTime, this.solar.rightAscension, this.prevSolar.rightAscension, this.nextSolar.rightAscension, this.solar.declination, this.prevSolar.declination, this.nextSolar.declination);
        this.sunset = Astronomical_1.default.correctedHourAngle(m0, solarAltitude, coordinates, true, this.solar.apparentSiderealTime, this.solar.rightAscension, this.prevSolar.rightAscension, this.nextSolar.rightAscension, this.solar.declination, this.prevSolar.declination, this.nextSolar.declination);
    }
    SolarTime.prototype.hourAngle = function (angle, afterTransit) {
        return Astronomical_1.default.correctedHourAngle(this.approxTransit, angle, this.observer, afterTransit, this.solar.apparentSiderealTime, this.solar.rightAscension, this.prevSolar.rightAscension, this.nextSolar.rightAscension, this.solar.declination, this.prevSolar.declination, this.nextSolar.declination);
    };
    SolarTime.prototype.afternoon = function (shadowLength) {
        // TODO source shadow angle calculation
        var tangent = Math.abs(this.observer.latitude - this.solar.declination);
        var inverse = shadowLength + Math.tan((0, MathUtils_1.degreesToRadians)(tangent));
        var angle = (0, MathUtils_1.radiansToDegrees)(Math.atan(1.0 / inverse));
        return this.hourAngle(angle, true);
    };
    return SolarTime;
}());
exports.default = SolarTime;
