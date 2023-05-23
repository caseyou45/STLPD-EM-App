import express, { Express, Request, Response, response } from "express";
import dotenv from "dotenv";
import * as mongoose from "mongoose";
import CallRouter from "./routes/call";
import IndexRouter from "./controller/index";
import startCallRecording from "./services/scrape";
const path = require("path");

dotenv.config();
const app: Express = express();
const port = process.env.PORT;
const mongo = process.env.MONGO_URI;

mongoose.connect(`${mongo}`);

app.use("/", IndexRouter);
app.use("/api/calls", CallRouter);

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "pug");

startCallRecording();
app.listen(port, () => {
  console.log(` http://localhost:${port}`);
});

export default app;
