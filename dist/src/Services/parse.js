"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseQueryFromURL = void 0;
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
        //By default, just get the past days worth of calls
    }
    else if (req.query && !req.query.startDate && !req.query.dateEnd) {
        const dayAgo = new Date();
        dayAgo.setDate(dayAgo.getDate() - 1);
        Object.assign(query, {
            datetime: {
                $gte: dayAgo,
                $lt: new Date(),
            },
        });
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
