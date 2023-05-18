import { Request, Response, query } from "express";
import parseQueryFromURL from "../src/services/parse";

describe("URL Query parser", () => {
  test("URL Query parser", async () => {
    const req: Request = {
      query: {
        location: "test",
        datetime: new Date(),
        type: "test",
        eventID: "eventID",
      },
    } as any;

    const q = {};

    const parse = parseQueryFromURL(req, q);

    console.log(q);
  });
});
