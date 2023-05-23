"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const controller_1 = __importDefault(require("../src/controller/"));
describe("Main Page", () => {
    test("it should give a 200 status code", () => {
        supertest_1.default
            .agent(controller_1.default)
            .get("/")
            .expect(200)
            .end(function (err, res) {
            if (err)
                throw err;
        });
    });
});
