"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLocalTime = exports.createLocalDate = void 0;
function createLocalDate(datetime) {
    try {
        return datetime.toLocaleDateString("en-us", {
            weekday: "long",
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    }
    catch (error) {
        return "Unavailable";
    }
}
exports.createLocalDate = createLocalDate;
function createLocalTime(datetime) {
    try {
        return datetime.toLocaleTimeString("en-us");
    }
    catch (error) {
        return "Unavailable";
    }
}
exports.createLocalTime = createLocalTime;
