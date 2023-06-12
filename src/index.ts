import express, { Express, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import * as mongoose from "mongoose";
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

app.use(express.static("public"));

app.set("view engine", "pug");

app.use("/", Home);

app.use((eq: Request, res: Response, next: NextFunction) => {
  res.status(404).send("Sorry can't find that!");
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.render("index", {
    errorMessage: "Oops: Something Happened. We suggest clearing your search",
  });
});

startCallRecording();

app.listen(port, () => {
  console.log(` http://localhost:${port}`);
});

export default app;
