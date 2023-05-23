"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parse_1 = require("../src/services/parse");
describe("parseQueryFromURL", () => {
    let req;
    let query;
    beforeEach(() => {
        req = {
            query: {},
        };
        query = {};
    });
    it("should add type constraint when type is provided", () => {
        req.query.type = "exampleType";
        (0, parse_1.parseQueryFromURL)(req, query);
        expect(query.type).toEqual({
            $regex: "exampleType",
            $options: "i",
        });
    });
    it("should add location constraint when location is provided", () => {
        req.query.location = "exampleLocation";
        (0, parse_1.parseQueryFromURL)(req, query);
        expect(query.location).toEqual({
            $regex: "exampleLocation",
            $options: "i",
        });
    });
});
