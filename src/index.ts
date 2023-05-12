import express, { Express, Request, Response, response } from "express";
import dotenv from "dotenv";
import * as mongoose from "mongoose";
import * as CallRecords from "./Services/CallRecords";
import CallController from "./Controller/Call.Controller";
import CallRouter from "./Routes/Call.Router";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const mongo = process.env.MONGO_URI;

// convertResponseDateToDom();

mongoose.connect(`${mongo}`);

CallRecords.startCallRecording();

app.use("/api/calls", CallRouter);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is runn ing at http://localhost:${port}`);
});
