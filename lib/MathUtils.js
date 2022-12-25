"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.quadrantShiftAngle = exports.unwindAngle = exports.normalizeToScale = exports.radiansToDegrees = exports.degreesToRadians = void 0;
function degreesToRadians(degrees) {
    return (degrees * Math.PI) / 180.0;
}
exports.degreesToRadians = degreesToRadians;
function radiansToDegrees(radians) {
    return (radians * 180.0) / Math.PI;
}
exports.radiansToDegrees = radiansToDegrees;
function normalizeToScale(num, max) {
    return num - max * Math.floor(num / max);
}
exports.normalizeToScale = normalizeToScale;
function unwindAngle(angle) {
    return normalizeToScale(angle, 360.0);
}
exports.unwindAngle = unwindAngle;
function quadrantShiftAngle(angle) {
    if (angle >= -180 && angle <= 180) {
        return angle;
    }
    return angle - 360 * Math.round(angle / 360);
}
exports.quadrantShiftAngle = quadrantShiftAngle;
