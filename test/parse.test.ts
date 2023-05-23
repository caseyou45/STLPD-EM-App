import { Request, Response, query } from "express";

import { parseQueryFromURL } from "../src/services/parse";

describe("parseQueryFromURL", () => {
  let req: Request;
  let query: any;

  beforeEach(() => {
    req = {
      query: {},
    } as Request;
    query = {};
  });

  it("should add type constraint when type is provided", () => {
    req.query.type = "exampleType";

    parseQueryFromURL(req, query);

    expect(query.type).toEqual({
      $regex: "exampleType",
      $options: "i",
    });
  });

  it("should add location constraint when location is provided", () => {
    req.query.location = "exampleLocation";

    parseQueryFromURL(req, query);

    expect(query.location).toEqual({
      $regex: "exampleLocation",
      $options: "i",
    });
  });
});
