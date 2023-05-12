"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseForDate = void 0;
function parseForDate(req, query) {
    let dateStart;
    let dateEnd;
    let datetime = {};
    query.datetime = {};
    if (req.query.hasOwnProperty("dateStart")) {
        dateStart = req.query.dateStart;
        dateStart = new Date(dateStart);
        Object.assign(datetime, { $gte: dateStart });
        Object.assign(query, { datetime: datetime });
    }
    if (req.query.hasOwnProperty("dateEnd")) {
        dateEnd = req.query.dateEnd;
        dateEnd = new Date(dateEnd);
        Object.assign(datetime, { $lt: dateEnd });
        Object.assign(query, { datetime: datetime });
    }
}
exports.parseForDate = parseForDate;
