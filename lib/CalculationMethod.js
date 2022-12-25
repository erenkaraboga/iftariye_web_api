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
var CalculationParameters_1 = __importDefault(require("./CalculationParameters"));
var Rounding_1 = require("./Rounding");
var CalculationMethod = {
    // Muslim World League
    MuslimWorldLeague: function () {
        var params = new CalculationParameters_1.default("MuslimWorldLeague", 18, 17);
        params.methodAdjustments.dhuhr = 1;
        return params;
    },
    // Egyptian General Authority of Survey
    Egyptian: function () {
        var params = new CalculationParameters_1.default("Egyptian", 19.5, 17.5);
        params.methodAdjustments.dhuhr = 1;
        return params;
    },
    // University of Islamic Sciences, Karachi
    Karachi: function () {
        var params = new CalculationParameters_1.default("Karachi", 18, 18);
        params.methodAdjustments.dhuhr = 1;
        return params;
    },
    // Umm al-Qura University, Makkah
    UmmAlQura: function () {
        return new CalculationParameters_1.default("UmmAlQura", 18.5, 0, 90);
    },
    // Dubai
    Dubai: function () {
        var params = new CalculationParameters_1.default("Dubai", 18.2, 18.2);
        params.methodAdjustments = __assign(__assign({}, params.methodAdjustments), { sunrise: -3, dhuhr: 3, asr: 3, maghrib: 3 });
        return params;
    },
    // Moonsighting Committee
    MoonsightingCommittee: function () {
        var params = new CalculationParameters_1.default("MoonsightingCommittee", 18, 18);
        params.methodAdjustments = __assign(__assign({}, params.methodAdjustments), { dhuhr: 5, maghrib: 3 });
        return params;
    },
    // ISNA
    NorthAmerica: function () {
        var params = new CalculationParameters_1.default("NorthAmerica", 15, 15);
        params.methodAdjustments.dhuhr = 1;
        return params;
    },
    // Kuwait
    Kuwait: function () {
        return new CalculationParameters_1.default("Kuwait", 18, 17.5);
    },
    // Qatar
    Qatar: function () {
        return new CalculationParameters_1.default("Qatar", 18, 0, 90);
    },
    // Singapore
    Singapore: function () {
        var params = new CalculationParameters_1.default("Singapore", 20, 18);
        params.methodAdjustments.dhuhr = 1;
        params.rounding = Rounding_1.Rounding.Up;
        return params;
    },
    // Institute of Geophysics, University of Tehran
    Tehran: function () {
        var params = new CalculationParameters_1.default("Tehran", 17.7, 14, 0, 4.5);
        return params;
    },
    // Dianet
    Turkey: function () {
        var params = new CalculationParameters_1.default("Turkey", 18, 17);
        params.methodAdjustments = __assign(__assign({}, params.methodAdjustments), { sunrise: -7, dhuhr: 5, asr: 4, maghrib: 7 });
        return params;
    },
    // Other
    Other: function () {
        return new CalculationParameters_1.default("Other", 0, 0);
    },
};
exports.default = CalculationMethod;
