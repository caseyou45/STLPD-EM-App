import express, { Express, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import * as mongoose from "mongoose";
import CallsRouter from "../src/routes/index";
import startCallRecording from "./services/scrape";
const cors = require("cors");
const port = process.env.PORT;
const mongo = process.env.MONGO_URI;

dotenv.config();

const app: Express = express();

app.use(cors());

mongoose.connect(`${mongo}`);

app.use(express.static("public"));

app.use("/calls", CallsRouter);

startCallRecording();

app.listen(port, () => {
  console.log(` http://localhost:${port}`);
});

export default app;
