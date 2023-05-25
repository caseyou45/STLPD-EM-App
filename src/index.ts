import express, { Express, Request, Response, response } from "express";
import dotenv from "dotenv";
import * as mongoose from "mongoose";
import APIRouter from "./routes/api";
import Home from "../src/routes/index";
import startCallRecording from "./services/scrape";
const path = require("path");
const cors = require("cors");
const port = process.env.PORT;
const mongo = process.env.MONGO_URI;

dotenv.config();

const app: Express = express();

app.use(cors());

mongoose.connect(`${mongo}`);

app.use("/", Home);

app.use("/api", APIRouter);

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "pug");

startCallRecording();

app.listen(port, () => {
  console.log(` http://localhost:${port}`);
});

export default app;
