import express, { Express, Request, Response, response } from "express";
import dotenv from "dotenv";
import * as mongoose from "mongoose";
import startCallRecording from "./services/scrape";
import CallRouter from "./routes/call";
import * as CallController from "./controller/api/call";
import IndexRouter from "./controller/index";
dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const mongo = process.env.MONGO_URI;

// convertResponseDateToDom();

mongoose.connect(`${mongo}`);

startCallRecording();

app.set("view engine", "pug");

app.use("/", IndexRouter);
app.use("/api/calls", CallRouter);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is runn ing at http://localhost:${port}`);
});
