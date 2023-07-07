"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortDTOsByCounts = exports.getSortMethod = void 0;
function sortDTOsByCounts(calls, req) {
    const sortProperty = req.query.sort;
    const direction = req.query.direction === "asc" ? 1 : -1;
    if (sortProperty !== undefined) {
        calls.sort((a, b) => (Number(a[sortProperty]) - Number(b[sortProperty])) * direction);
    }
    return calls;
}
exports.sortDTOsByCounts = sortDTOsByCounts;
//This will sort responses by datetime or type/location alphabetically
//It does datetime most recent by default
function getSortMethod(req, sort) {
    Object.assign(sort, { datetime: -1 });
    if (req.query && req.query.sort && req.query.direction) {
        if (req.query.sort === "datetime" ||
            req.query.sort === "type" ||
            req.query.sort === "location" ||
            req.query.sort === "neighborhood") {
            delete sort.datetime;
            const method = req.query.sort || null;
            const direction = req.query.direction === "asc" ? 1 : -1;
            Object.assign(sort, { [method]: direction });
        }
    }
}
exports.getSortMethod = getSortMethod;
