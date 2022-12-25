"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Coordinates_1 = __importDefault(require("./Coordinates"));
var MathUtils_1 = require("./MathUtils");
function qibla(coordinates) {
    var makkah = new Coordinates_1.default(21.4225241, 39.8261818);
    // Equation from "Spherical Trigonometry For the use of colleges and schools" page 50
    var term1 = Math.sin((0, MathUtils_1.degreesToRadians)(makkah.longitude) - (0, MathUtils_1.degreesToRadians)(coordinates.longitude));
    var term2 = Math.cos((0, MathUtils_1.degreesToRadians)(coordinates.latitude)) *
        Math.tan((0, MathUtils_1.degreesToRadians)(makkah.latitude));
    var term3 = Math.sin((0, MathUtils_1.degreesToRadians)(coordinates.latitude)) *
        Math.cos((0, MathUtils_1.degreesToRadians)(makkah.longitude) -
            (0, MathUtils_1.degreesToRadians)(coordinates.longitude));
    var angle = Math.atan2(term1, term2 - term3);
    return (0, MathUtils_1.unwindAngle)((0, MathUtils_1.radiansToDegrees)(angle));
}
exports.default = qibla;
