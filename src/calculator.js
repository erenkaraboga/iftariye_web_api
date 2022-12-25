"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPlace = exports.findPlace = exports.getTimes = void 0;
var Adhan_1 = require("../lib/Adhan");
var geoData_1 = require("../data/geoData");
var util_1 = require("./util");
function getTimes(lat, lng, date, days, timezoneOffset) {
    var coordinates = new Adhan_1.Coordinates(lat, lng);
    var params = Adhan_1.CalculationMethod.Turkey();
    params.madhab = Adhan_1.Madhab.Shafi;
    var r = {};
    for (var i = 0; i < days; i++) {
        var times = new Adhan_1.PrayerTimes(coordinates, date, params);
        var arr = [];
        arr.push((0, util_1.extractTimeFromDate)(times.fajr, timezoneOffset));
        arr.push((0, util_1.extractTimeFromDate)(times.sunrise, timezoneOffset));
        arr.push((0, util_1.extractTimeFromDate)(times.dhuhr, timezoneOffset));
        arr.push((0, util_1.extractTimeFromDate)(times.asr, timezoneOffset));
        arr.push((0, util_1.extractTimeFromDate)(times.maghrib, timezoneOffset));
        arr.push((0, util_1.extractTimeFromDate)(times.isha, timezoneOffset));
        r[(0, util_1.dateToString)(date)] = arr;
        date.setDate(date.getDate() + 1);
    }
    return r;
}
exports.getTimes = getTimes;
function findPlace(lat, lng) {
    var minDiff = Number.MAX_SAFE_INTEGER;
    var place = {
        countryCode: "",
        country: "",
        region: "",
        city: "null",
        latitude: 0,
        longitude: 0,
    };
    for (var country in geoData_1.ALL_PLACES) {
        for (var region in geoData_1.ALL_PLACES[country].regions) {
            for (var city in geoData_1.ALL_PLACES[country].regions[region]) {
                var _a = geoData_1.ALL_PLACES[country].regions[region][city], lat1 = _a[0], lng1 = _a[1];
                var diff = Math.abs(lat1 - lat) + Math.abs(lng1 - lng);
                if (diff < minDiff) {
                    place = {
                        countryCode: geoData_1.ALL_PLACES[country].code,
                        country: country,
                        region: region,
                        city: city,
                        latitude: lat1,
                        longitude: lng1,
                    };
                    minDiff = diff;
                }
            }
        }
    }
    return place;
}
exports.findPlace = findPlace;
function getPlace(country, region, city) {
    if (geoData_1.ALL_PLACES[country] &&
        geoData_1.ALL_PLACES[country].regions[region] &&
        geoData_1.ALL_PLACES[country].regions[region][city]) {
        var p = {
            country: country,
            countryCode: geoData_1.ALL_PLACES[country].code,
            city: city,
            region: region,
            latitude: geoData_1.ALL_PLACES[country].regions[region][city][0],
            longitude: geoData_1.ALL_PLACES[country].regions[region][city][1],
        };
        return p;
    }
    return null;
}
exports.getPlace = getPlace;
