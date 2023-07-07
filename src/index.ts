import express, { Express, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import * as mongoose from "mongoose";
import Home from "../src/routes/index";
import startCallRecording from "./services/scrape";
const path = require("path");
const cors = require("cors");
const port = process.env.PORT;
const mongo = process.env.MONGO_URI;
import CallModel, { ICall } from "./models/call";
import withStreetNameFindNeighborhood from "./services/neighborhood";

dotenv.config();

const app: Express = express();

app.use(cors());

mongoose.connect(`${mongo}`);

app.use(express.static("public"));

app.set("view engine", "pug");

app.use("/", Home);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.render("404");
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.render("index", {
    errorMessage: "Oops: Something Happened. We suggest clearing your search.",
  });
});

startCallRecording();

app.listen(port, () => {
  console.log(` http://localhost:${port}`);
});

async function updateCalls() {
  try {
    const calls = await CallModel.find({}).sort({ createdAt: -1 }).limit(10);
    for (const call of calls) {
      const neighborhood = await withStreetNameFindNeighborhood(call.location);
      await CallModel.updateOne(
        { _id: call._id },
        { $set: { neighborhood: neighborhood } }
      ).exec();
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

updateCalls();

export default app;
