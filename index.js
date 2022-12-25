"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var geoData_1 = require("./data/geoData");
var calculator_1 = require("./src/calculator");
var util_1 = require("./src/util");
var fs_1 = require("fs");
exports.app = (0, express_1.default)();
/** use this function like `app.use(allowOrigion4All);` for an express app
 * Make API accessiable for all clients. Not for only clients from a specific domain.
 */
var allowOrigin4All = function (_, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    next();
};
exports.app.use(allowOrigin4All);
exports.app.use(express_1.default.static("public"));
exports.app.get("/api/timesFromCoordinates", getTimesFromCoordinates);
exports.app.get("/api/timesFromPlace", getTimesFromPlace);
exports.app.get("/api/countries", getCountries);
exports.app.get("/api/regions", getRegionsOfCountry);
exports.app.get("/api/cities", getCitiesOfRegion);
exports.app.get("/api/coordinates", getCoordinateData);
exports.app.get("/api/place", getPlaceData);
exports.app.get("/api/ip", getIPAdress);


var PORT = process.env.PORT || 3000;
exports.httpServer = exports.app.listen(PORT);
/** get a list of countries
 * @param  {} _
 * @param  {} res
 */
function getCountries(_, res) {
    var r = [];
    for (var c in geoData_1.ALL_PLACES) {
        r.push({ code: geoData_1.ALL_PLACES[c].code, name: c });
    }
    res.send(r);
}
function getRegionsOfCountry(req, res) {
    var country = req.query.country;
    if (geoData_1.ALL_PLACES[country]) {
        res.send(Object.keys(geoData_1.ALL_PLACES[country].regions));
    }
    else {
        res.send({ error: "NOT FOUND!" });
    }
}
function getCitiesOfRegion(req, res) {
    var country = req.query.country;
    var region = req.query.region;
    if (geoData_1.ALL_PLACES[country] && geoData_1.ALL_PLACES[country].regions[region]) {
        res.send(Object.keys(geoData_1.ALL_PLACES[country].regions[region]));
    }
    else {
        res.send({ error: "NOT FOUND!" });
    }
}
function getCoordinateData(req, res) {
    var country = req.query.country;
    var region = req.query.region;
    var city = req.query.city;
    var coords = (0, calculator_1.getPlace)(country, region, city);
    if (coords) {
        res.send(coords);
    }
    else {
        res.send({ error: "NOT FOUND!" });
    }
}
function getTimesFromCoordinates(req, res) {
    var lat = Number(req.query.lat);
    var lng = Number(req.query.lng);
    var dateStr = req.query.date;
    var date = (0, util_1.isValidDate)(dateStr) ? new Date(dateStr) : new Date(); // use today if invalid
    var daysParam = Number(req.query.days);
    var days = isNaN(daysParam) || daysParam < 1 ? 100 : daysParam; // 50 is default
    var tzParam = Number(req.query.timezoneOffset);
    var tzOffset = isNaN(tzParam) ? 0 : tzParam; // 0 is default
    if (isNaN(lat) ||
        isNaN(lng) ||
        !(0, util_1.isInRange)(lat, -90, 90) ||
        !(0, util_1.isInRange)(lng, -180, 180)) {
        res.send({ error: "Invalid coordinates!" });
    }
    else {
        var place = (0, calculator_1.findPlace)(lat, lng);
        var times = (0, calculator_1.getTimes)(lat, lng, date, days, tzOffset);
        res.send({ place: place, times: times });
    }
}
function getPlaceData(req, res) {
    var lat = Number(req.query.lat);
    var lng = Number(req.query.lng);
    if (lat === undefined || lng === undefined || isNaN(lat) || isNaN(lng)) {
        res.send({ error: "INVALID coordinates!" });
    }
    else {
        res.send((0, calculator_1.findPlace)(lat, lng));
    }
}
function getTimesFromPlace(req, res) {
    var country = req.query.country;
    var region = req.query.region;
    var city = req.query.city;
    var place = (0, calculator_1.getPlace)(country, region, city);
    var dateStr = req.query.date;
    var date = (0, util_1.isValidDate)(dateStr) ? new Date(dateStr) : new Date(); // use today if invalid
    var daysParam = Number(req.query.days);
    var days = isNaN(daysParam) || daysParam < 1 ? 100 : daysParam; // 50 is default
    var tzParam = Number(req.query.timezoneOffset);
    var tzOffset = isNaN(tzParam) ? 0 : tzParam; // 0 is default
    if (!place) {
        res.send({ error: "Place cannot be found!" });
    }
    else {
        var lat = place.latitude;
        var lng = place.longitude;
        var times = (0, calculator_1.getTimes)(lat, lng, date, days, tzOffset);
        res.send({ place: place, times: times });
    }
}
function getIPAdress(req, res) {
    res.send({ IP: req.headers["x-forwarded-for"] });
}





