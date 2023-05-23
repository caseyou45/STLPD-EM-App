import request from "supertest";

import app from "../src/controller/";

describe("Main Page", () => {
  test("it should give a 200 status code", () => {
    request
      .agent(app)
      .get("/")
      .expect(200)
      .end(function (err, res) {
        if (err) throw err;
      });
  });
});
