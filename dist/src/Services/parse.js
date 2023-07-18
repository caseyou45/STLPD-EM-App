"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseQueryFromURL = void 0;
function parseQueryFromURL(req, query) {
    if (req.query && (req.query.startDate || req.query.dateEnd)) {
        Object.assign(query, { datetime: {} });
        if (req.query.dateStart) {
            const ds = req.query.dateStart;
            const dateStart = new Date(ds);
            dateStart.setDate(dateStart.getDate() - 1);
            Object.assign(query.datetime, { $gte: dateStart });
        }
        if (req.query.dateEnd) {
            const de = req.query.dateEnd;
            const dateEnd = new Date(de);
            dateEnd.setDate(dateEnd.getDate() + 1);
            Object.assign(query.datetime, { $lt: new Date(dateEnd) });
        }
        //By default, just get the past days worth of calls
    }
    else if (req.query && !req.query.startDate && !req.query.dateEnd) {
        const dateStart = new Date();
        dateStart.setDate(dateStart.getDate() - 1);
        const dateEnd = new Date();
        dateEnd.setDate(dateEnd.getDate() + 1);
        Object.assign(query, {
            datetime: {
                $gte: dateStart,
                $lt: dateEnd,
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
    if (req.query && req.query.neighborhood) {
        Object.assign(query, {
            neighborhood: { $regex: req.query.neighborhood, $options: "i" },
        });
    }
}
exports.parseQueryFromURL = parseQueryFromURL;
