"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSortMethod = exports.parseQueryFromURL = void 0;
function parseQueryFromURL(req, query) {
    if (req.query && (req.query.startDate || req.query.dateEnd)) {
        Object.assign(query, { datetime: {} });
        if (req.query.dateStart) {
            const dateStart = req.query.dateStart;
            Object.assign(query.datetime, { $gte: new Date(dateStart) });
        }
        if (req.query.dateEnd) {
            const dateEnd = req.query.dateEnd;
            Object.assign(query.datetime, { $lt: new Date(dateEnd) });
        }
    }
    if (req.query && req.query.type) {
        Object.assign(query, { type: { $regex: req.query.type, $options: "i" } });
    }
    if (req.query && req.query.location) {
        Object.assign(query, {
            location: { $regex: req.query.location, $options: "i" },
        });
    }
}
exports.parseQueryFromURL = parseQueryFromURL;
function getSortMethod(req, sort) {
    Object.assign(sort, { datetime: -1 }); //sort by most recent by default
    if (req.query && req.query.sort && req.query.direction) {
        delete sort.datetime;
        const method = req.query.sort || null;
        const direction = req.query.direction === "asc" ? 1 : -1;
        Object.assign(sort, { [method]: direction });
    }
}
exports.getSortMethod = getSortMethod;
