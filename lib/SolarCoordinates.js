"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Astronomical_1 = __importDefault(require("./Astronomical"));
var MathUtils_1 = require("./MathUtils");
var SolarCoordinates = /** @class */ (function () {
    function SolarCoordinates(julianDay) {
        var T = Astronomical_1.default.julianCentury(julianDay);
        var L0 = Astronomical_1.default.meanSolarLongitude(T);
        var Lp = Astronomical_1.default.meanLunarLongitude(T);
        var Omega = Astronomical_1.default.ascendingLunarNodeLongitude(T);
        var Lambda = (0, MathUtils_1.degreesToRadians)(Astronomical_1.default.apparentSolarLongitude(T, L0));
        var Theta0 = Astronomical_1.default.meanSiderealTime(T);
        var dPsi = Astronomical_1.default.nutationInLongitude(T, L0, Lp, Omega);
        var dEpsilon = Astronomical_1.default.nutationInObliquity(T, L0, Lp, Omega);
        var Epsilon0 = Astronomical_1.default.meanObliquityOfTheEcliptic(T);
        var EpsilonApparent = (0, MathUtils_1.degreesToRadians)(Astronomical_1.default.apparentObliquityOfTheEcliptic(T, Epsilon0));
        /* declination: The declination of the sun, the angle between
                the rays of the Sun and the plane of the Earth's
                equator, in degrees.
                Equation from Astronomical Algorithms page 165 */
        this.declination = (0, MathUtils_1.radiansToDegrees)(Math.asin(Math.sin(EpsilonApparent) * Math.sin(Lambda)));
        /* rightAscension: Right ascension of the Sun, the angular distance on the
                celestial equator from the vernal equinox to the hour circle,
                in degrees.
                Equation from Astronomical Algorithms page 165 */
        this.rightAscension = (0, MathUtils_1.unwindAngle)((0, MathUtils_1.radiansToDegrees)(Math.atan2(Math.cos(EpsilonApparent) * Math.sin(Lambda), Math.cos(Lambda))));
        /* apparentSiderealTime: Apparent sidereal time, the hour angle of the vernal
                equinox, in degrees.
                Equation from Astronomical Algorithms page 88 */
        this.apparentSiderealTime =
            Theta0 +
                (dPsi * 3600 * Math.cos((0, MathUtils_1.degreesToRadians)(Epsilon0 + dEpsilon))) / 3600;
    }
    return SolarCoordinates;
}());
exports.default = SolarCoordinates;
