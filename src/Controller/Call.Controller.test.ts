import CallController from "./Call.Controller";
import * as mongoose from "mongoose";
import dotenv from "dotenv";
import { ICall } from "../Models/Call";
dotenv.config();
const mongo = process.env.MONGO_URI;

beforeAll(async () => await mongoose.connect(`${mongo}`));

describe("Test Call Controller", () => {
  test("Get Calls from MogoDB", async () => {
    const result = await CallController.GetAll();
    expect(Array.isArray(result)).toBe(true);
  });

  test("Save Call from MogoDB", async () => {
    const testCall: ICall = {
      datetime: "datetime",
      eventID: "eventID",
      location: "location",
      type: "type",
    };

    await CallController.SaveCall(testCall);
  });
});
