import * as mongoose from "mongoose";
import dotenv from "dotenv";
import { ICall } from "../src/models/call";
import { getAll, saveCall } from "../src/controller/api/call";
import { Request, Response } from "express";
jest.useFakeTimers();
dotenv.config();
const mongo = process.env.MONGO_URI;

describe("Test Call Controller", () => {
  let connection: any;

  beforeAll(async () => (connection = await mongoose.connect(`${mongo}`)));

  afterAll(async () => {
    connection = await connection.close();
  });

  test("Get Calls from MogoDB", async () => {
    const result = await getAll();
    expect(Array.isArray(result)).toBe(true);
  });

  test("Save Call from MogoDB", async () => {
    const testCall: ICall = {
      datetime: new Date(),
      eventID: "eventID",
      location: "location",
      type: "type",
    };
    await saveCall(testCall);
  });
});
