import express, { Express, Request, Response, response } from "express";
import dotenv from "dotenv";
import * as mongoose from "mongoose";
import CallRouter from "./routes/call";
import IndexRouter from "./controller/index";
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

app.listen(port, () => {
  console.log(`⚡️[server]: Server is runn ing at http://localhost:${port}`);
});
