"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HighLatitudeRule = {
    MiddleOfTheNight: "middleofthenight",
    SeventhOfTheNight: "seventhofthenight",
    TwilightAngle: "twilightangle",
    recommended: function (coordinates) {
        if (coordinates.latitude > 48) {
            return HighLatitudeRule.SeventhOfTheNight;
        }
        else {
            return HighLatitudeRule.MiddleOfTheNight;
        }
    },
};
exports.default = HighLatitudeRule;
