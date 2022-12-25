"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TimeComponents = /** @class */ (function () {
    function TimeComponents(num) {
        this.hours = Math.floor(num);
        this.minutes = Math.floor((num - this.hours) * 60);
        this.seconds = Math.floor((num - (this.hours + this.minutes / 60)) * 60 * 60);
        return this;
    }
    TimeComponents.prototype.utcDate = function (year, month, date) {
        return new Date(Date.UTC(year, month, date, this.hours, this.minutes, this.seconds));
    };
    return TimeComponents;
}());
exports.default = TimeComponents;
