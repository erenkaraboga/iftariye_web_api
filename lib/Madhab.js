"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shadowLength = exports.Madhab = void 0;
exports.Madhab = {
    Shafi: "shafi",
    Hanafi: "hanafi",
};
function shadowLength(madhab) {
    switch (madhab) {
        case exports.Madhab.Shafi:
            return 1;
        case exports.Madhab.Hanafi:
            return 2;
        default:
            throw "Invalid Madhab";
    }
}
exports.shadowLength = shadowLength;
